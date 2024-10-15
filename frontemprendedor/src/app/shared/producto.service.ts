import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from "@angular/fire/firestore";
import { Auth } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ProductoLista } from '../model/ProductoLista';
import { ProductoDTO } from '../model/ProductoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  fireStore = inject(Firestore);
  uid: string | undefined;

  productoCollection = collection(this.fireStore, 'productos');


  constructor(private authAuth: Auth) { }

  async obtenerProductos(): Promise<ProductoLista[]> {
    const querySnapshot = await getDocs(this.productoCollection);

    // Convertir los documentos a una lista de ProductoDTO
    const productosDTO: ProductoDTO[] = querySnapshot.docs.map(doc => doc.data() as ProductoDTO);

    // Convertir cada ProductoDTO a ProductoLista
    const productosLista: ProductoLista[] = productosDTO.map((productoDTO, index) => {
      const docId = querySnapshot.docs[index].id; // Obtener el ID del documento asociado
      return new ProductoLista(
        docId,                     // El ID del documento
        productoDTO.nombre,        // Nombre del producto
        productoDTO.imagen,        // Imagen del producto
        productoDTO.precio,        // Precio del producto
        productoDTO.codigo         // Código del producto
      );
    });

    return productosLista; // Retorna la lista de productos en formato ProductoLista
  }

  //crear un producto
  async crearProducto(producto: ProductoDTO) {
    const uid = this.authAuth.currentUser?.uid;
  
    if (uid) {
      producto.id_auth = uid;
      producto.imagen = "productos/" + uid;

      const productoData = {
        id_auth: uid,                       // ID del usuario autenticado
        nombre: producto.nombre,            // Nombre del producto
        imagen: producto.imagen,            // URL de la imagen
        descripcion: producto.descripcion,  // Descripción del producto
        tags: [...producto.tags],           // Asegúrate de que es un array de strings
        precio: producto.precio,            // Precio del producto
        codigo: producto.codigo,            // Código del producto
        promocion: producto.promocion,      // Promoción (si existe)
      
        // Variantes como lista de mapas
        variantes: producto.variantes.map(variante => ({
          nombre: variante.nombre || '',     // Nombre de la variante
          imagen: variante.imagen || '',     // URL de la imagen
          color: variante.color || '',       // Color de la variante
          talla: variante.talla || '',       // Talla de la variante
          cantidad: String(variante.cant) || '0',  // Cantidad de la variante como string
          codigo: variante.codigo || ''      // Código de la variante
        }))
      };

      console.log('Guardando producto con variantes:', productoData);

      try {
        const docRef = await addDoc(this.productoCollection, productoData);
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
  
  //editar un producto
  async editarProducto(producto: any, id: string) {
    try {
      // Create a query to find the producto with the specific uid
      const productoQuery = query(
        this.productoCollection,
        where('id', '==', id)
      );

      // Execute the query
      const querySnapshot = await getDocs(productoQuery);

      if (!querySnapshot.empty) {
        // Assuming you only want to edit the first document found
        const docSnap = querySnapshot.docs[0];

        // Update the document with new values
        const productoRef = doc(this.fireStore, 'productos', docSnap.id);
        await updateDoc(productoRef, { ...producto });
      }
    } catch (error) {
      console.error('Error durante la edición del producto:', error);
    }
  }

  //eliminar un producto
  async eliminarProducto(id: string) {
    try {
      // Create a query to find the producto with the specific uid
      //este es el id del documento
      const productoQuery = query(
        this.productoCollection,
        where('id', '==', id)
      );

      // Execute the query
      const querySnapshot = await getDocs(productoQuery);

      if (!querySnapshot.empty) {
        // Assuming you only want to edit the first document found
        const docSnap = querySnapshot.docs[0];

        // Delete the document
        await deleteDoc(docSnap.ref);
      }
    } catch (error) {
      console.error('Error durante la eliminación del producto:', error);
    }
  }

  //obtener el producto especifico segun el id del producto
  async obtenerProducto(id: string): Promise<ProductoDTO | undefined> {
    try {
      // Create a query to find the producto with the specific uid
      const productoQuery = query(
        this.productoCollection,
        where('id', '==', id)
      );

      // Execute the query
      const querySnapshot = await getDocs(productoQuery);

      if (!querySnapshot.empty) {
        // Assuming you only want to edit the first document found
        const docSnap = querySnapshot.docs[0];

        // Return the document data
        return docSnap.data() as ProductoDTO;
      }
    } catch (error) {
      console.error('Error durante la obtención del producto:', error);
    }

    return undefined;
  }
  
  

  async editImage(file: File, id: string) {
    const storage = getStorage();
    const storageRef = ref(storage, id); // Guardar imagen con la ruta especificada

    try {
      // Subir el archivo
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Uploaded a blob or file!', snapshot);

      // Obtener la URL de descarga de la imagen
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl; // Retornar la URL de la imagen
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Re-lanzar el error para manejarlo en la llamada
    }
  }


  async obtenerImagen(id: string): Promise<string | null> {
  
    const storage = getStorage();
    const imageRef = ref(storage, id); // Referencia a la imagen en Firebase

    try {
      const url = await getDownloadURL(imageRef);
      return url; // Retorna la URL de la imagen
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
      return null;
    }
  }
}
