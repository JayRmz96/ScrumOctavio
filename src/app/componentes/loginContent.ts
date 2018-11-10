import {Component, OnInit} from '@angular/core';

import { ListaUsuarios } from '../modelos/usuarios.modelo';

import { ItemSlides } from '../modelos/slides.modelo';

import { ItemPlayeras } from '../modelos/playeras.modelo';

import { ServicioUsuarios } from '../servicios/usuario.servicios';

import { ServicioSlide } from '../servicios/slide.servicio';

import { ServicioPlayera } from '../servicios/playeras.servicio';

import { ServicioGaleria } from '../servicios/galeria.servicio';

import { Ruta } from '../ruta_global';

@Component({
  selector: 'app-login-content',
  templateUrl: '../vistas/loginContent.html',
  providers: [ServicioUsuarios, ServicioSlide, ServicioGaleria, ServicioPlayera]

})

export class LoginContentComponent implements OnInit {

  public identificado;
  public usuario;
  public listaUsuarios: ListaUsuarios;
  public itemSlides: ItemSlides;
  public itemPlayeras: ItemPlayeras;
// public itemGalerias: ItemGalerias;
  public validarIngreso = false;
  public mensaje;
  public subirImagen: Array<File>;
  public url: string;

  constructor(private _servicioUsuarios: ServicioUsuarios,
              private _servicioSlide: ServicioSlide, private _servicioPlayera: ServicioPlayera, private _servicioGaleria: ServicioGaleria) {

    this.listaUsuarios = new ListaUsuarios('', '');
    this.itemSlides = new ItemSlides('', '', '');
    this.itemPlayeras = new ItemPlayeras('', '', '', '', '', '', '');
    this.url = Ruta.url;
  }

  ngOnInit() {

    this.identificado = localStorage.getItem('id');
    this.usuario = localStorage.getItem('usuario');
  }

  onSubmit() {

    this._servicioUsuarios.login(this.listaUsuarios, 'true').subscribe(

      resultado => {

        this.identificado = resultado.token;
        this.usuario = resultado.seleccionUsuario.usuario;

        localStorage.setItem('id', this.identificado);
        localStorage.setItem('usuario', this.usuario);
      },

      error => {

        this.validarIngreso = true;
        const errorMensaje = JSON.parse(error._body);
        this.mensaje = errorMensaje.message;
      }

    );
    // console.log("Aqui: "+this.listaUsuarios);
    // console.log(this.listaUsuarios.password);
  }

  cerrarSesion() {

    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.clear();
    this.identificado = null;
    this.usuario = null;
    document.location.reload(true);

  }

  cargarFichero(fileInput: any) {

    this.subirImagen = <Array<File>>fileInput.target.files;
    console.log('Imagen: ', this.subirImagen);

    if (this.subirImagen[0].size < 2000000 && this.subirImagen[0].type === 'image/jpeg' || this.subirImagen[0].type === 'image/png') {

      this.validarIngreso = false;
      return this.subirImagen;

    } else {

      this.validarIngreso = true;
      this.mensaje = 'Algo salio mal al subir la imagen';
      this.subirImagen = null;
      return this.subirImagen;
    }
  }

  nuevoSlide() {

    this._servicioSlide.subirImagenSlide(this.url + 'crear-slide', this.itemSlides, this.identificado, this.subirImagen).then(() => {

        window.location.reload();
      },
      (error) => {
        this.validarIngreso = true;
        console.log('Error: ' + error);
        this.mensaje = 'Algo salio mal al subir la imagen';
      });
    // console.log(this.itemSlides);
  }

  nuevaPlayera() {

    this._servicioPlayera.subirImagenPlayera(this.url + 'crear-playeras', this.itemPlayeras, this.identificado,
      this.subirImagen).then(() => {

        window.location.reload();
      },
      (error) => {
        this.validarIngreso = true;
        console.log('Error: ' + error);
        this.mensaje = 'Algo salio mal al subir la imagen';
      });
    // console.log(this.itemSlides);
  }

  nuevaFotoGaleria() {

    this._servicioGaleria.subirFotoGaleria(this.url + 'crear-foto', this.identificado, this.subirImagen).then(() => {

        window.location.reload();
      },
      (error) => {
        this.validarIngreso = true;
        console.log('Error: ' + error);
        this.mensaje = 'Algo salio mal al subir la foto';
      });
    // console.log(this.itemSlides);
  }
}
