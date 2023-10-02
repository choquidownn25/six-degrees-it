import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AgregarComponent } from './dialogs/agregar/agregar.component';
import { EditarComponent } from './dialogs/editar/editar.component';
import { SelectionModel } from '@angular/cdk/collections';
import { EliminarComponent } from './dialogs/eliminar/eliminar.component';
import { Usuario } from './models/usuario';
import { UsuarioService } from './service/usuario.service';



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit , AfterViewInit {
  selection = new SelectionModel<Usuario>(true, []);
  displayedColumns = ['usuId', 'nombre', 'apellido', 'actions'];
  public personas = new MatTableDataSource<Usuario>()
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  index!: number;
  usuId!: number;

  constructor(
    public dialog: MatDialog,
    public dataServicePersona: UsuarioService) {
  
  }
  ngAfterViewInit(): void {
    this.personas.sort = this.sort;
    this.personas.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.personas.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.personas.data);
  }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Usuario): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.usuId + 1}`;
    }

  ngOnInit(){
   
    this.getAllPersona();
  }
  public getAllPersona = () => {
    this.dataServicePersona.getData()
    .subscribe(res => {
   
        this.personas.data = res as Usuario[];
    })
  }

  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.personas.filter = filterValue;
  }
  addNew() {
    const dialogRef = this.dialog.open(AgregarComponent, {
      data: {persona:  Usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

        this.getAllPersona();
      }
  
    });
  }
  //displayedColumns = ['id', 'nombre', 'apellido', 'fechaNacimiento', 'foto', 'estadoCivil', 'tieneHermanod', 'actions'];
 
  startEdit(i: number, usuId: number, nombre: string, apellido: string) {
    this.usuId = usuId;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    //console.log(this.index);
    const dialogRef = this.dialog.open(EditarComponent, {
      data: {usuId: usuId, nombre: nombre, apellido: apellido}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
          this.getAllPersona();
      }
    });
  }
   deleteItem(i: number, usuId: number, nombre: string, apellido: string) {
    this.index = i;
    this.usuId = usuId;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    const dialogRef = this.dialog.open(EliminarComponent, {
      data: {usuId: usuId, nombre: nombre, apellido: apellido}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getAllPersona();
      }
    });
    
  }
}
