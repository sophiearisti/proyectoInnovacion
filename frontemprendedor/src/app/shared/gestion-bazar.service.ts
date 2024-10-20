import { Injectable, inject } from '@angular/core';
import { BazarDTO } from '../model/BazarDTO';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc } from "@angular/fire/firestore";
import { Auth } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { ListaProductosBazarDTO } from '../model/ListaProductosBazarDTO';

@Injectable({
  providedIn: 'root'
})
export class GestionBazarService {

  constructor(private authAuth: Auth) { }

  fireStore = inject(Firestore);
  uid: string | undefined;

  gestionCollection = collection(this.fireStore, 'gestiones');


  //eliminar gestion bazar
  async eliminarProductosBazar(id: string) {
    try {
      let authId = this.authAuth.currentUser?.uid;
      
      // Verificar si el usuario está autenticado
      if (!authId) {
        console.error('Usuario no autenticado');
        return;
      }
  
      // Crear la consulta para encontrar el producto con el id de la empresa y el bazar
      const bazarQuery = query(
        this.gestionCollection,
        where('idEmpresa', '==', authId),
        where('idBazar', '==', id)
      );
  
      // Ejecutar la consulta
      const querySnapshot = await getDocs(bazarQuery);
  
      if (!querySnapshot.empty) {
        // Obtenemos el primer documento que cumpla la consulta
        const docSnap = querySnapshot.docs[0];
        
        // Obtenemos la referencia del documento
        const docRef = docSnap.ref;
        
        // Eliminamos el documento
        await deleteDoc(docRef);
        console.log('Producto eliminado correctamente');
      } else {
        console.log('No se encontró ningún producto para eliminar');
      }
    } catch (error) {
      console.error('Error durante la eliminación del producto:', error);
    }
  }
  
  //actualizar gestion bazar
  async guardarProductosBazar(lista: ListaProductosBazarDTO) {
    try {
      try {
        let authId=this.authAuth.currentUser?.uid;
        // Create a query to find the producto with the specific uid
        const bazarQuery = query(
          this.gestionCollection,
          where('idEmpresa', '==', lista.idEmpresa),
          where('idBazar', '==', lista.idBazar) 
        );
  
        // Execute the query
        const querySnapshot = await getDocs(bazarQuery);
  
        if (!querySnapshot.empty) {
          // Assuming you only want to edit the first document found
          const docSnap = querySnapshot.docs[0];
  
          // Update the document with new values
          const listaRef = doc(this.fireStore, 'gestiones', docSnap.id);
          await updateDoc(listaRef, { ...lista });
        }
      } catch (error) {
        console.error('Error durante la edición del producto:', error);
      }
    } catch (error) {
      console.error('Error durante la obtención del producto:', error);
    }
  
  }

  //crear gestion bazar vacio
  async crearGestion(idBazar: string) {
    const uid = this.authAuth.currentUser?.uid;
  
    if (uid) {

      const gestionData = {
        idEmpresa: uid,                       // ID del usuario autenticado
        idBazar: idBazar,            // Nombre del producto
        productos: [],            // URL de la imagen
      };

      console.log('Guardando producto con variantes:', gestionData);

      try {
        const docRef = await addDoc(this.gestionCollection, gestionData);
        console.log('Producto creado con ID:', docRef.id); // Aquí obtienes el ID
        return docRef.id; // Devuelve el ID del nuevo producto
      } catch (error) {
        console.error('Error durante la creación del producto:', error);
        throw error; // Propaga el error para manejarlo en otro lugar si es necesario
      }

    } else {
      throw new Error('User is not authenticated');
    }
  
  }

  //obtener gestion bazar
  async obtenerProductosBazar(id: string): Promise<ListaProductosBazarDTO | undefined> {
    try {
      try {
        let authId=this.authAuth.currentUser?.uid;
        // Create a query to find the producto with the specific uid
        const bazarQuery = query(
          this.gestionCollection,
          where('idEmpresa', '==', authId),
          where('idBazar', '==', id) 
        );
  
        // Execute the query
        const querySnapshot = await getDocs(bazarQuery);
  
        if (!querySnapshot.empty) {
          // Assuming you only want to edit the first document found
          const docSnap = querySnapshot.docs[0];
  
          // retornar la lsita
          const bazarData = docSnap.data() as ListaProductosBazarDTO ;
          console.log('Producto obtenido:', bazarData);
  
          // Aquí también podrías obtener el ID del documento si lo necesitas
          console.log('ID del documento:', docSnap.id);
  
          // Retorna los datos del producto
          return bazarData;
        }
      } catch (error) {
        console.error('Error durante la edición del producto:', error);
      }
    } catch (error) {
      console.error('Error durante la obtención del producto:', error);
    }
  
    return undefined;
  }
}
