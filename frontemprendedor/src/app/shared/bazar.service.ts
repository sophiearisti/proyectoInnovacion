import { inject,Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc } from "@angular/fire/firestore";
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
  
    async obtenerBazar(id: string): Promise<BazarDTO2 | undefined> {
      try {
        // Ejecutar la consulta para buscar el producto con el ID del documento
        const docRef = doc(this.bazarCollection, id);
    
        // Obtener el snapshot del documento por su ID
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          // Si el documento existe, obtén los datos
          const bazarData = docSnap.data() as BazarDTO2;
          console.log('Producto obtenido:', bazarData);
    
          // Aquí también podrías obtener el ID del documento si lo necesitas
          console.log('ID del documento:', docSnap.id);
    
          // Retorna los datos del producto
          return bazarData;
        } else {
          console.log('No se encontró ningún producto con el ID dado');
        }
      } catch (error) {
        console.error('Error durante la obtención del producto:', error);
      }
    
      return undefined;
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

    async obtenerBazaresInscritos(): Promise<BazarLista[]> {
      const querySnapshot = await getDocs(this.bazarCollection);
  
      // Convertir los documentos a una lista de ProductoDTO
      const bazarDTOs: BazarDTO2[] = querySnapshot.docs.map(doc => doc.data() as BazarDTO2);
  
      // Obtener el UID del usuario autenticado
      const uidUsuario = this.authAuth.currentUser?.uid;

      if (!uidUsuario) {
        console.error('Usuario no autenticado');
        return [] ;
      }

      // Filtrar y convertir cada BazarDTO a BazarLista
      const productosLista: BazarLista[] = bazarDTOs
        .filter(productoDTO => productoDTO.empresas.includes(uidUsuario)) // Filtrar por UID en la lista de empresas
        .map((productoDTO, index) => {
          const docId = querySnapshot.docs[index].id; // Obtener el ID del documento asociado
          return new BazarLista(
            docId,                     // El ID del documento
            productoDTO.nombre,        // Nombre del bazar
            productoDTO.fechaInicio,   // Fecha de inicio del bazar
            productoDTO.cantMax - productoDTO.empresas.length, // Cantidad disponible
            docId                      // Código del bazar
          );
        });

  
      return productosLista; // Retorna la lista de productos en formato ProductoLista
    }

      //editar un producto
  async editBazar(bazar: any, id: string) {
    try {
      const docRef = doc(this.bazarCollection, id);
  
      // Obtener el snapshot del documento por su ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Si el documento existe, elimínalo
          // Update the document with new values
          const bazarRef = doc(this.fireStore, 'bazares', docSnap.id);
          await updateDoc(bazarRef, { ...bazar });
      }

    } catch (error) {
      console.error('Error durante la edición del producto:', error);
    }
  }

  
}
