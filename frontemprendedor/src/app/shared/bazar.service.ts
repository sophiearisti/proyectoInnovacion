import { inject,Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from "@angular/fire/firestore";
import { Auth } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from '@angular/fire/storage';
import { BazarDTO } from '../model/BazarDTO';
import { BazarLista } from '../model/BazarLista';
import { BazarDTO2 } from '../model/BazarDTO2';


@Injectable({
  providedIn: 'root'
})
export class BazarService {

  fireStore = inject(Firestore);
  uid: string | undefined;

  bazarCollection = collection(this.fireStore, 'bazares');

  constructor(private authAuth: Auth) {
    this.uid = this.authAuth.currentUser?.uid;
  }

  createBazar(bazar: BazarDTO) {
    // Crear un objeto plano a partir de BazarDTO
    const bazarData = {
      imagenMovil: bazar.imagenMovil,           // Nombre del bazar
      cantMax: bazar.cantMax,                   // URL de la imagen
      descripcion: bazar.descripcion,           // Descripción del bazar
      fechaInicio: bazar.fechaInicio,           // Fecha de inicio
      fechaFin: bazar.fechaFin,                 // Fecha de fin
      empresas: [...bazar.empresas]             // Asegúrate de que es un array de strings
    };
  
    return addDoc(this.bazarCollection, bazarData)
      .then((docRef) => {
        console.log('Bazar created:', bazarData, "id: ", docRef.id);
        return docRef.id; // Retorna el ID del documento creado
      })
      .catch((error) => {
        console.error('Error during create bazar:', error);
        throw error; // Lanza el error para que pueda ser manejado por el llamador
      });
  }
  

    //funcion para editar o crear imagen del emprendimeinto si no existe
  async editImage(file: File) {
      const uid = this.authAuth.currentUser?.uid;
  
      if (!uid) {
        console.error('User not authenticated, cannot upload image.');
        return;
      }
  
      const storage = getStorage();
      const storageRef = ref(storage, `emprendimientos/${uid}`); // Save image in 'emprendimientos' folder with UID
  
      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a blob or file!', snapshot);
        // Return the download URL if needed
  
  
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  
    //fncion para obtener informacion de un emprendimiento segun el id del usuario
    async verEmprendimiento(): Promise<BazarDTO | undefined> {
      try {
        this.uid = this.authAuth.currentUser?.uid;
        // Create a query to find the bazar with the specific uid
        const bazarQuery = query(
          this.bazarCollection,
          where('id_auth', '==', this.uid?.toString())
        );
  
        // Execute the query
        const querySnapshot = await getDocs(bazarQuery);
  
        if (!querySnapshot.empty) {
          // Assuming you only want to edit the first document found
          const docSnap = querySnapshot.docs[0];
  
          //obtener la informacion actual del bazar
          const bazar = docSnap.data() as BazarDTO;
  
          console.log('emprendimiento:', bazar);
  
          // Update the document with new values
          return bazar;
        } else {
          console.log('No emprendimiento found with the given id_auth');
          return undefined;
        }
      } catch (error) {
        console.error('Error during edit emprendimiento:', error);
        return undefined;
      }
    }
  
    async obtenerImagen(): Promise<string | null> {
      this.uid = this.authAuth.currentUser?.uid;
      const storage = getStorage();
      const imageRef = ref(storage, `emprendimientos/${this.uid}`); // Referencia a la imagen en Firebase
  
      try {
        const url = await getDownloadURL(imageRef);
        return url; // Retorna la URL de la imagen
      } catch (error) {
        console.error('Error al obtener la imagen:', error);
        return null;
      }
    }

    async obtenerBazares(): Promise<BazarLista[]> {
      const querySnapshot = await getDocs(this.bazarCollection);
  
      // Convertir los documentos a una lista de ProductoDTO
      const bazarDTOs: BazarDTO2[] = querySnapshot.docs.map(doc => doc.data() as BazarDTO2);
  
      // Convertir cada ProductoDTO a ProductoLista
      const productosLista: BazarLista[] = bazarDTOs.map((productoDTO, index) => {
        const docId = querySnapshot.docs[index].id; // Obtener el ID del documento asociado
        return new BazarLista(
          docId,                     // El ID del documento
          productoDTO.nombre,        // Nombre del producto
          productoDTO.fechaInicio,        // Imagen del producto
          productoDTO.cantMax-productoDTO.empresas.length,        // Precio del producto
          docId       // Código del producto
        );
      });
  
      return productosLista; // Retorna la lista de productos en formato ProductoLista
    }

}
