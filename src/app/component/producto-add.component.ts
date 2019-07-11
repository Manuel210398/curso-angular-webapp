import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProductoServicios} from '../servicios/producto.service';
import {Producto} from '../models/producto';
import {GLOBAL} from '../servicios/global';
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
@Component ({
  selector: 'producto-add',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoServicios]
})
export class ProductoAddComponent{
  public titulo: string;
  public producto: Producto;

  public filesToUpload;
  public resultUpload;
  constructor (
    private _productoService: ProductoServicios,
    private _route: ActivatedRoute,
    private _router: Router
  )
  {
    this.filesToUpload="";
    this.titulo = "Crear un nuevo Producto";
    this.producto = new Producto(0,'','',0,'');
  }
  ngOnInit()
  {
    console.log('Producto-add cargado');
  }
  onSubmit()
  {
    console.log(this.producto);
    if (this.filesToUpload.length >= 1)
    {
      this._productoService.makeFileRequest('http://localhost/cursoAngular-backend/index.php/upload-file', [], this.filesToUpload ).then((result)=>
      {
        console.log(result);
        this.resultUpload = result;
        this.producto.imagen = this.resultUpload.filename;
        this.saveProducto();
      }, (error) =>
      {
          console.log(error);
      });
    }
    else
    {
      this.saveProducto();
    }

  }
  saveProducto()
  {
    this._productoService.addProducto(this.producto).subscribe(
      response =>
      {
        if (response.code == 200)
        {
          this._router.navigate(['/product'])
        }
        else
        {
          console.log(response);
        }
      },
      error =>
      {
          console.log(<any>error);
      }
    )
  }
  fileChangeEvent(fileInput: any)
  {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }
}
