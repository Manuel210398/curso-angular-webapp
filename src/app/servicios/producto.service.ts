import {Injectable} from '@angular/core';

import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
import {Producto} from '../models/producto';
import {GLOBAL} from './global';
import {map} from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
@Injectable()
export class ProductoServicios
{
  public url: string;
  constructor (public _http: HttpClient)
  {
    //this.url = GLOBAL.url
    this._http.get(this.url);
  }
  getProducto(id): Observable<any>
  {
    return this._http.get('http://localhost/cursoAngular-backend/index.php/producto/'+id);
  }
  getProductos(): Observable<any>
  {
    //return (this._http.get(this.url+'producto'));
    //return this._http.get(this.url+'producto');
      return this._http.get('http://localhost/cursoAngular-backend/index.php/producto');
    //return this._http.get(this.url+'productos').pipe(map(res => res.json()));

    //return this._http.get(this.url+'producto').pipe(map((res: Response) => res.json()));
    //return this._http.get(this.url+'productos') ;
    //return this._http.get(this.url).toPromise().then(response => response.json().data as Post[]);
  }
  addProducto(producto: Producto): Observable<any>
  {
        let json = JSON.stringify(producto);
        //El backend recogerá un parametro json
        let params = "json="+json;
        //Establecemos cabeceras
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.post('http://localhost/cursoAngular-backend/index.php/producto', params, {headers: headers});
    }
    makeFileRequest(url:string, params:Array<string>, files:Array<File>)
    {
      return new Promise ((resolve, reject) =>{
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for (var i=0; i<files.length; i++)
        {
          formData.append('uploads[]', files[i], files[i].name);
        }
        xhr.onreadystatechange = function()
        {
          if(xhr.readyState == 4)
          {
            if (xhr.status == 200)
            {
              resolve(JSON.parse(xhr.response));
            }
            else
            {
              reject(xhr.response);
            }
          }
        };
        xhr.open("POST",url,true);
        xhr.send(formData);
      });
    }
    editProducto(id,producto:Producto)
    {
      let json = JSON.stringify(producto);
      let params = "json="+json;
      let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.post('http://localhost/cursoAngular-backend/index.php/update-producto/'+id, params, {headers: headers});
    }
    deleteProducto(id)
    {
      return this._http.get('http://localhost/cursoAngular-backend/index.php/delete-producto/'+id);
    }
}
