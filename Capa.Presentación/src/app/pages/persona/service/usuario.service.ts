import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrlUsuarios = environment.API_URL_TODOS_PERSONA;
  addUrl = environment.API_URL_TODOS_ADD_PERSONA;
  editUrl = environment.API_URL_TODOS_EDIT_PERSONA;
  deleteUrl = environment.API_URL_TODOS_DELETE_PERSONA;
  getById = environment.API_URL_TODOS_FINDBYID_PERSONA;
  dialogData: any;
  dataChange: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  environment: any;
  UsuarioList: Usuario[] = [];
  //UsuarioList: Usuario[] = [];
  constructor(private httpClient: HttpClient) { }

  get data(): Usuario[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  public getData = ( ) => {
    return this.httpClient.get(this.baseUrlUsuarios);
  }
  
  get(): Observable<Usuario[]> {
    
    return this.httpClient.get<Usuario[]>(this.baseUrlUsuarios);
   }
  getAllUsuario(): void {
    this.httpClient.get<Usuario[]>(this.baseUrlUsuarios).subscribe(data => {
        //this.dataChange.next(data);
        this.UsuarioList = data;
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!' + "\n" + error.name + ' ' + error.message,
        footer: '<a href="">Why do I have this issue?</a>'
      })

      });
  }
   // ADD, POST METHOD
   addItem(Usuario: Usuario): void {
    this.httpClient.post(this.addUrl, Usuario).subscribe(data => {
      this.dialogData = Usuario;
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' + "\n" + err.message.toString,
          footer: '<a href="">Why do I have this issue?</a>'
        })
    });
   }

    // UPDATE, PUT METHOD
     updateItem(Usuario: Usuario): void {
    this.httpClient.put(this.editUrl, Usuario).subscribe(data => {
        this.dialogData = Usuario;
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' + "\n" + err.message.toString,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    // Create an instance of HttpParams and set the 'id' parameter
    let params = new HttpParams().set('id', id.toString());
    this.httpClient.delete(this.deleteUrl , { params }).subscribe(data => {
      //console.log(data['']);
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      },
      (err: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' + "\n" + err.message.toString,
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }
}
