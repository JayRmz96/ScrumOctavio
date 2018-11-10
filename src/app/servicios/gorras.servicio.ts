import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Ruta } from '../ruta_global';

@Injectable()

export class ServicioGorra {

  public url: string;

  constructor(private _http: Http) {

    this.url = Ruta.url;
  }

  tomarJsonSlide() {

    return this._http.get(this.url + 'mostrar-gorras').pipe(map(resultado => resultado.json()));
  }

  subirImagenGorra(url, items, token, imagen) {

    if (!imagen) {

      return new Promise(function(resolver, rechazar) {

        rechazar('No hay imagen para subir');
      });
    } else {

      return new Promise(function(resolver, rechazar) {

        const formData: any = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('imagen', imagen[0]);
        formData.append('nombre', items.nombre);
        formData.append('sexo', items.sexo);
        formData.append('color', items.color);
        formData.append('precio', items.precio);
        formData.append('descripcion', items.descripcion);

        xhr.onreadystatechange = function() {

          if (xhr.readyState === 4) {

            if (xhr.status === 200) {

              resolver(JSON.parse(xhr.response));
            } else {

              rechazar(xhr.response);
            }
          }
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send(formData);
      });
    }
  }

  actualizarItemGorra(url, items, token, imagen) {

    if (!imagen) {

      return new Promise(function(resolver, rechazar) {

        const formData: any = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('nombre', items.nombre);
        formData.append('sexo', items.sexo);
        formData.append('color', items.color);
        formData.append('precio', items.precio);
        formData.append('descripcion', items.descripcion);
        formData.append('actualizarImagen', 0);
        formData.append('rutaImgenActual', items.imagen);

        xhr.onreadystatechange = function() {

          if (xhr.readyState === 4) {

            if (xhr.status === 200) {

              resolver(JSON.parse(xhr.response));
            } else {

              rechazar(xhr.response);
            }
          }
        };

        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send(formData);
      });

    } else {

      return new Promise(function(resolver, rechazar) {

        const formData: any = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('imagen', imagen[0]);
        formData.append('nombre', items.nombre);
        formData.append('sexo', items.sexo);
        formData.append('color', items.color);
        formData.append('precio', items.precio);
        formData.append('descripcion', items.descripcion);
        formData.append('actualizarImagen', 1);
        formData.append('rutaImagenActual', items.imagen);

        xhr.onreadystatechange = function() {

          if (xhr.readyState === 4) {

            if (xhr.status === 200) {

              resolver(JSON.parse(xhr.response));
            } else {

              rechazar(xhr.response);
            }
          }
        };

        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Authorization', token);
        xhr.send(formData);
      });
    }
  }

  borrarItemSlide(id) {

    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});

    return this._http.delete(this.url + 'borrar-gorras/' + id, {headers: headers}).pipe(map(resultado => resultado.json()));

  }
}
