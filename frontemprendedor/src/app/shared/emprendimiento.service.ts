import { inject, Injectable } from '@angular/core';
import { EmprendimientoDTO } from '../model/EmprendimientoDTO';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from "@angular/fire/firestore";
import { Auth } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService {

  fireStore = inject(Firestore);
  uid: string | undefined;

  emprendimientoCollection = collection(this.fireStore, 'emprendimientos');

  constructor(private authAuth: Auth) {
    this.uid = this.authAuth.currentUser?.uid;
  }

  createEmprendimiento(bazar: EmprendimientoDTO) {
    // Crear un objeto plano a partir de BazarDTO
    const emprendimientoData = {
      id_auth: bazar.id_auth,         // Mantiene el id_auth
      nombre: bazar.nombre,           // Nombre del bazar
      imagen: bazar.imagen,           // URL de la imagen
      descripcion: bazar.descripcion, // Descripción del bazar
      correo: bazar.correo,           // Correo del usuario
      nombreusuario: bazar.nombreusuario, // Nombre del usuario
      documento: bazar.documento,     // Documento del usuario
      tags: [...bazar.tags]           // Asegúrate de que es un array de strings
    };
  
    return addDoc(this.emprendimientoCollection, emprendimientoData)
      .then(() => {
        console.log('Bazar created:', emprendimientoData);
      })
      .catch((error) => {
        console.error('Error during create bazar:', error);
      });
  }
  

  async editarEmprendimiento(nombre: string,imagen: string, descripcion: string, tags: string[]) {
    try {
      this.uid = this.authAuth.currentUser?.uid;
      // Create a query to find the bazar with the specific uid
      const bazarQuery = query(
        this.emprendimientoCollection,
        where('id_auth', '==', this.uid?.toString())
      );

      // Execute the query
      const querySnapshot = await getDocs(bazarQuery);

      if (!querySnapshot.empty) {
        // Assuming you only want to edit the first document found
        const docSnap = querySnapshot.docs[0];

        //obtener la informacion actual del bazar
        const bazar = docSnap.data() as EmprendimientoDTO;

        bazar.nombre = nombre;
        //si la imagen contiene la palabra emprendimientos se actualiza la imagen
        if(imagen.includes('emprendimientos')){
          bazar.imagen = imagen+this.uid?.toString();
        }
        else
        {
          bazar.imagen = "";
        }
        
        bazar.descripcion = descripcion;
        bazar.tags = tags;

        console.log('emprendimiento updated:', bazar);

        // Update the document with new values
        const bazarRef = doc(this.fireStore, 'emprendimientos', docSnap.id);
        await updateDoc(bazarRef, { ...bazar });

        console.log('emprendimiento updated:', bazar);
      } else {
        console.log('No emprendimiento found with the given id_auth');
      }
    } catch (error) {
      console.error('Error during edit emprendimiento:', error);
    }
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
  
}
