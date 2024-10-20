import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc } from "@angular/fire/firestore";
import { Auth } from '@angular/fire/auth';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { ProductoLista } from '../model/ProductoLista';
import { Compra } from '../model/CompraDTO';
import { CompraLista } from '../model/CompraLista';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  fireStore = inject(Firestore);
  uid: string | undefined;

  compraCollection = collection(this.fireStore, 'compras');

  constructor() { }

  async guardarCompra(compra: Compra): Promise<void> {
    const compraData = {
      idCliente: compra.idCliente,                   // ID del cliente
      nombreCliente: compra.nombreCliente,           // Nombre del cliente
      costoTotal: compra.costoTotal,                 // Costo total
      fechaCompra: compra.fechaCompra,               // Fecha de la compra
      estado: compra.estado,                         // Estado de la compra
      responsable: compra.responsable,               // Responsable de la compra
      datosAdicionales: compra.datosAdicionales,     // Datos adicionales
      direccion: compra.direccion,                   // Dirección de envío
  
      // Mapeo de los productos de la compra
      productos: compra.productos.map(producto => ({
        idProducto: producto.idProducto || '',       // ID del producto
        posicion: producto.posicion || 0,            // Posición del producto en la compra
        cantidad: producto.cantidad || 0,            // Cantidad de unidades del producto
        precio: producto.precio || 0,
        idEmpresa: producto.idEmpresa || '',                // Precio del producto
      }))
    };
  
    console.log('Guardando compra con productos:', compraData);
  
    try {
      // Guardar compra en la colección de Firebase o base de datos
      const docRef = await addDoc(this.compraCollection, compraData);
      console.log('Compra creada con ID:', docRef.id); // Aquí obtienes el ID
    } catch (error) {
      console.error('Error durante la creación de la compra:', error);
      throw error; // Propaga el error para manejarlo en otro lugar si es necesario
    }
  }

  //obtener la lista de compras 

  async obtenerCompras(): Promise<CompraLista[]> {
    const querySnapshot = await getDocs(this.compraCollection);

    // Convertir los documentos a una lista de ProductoDTO
    const comprasDTO: Compra[] = querySnapshot.docs.map(doc => doc.data() as Compra);

    // Convertir cada ProductoDTO a ProductoLista
    const productosLista: CompraLista[] = comprasDTO.map((pedido, index) => {
      const docId = querySnapshot.docs[index].id; // Obtener el ID del documento asociado
      return new CompraLista(
        docId,                     // El ID del documento
        pedido.estado,
        pedido.costoTotal.toString(),
        new Date(pedido.fechaCompra.seconds * 1000).toLocaleDateString('es-ES').toString(),
        pedido.nombreCliente
      );
    });

    return productosLista;
  }

  async obtenerCompra(id: string): Promise<Compra | undefined> {
    try {
      // Ejecutar la consulta para buscar el producto con el ID del documento
      const docRef = doc(this.compraCollection, id);
  
      // Obtener el snapshot del documento por su ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Si el documento existe, obtén los datos
        const compraData = docSnap.data() as Compra;
        console.log('Producto obtenido:', compraData);
  
        // Aquí también podrías obtener el ID del documento si lo necesitas
        console.log('ID del documento:', docSnap.id);
  
        // Retorna los datos del producto
        return compraData;
      } else {
        console.log('No se encontró ningún producto con el ID dado');
      }
    } catch (error) {
      console.error('Error durante la obtención del producto:', error);
    }
  
    return undefined;
  }

  async editCompra(compra: any, id: string) {
    try {
      const docRef = doc(this.compraCollection, id);
  
      // Obtener el snapshot del documento por su ID
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Si el documento existe, elimínalo
          // Update the document with new values
          const bazarRef = doc(this.fireStore, 'compras', docSnap.id);
          await updateDoc(bazarRef, { ...compra });
      }

    } catch (error) {
      console.error('Error durante la edición del producto:', error);
    }
  }


}
