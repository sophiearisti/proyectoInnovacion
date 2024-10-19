import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NuevoProductoDescripcionComponent } from "../components/nuevo-producto-descripcion/nuevo-producto-descripcion.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';
import { EditarProductoDescripcionComponent } from "../components/editar-producto-descripcion/editar-producto-descripcion.component";
import { ProductoService } from '../shared/producto.service';
import { ProductoDTO } from '../model/ProductoDTO';
import { Auth } from '@angular/fire/auth';
import { Firestore,  } from "@angular/fire/firestore";
import { Variante } from '../model/Variante';

// Define la interfaz DropdownItem
interface DropdownItem {
  item_id: number;
  item_text: string;
}
@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    NuevoProductoDescripcionComponent,
    NavigationBarComponent,
    UpBarComponent,
    NgMultiSelectDropDownModule, EditarProductoDescripcionComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {

  constructor(private productoService: ProductoService,private authAuth: Auth) {}
  fireStore = inject(Firestore);
  uid: string | undefined;
  
  productos_tabla: Variante[] = [];

  nombre=""
  descripcion=""
  promocion=0
  codigo=""
  precio=0
  idProducto=""
  producto:ProductoDTO = new ProductoDTO("", "", "", "", [], 0, "", 0, []);

  // Usa la interfaz DropdownItem para las listas y los elementos seleccionados
  dropdownList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettings: IDropdownSettings = {};

  ngOnInit() {
    // Inicializa la lista desplegable con DropdownItem
    this.dropdownList = [
      { item_id: 1, item_text: 'Moda' },
      { item_id: 2, item_text: 'Accesorios' },
      { item_id: 3, item_text: 'Ropa' },
      { item_id: 4, item_text: 'Mujer' },
      { item_id: 5, item_text: 'Hombre' }
    ];

    // Configura los ajustes del dropdown
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    //obtener el id producto del local storage
    this.idProducto = localStorage.getItem('idProducto') || '';
    //obtener los datos del producto desde el service del producto
    if (this.idProducto) {
      this.productoService.obtenerProducto(this.idProducto).then(async (producto) => {
        //asignar cada campo donde debe ir
        if (producto) {
          this.producto = producto;
          console.log(producto);
          this.nombre = producto.nombre;
          this.descripcion = producto.descripcion;
          this.promocion = producto.promocion;
          this.codigo = producto.codigo;
          this.precio = producto.precio;

          //tal y como en editar cuenta aca se llenan los tags
          this.selectedItems = this.dropdownList.filter(item => producto.tags.includes(item.item_text));
          const imageUrl = await this.productoService.obtenerImagen("productos/" + this.idProducto);
          if (imageUrl) {
            this.imageSrc = imageUrl; // Asigna la URL obtenida al atributo imageSrc
          }
          //obtener las variantes del producto
          this.productos_tabla = producto.variantes;
          console.log(this.productos_tabla);

        } else {
          console.error('Producto is undefined');
        }
        
      });
    } else {
      console.error('idProducto is null');
    }
  }

  // Maneja la selección de un ítem
  onItemSelect(item: DropdownItem) {
    console.log(item);
  }

  // Maneja la selección de todos los ítems
  onSelectAll(items: DropdownItem[]) {
    console.log(items);
  }

  variantesEliminadas: string[] = [];
  
  // Elimina un producto de la lista
  eliminarProducto(index: number) {
    this.productos_tabla.splice(index, 1);  // Elimina el producto y su variante al mismo tiempo
    if (this.productos_tabla[index].imagenDir!="") {
      this.variantesEliminadas.push(this.productos_tabla[index].imagenDir);
    }
  }

  anadirProducto() {
    this.productos_tabla.push( new Variante('','', '', '', '', 0,'') ); // Añadir una nueva variante vacía con valores por defecto
  }

  onVarianteActualizada(variante: Variante, index: number) {
    this.productos_tabla[index] = variante;  // Actualiza la variante en la posición correspondiente
  }

  async guardar() {
    const producto = new ProductoDTO(
      this.producto.id_auth, // id
      this.nombre,
      this.producto.imagen, // otra propiedad
      this.descripcion,
      this.selectedItems.map(item => item.item_text),
      this.precio,
      this.codigo,
      this.promocion,
      this.productos_tabla // Extraemos las variantes directamente de la lista de productos
    );
    console.log(producto);
   
   
    const uid = this.authAuth.currentUser?.uid;

    // Crear un array de promesas para subir todas las imágenes de las variantes en productos_tabla
    const subirImagenesPromesas = this.productos_tabla.map((producto, index) => {

      if (producto.imagen) {
        // Convertir la imagen en archivo
        const imageFile = this.dataURLtoFile(producto.imagen, `variante-${index}.png`);
        //si imgenDir esta vacio se le asigna la ruta de la imagen
        if (producto.imagenDir=="") {
          producto.imagenDir = "variantes/" + uid+"-"+ this.nombre+"-" + index;
        }
        // Subir la imagen y obtener la URL
        return this.productoService.editImage(imageFile, producto.imagenDir)
          .then((imageUrl) => {
            console.log(`Imagen de la variante ${index} subida correctamente. URL: ${imageUrl}`);

            // Asigna la URL de la imagen subida al producto en productos_tabla
            this.productos_tabla[index].imagen = imageUrl;
          })
          .catch((error) => {
            console.error(`Error al subir la imagen de la variante ${index}:`, error);
            // Continuar aunque ocurra un error
          });
      } else {
        // Si no hay imagen, resolvemos la promesa inmediatamente
        return Promise.resolve();
      }
    });
  
    try {
      // Espera a que todas las imágenes de las variantes se hayan subido
      await Promise.all(subirImagenesPromesas);
  
      // Crear el producto en la base de datos una vez que todas las imágenes estén subidas
      const productoId = await this.productoService.editarProducto(producto,this.idProducto);
      console.log('Producto creado con ID:', productoId);
  
      // Guardar la imagen del producto principal
      if (this.imageFile) {
        await this.productoService.editImage(this.imageFile, "productos/" + productoId);
        console.log('Imagen del producto principal subida correctamente');
      }

      //recorrer la lista de variantesEliminadas y eliminar cada variante
       //eliminar la imagen si imagenDir no es ""
      this.variantesEliminadas.forEach((imagenDir) => {
        this.productoService.deleteImage(imagenDir)});

    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  }

  // Método para convertir base64 en archivo (File)
  dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }
  

  defaultImageSrc: string = '/images/foto.jpg'; // Reemplaza con la ruta de tu imagen predeterminada
  imageSrc: string | ArrayBuffer | null = this.defaultImageSrc;
  imageFile: File | null = null; // Store the selected image file

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0]; // Store the selected file
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imageSrc = e.target.result; // Update the image source for preview
        }
      };

      reader.readAsDataURL(this.imageFile); // Read the file as a data URL
    }
  }
}
