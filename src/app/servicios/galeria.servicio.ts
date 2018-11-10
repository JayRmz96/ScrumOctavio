import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Ruta } from '../ruta_global';

@Injectable()

export class ServicioGaleria {

public url: string;

constructor(private _http: Http) {

  this.url = Ruta.url;
}

tomarJsonGaleria() {

  return this._http.get(this.url + 'mostrar-fotos').pipe(map(resultado => resultado.json()));
}

subirFotoGaleria(url, token, foto) {

  if (!foto) {

    return new Promise(function(resolver, rechazar) {

      rechazar('No hay imagen para subir');
    });
  } else {

    return new Promise(function(resolver, rechazar) {

      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('foto', foto[0]);

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

borrarItemFoto(id) {

  const headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});

  return this._http.delete(this.url + 'borrar-foto/' + id, {headers: headers}).pipe(map(resultado => resultado.json()));

}
}
