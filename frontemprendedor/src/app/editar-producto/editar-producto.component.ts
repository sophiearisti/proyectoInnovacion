import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NuevoProductoDescripcionComponent } from "../components/nuevo-producto-descripcion/nuevo-producto-descripcion.component";
import { NavigationBarComponent } from "../components/navigation-bar/navigation-bar.component";
import { UpBarComponent } from "../components/up-bar/up-bar.component";
import { NgMultiSelectDropDownModule, IDropdownSettings } from 'ng-multiselect-dropdown';

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
    NgMultiSelectDropDownModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {
  productos: any[] = [];

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
  }

  // Maneja la selección de un ítem
  onItemSelect(item: DropdownItem) {
    console.log(item);
  }

  // Maneja la selección de todos los ítems
  onSelectAll(items: DropdownItem[]) {
    console.log(items);
  }

  // Añade un producto a la lista
  anadirProducto() {
    this.productos.push({});
  }

  // Elimina un producto de la lista
  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
  }

  defaultImageSrc: string = '/images/nuevafoto.jpg'; // Reemplaza con la ruta de tu imagen predeterminada
  imageSrc: string | ArrayBuffer | null = this.defaultImageSrc;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Asegúrate de que e.target?.result no sea undefined
        if (e.target?.result) {
          this.imageSrc = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
