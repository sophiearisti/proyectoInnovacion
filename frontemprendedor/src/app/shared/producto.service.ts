import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc } from "@angular/fire/firestore";
import { Auth } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
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
    try {
      this.uid = localStorage.getItem('userId') || undefined;
      // Create a query to find the bazar with the specific uid
      const productoQuery = query(
        this.productoCollection,
        where('id_auth', '==', this.uid?.toString())
      );

      const querySnapshot = await getDocs(productoQuery);

        if (!querySnapshot.empty) {
          // Assuming you only want to edit the first document found
        
          //recorrer querySnapshot.docs para obtener los productos
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
      } else {
        console.log('No emprendimiento found with the given id_auth');
        return [];
      }

    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return []; // Return an empty array in case of error
    }
  }


  async obtenerProductosCompletos(): Promise<ProductoDTO[]> {
    try {
      this.uid = localStorage.getItem('userId') || undefined;
      // Create a query to find the bazar with the specific uid
      const productoQuery = query(
        this.productoCollection,
        where('id_auth', '==', this.uid?.toString())
      );

      const querySnapshot = await getDocs(productoQuery);

        if (!querySnapshot.empty) {
          // Assuming you only want to edit the first document found
        
          //recorrer querySnapshot.docs para obtener los productos
          const productosDTO: ProductoDTO[] = querySnapshot.docs.map(doc => doc.data() as ProductoDTO);

          return productosDTO; // Retorna la lista de productos en formato ProductoLista
      } else {
        console.log('No emprendimiento found with the given id_auth');
        return [];
      }

    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return []; // Return an empty array in case of error
    }
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
          cantidad: String(variante.cantidad) || '0',  // Cantidad de la variante como string
          codigo: variante.codigo || '',      // Código de la variante
          imagenDir: variante.imagenDir || '', 
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
      // Referencia directa al documento utilizando el id proporcionado
      const productoRef = doc(this.fireStore, 'productos', id);
      
      // Verifica si el documento existe
      const docSnap = await getDoc(productoRef);
  
      if (docSnap.exists()) {
        // Actualizar el documento con los nuevos valores
        await updateDoc(productoRef, { ...producto });
        console.log('Producto actualizado correctamente');
      } else {
        console.warn('No se encontró un documento con el ID especificado');
      }
    } catch (error) {
      console.error('Error durante la edición del producto:', error);
    }
  }
  
  

  //eliminar un producto
  async eliminarProducto(id: string) {
    try {
      const docRef = doc(this.productoCollection, id);
  
      // Obtener el snapshot del documento por su ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Si el documento existe, elimínalo
        await deleteDoc(docRef);
        console.log('Producto eliminado correctamente');
      }
    } catch (error) {
      console.error('Error durante la eliminación del producto:', error);
    }
  }

  //obtener el producto especifico segun el id del producto
  async obtenerProducto(id: string): Promise<ProductoDTO | undefined> {
    try {
      // Ejecutar la consulta para buscar el producto con el ID del documento
      const docRef = doc(this.productoCollection, id);
  
      // Obtener el snapshot del documento por su ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Si el documento existe, obtén los datos
        const productoData = docSnap.data() as ProductoDTO;
        console.log('Producto obtenido:', productoData);
  
        // Aquí también podrías obtener el ID del documento si lo necesitas
        console.log('ID del documento:', docSnap.id);
  
        // Retorna los datos del producto
        return productoData;
      } else {
        console.log('No se encontró ningún producto con el ID dado');
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

  async deleteImage(id: string) {
    const storage = getStorage();
    const imageRef = ref(storage, id); // Referencia a la imagen en Firebase Storage

    try {
      // Eliminar la imagen utilizando deleteObject
      await deleteObject(imageRef);
      console.log('Imagen eliminada correctamente');
      return true; // Retorna true si la imagen se eliminó correctamente
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      return false; // Retorna false si hubo un error al eliminar la imagen
    }
  }


}
