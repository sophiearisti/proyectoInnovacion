import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NuevoProductoDescripcionComponent } from "../components/nuevo-producto-descripcion/nuevo-producto-descripcion.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';
import { ProductoDTO } from '../model/ProductoDTO';
import { Variante } from '../model/Variante'; // Asegúrate de tener la clase Variante
import { ProductoService } from '../shared/producto.service';
import { Firestore,  } from "@angular/fire/firestore";
import { Auth } from '@angular/fire/auth';

interface DropdownItem {
  item_id: number;
  item_text: string;
}

@Component({
  selector: 'app-anadir-producto',
  templateUrl: './anadir-producto.component.html',
  styleUrls: ['./anadir-producto.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NuevoProductoDescripcionComponent,
    NavigationBarComponent,
    UpBarComponent,
    NgMultiSelectDropDownModule
  ]
})
export class AnadirProductoComponent {
  productos: { variante: Variante }[] = [];  // Lista que almacena productos y variantes

  // Dropdown settings
  dropdownList: DropdownItem[] = [];
  selectedItems: DropdownItem[] = [];
  dropdownSettings: IDropdownSettings = {};

  nombre: string = ''; 
  descripcion: string = ''; 
  precio: number = 0; 
  codigo: string = ''; 
  promocion: number = 0;

  constructor(private productoService: ProductoService, private authAuth: Auth) {}

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Moda' },
      { item_id: 2, item_text: 'Accesorios' },
      { item_id: 3, item_text: 'Ropa' },
      { item_id: 4, item_text: 'Mujer' },
      { item_id: 5, item_text: 'Hombre' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: DropdownItem) {
    console.log(item);
  }

  onSelectAll(items: DropdownItem[]) {
    console.log(items);
  }

  // Añadir producto (nueva variante)
  anadirProducto() {
    this.productos.push({ variante: new Variante('', '', '', '', 0,'') }); // Añadir una nueva variante vacía con valores por defecto
  }

  // Eliminar producto (variante)
  eliminarProducto(index: number) {
    this.productos.splice(index, 1);  // Elimina el producto y su variante al mismo tiempo
  }

  // Actualizar la variante desde el componente hijo
  onVarianteActualizada(variante: Variante, index: number) {
    this.productos[index].variante = variante;  // Actualiza la variante en la posición correspondiente
  }

  fireStore = inject(Firestore);
  uid: string | undefined;

  async guardar() {
    const producto = new ProductoDTO(
      "", // id
      this.nombre,
      "", // otra propiedad
      this.descripcion,
      this.selectedItems.map(item => item.item_text),
      this.precio,
      this.codigo,
      this.promocion,
      this.productos.map(p => p.variante)  // Extraemos las variantes directamente de la lista de productos
    );
  
    const uid = this.authAuth.currentUser?.uid;
  
    // Crear un array de promesas para subir todas las imágenes de las variantes
    const subirImagenesPromesas = this.productos.map((producto, index) => {
      const variante = producto.variante;
  
      if (variante.imagen) {
        const imageFile = this.dataURLtoFile(variante.imagen, `variante-${index}.png`);
        
        // Retorna una promesa para cada subida de imagen
        return this.productoService.editImage(imageFile, "variantes/" + uid + this.nombre + index)
          .then((imageUrl) => {
            console.log(`Imagen de la variante ${index} subida correctamente. URL: ${imageUrl}`);
  
            // Asigna la URL de la imagen a la propiedad imagen de la variante
            this.productos[index].variante.imagen = imageUrl;
          })
          .catch((error) => {
            console.error(`Error al subir la imagen de la variante ${index}:`, error);
            // En caso de error, sigue adelante, no detenemos las otras promesas
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
      const productoId = await this.productoService.crearProducto(producto);
      console.log('Producto creado con ID:', productoId);
  
      // Guardar la imagen del producto principal
      if (this.imageFile) {
        await this.productoService.editImage(this.imageFile, "productos/" + productoId);
        console.log('Imagen del producto principal subida correctamente');
      }
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
