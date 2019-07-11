import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProductoServicios} from '../servicios/producto.service';
import {Producto} from '../models/producto';
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
import {ProductoAddComponent} from '../component/producto-add.component';
import {GLOBAL} from '../servicios/global';
@Component({
  selector: 'productos-edit',
  templateUrl: '../views/producto-add.html',
 providers: [ProductoServicios]
})
export class ProductoEditComponent
{
  public titulo:string;
  public producto: Producto;
  public filesToUpload;
  public resultUpload;
  public is_edit;
  constructor (
    private _productoService: ProductoServicios,
    private _route: ActivatedRoute,
    private _router: Router
  )
  {
    this.titulo= "Editar Producto";
    this.producto = new Producto (0,'','',1,'');
    this.is_edit = true;
  }
  ngOnInit()
  {
    console.log('edit component cargado');

    this.getProducto();
  }
  onSubmit()
  {
    console.log(this.producto);
    if (this.filesToUpload && this.filesToUpload.length >= 1)
    {
      this._productoService.makeFileRequest('http://localhost/cursoAngular-backend/index.php/upload-file', [], this.filesToUpload ).then((result)=>
      {
        console.log(result);
        this.resultUpload = result;
        this.producto.imagen = this.resultUpload.filename;
        this.UpdateProducto();
      }, (error) =>
      {
          console.log(error);
      });
    }
    else
    {
      this.UpdateProducto();
    }
  }
  UpdateProducto()
  {
    this._route.params.forEach((params: Params)=>
    {
      let id = params['id'];
      this._productoService.editProducto(id, this.producto).subscribe(
        response =>
        {
          //if (response.code == 200)
          //{
            this._router.navigate(['/product-detail',id])
          //}
          //else
          //{
            console.log(response);
          //}
        },
        error =>
        {
            console.log(<any>error);
        }
      );
    });
  }
  fileChangeEvent(fileInput: any)
  {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  getProducto()
  {
    this._route.params.forEach((params: Params)=>
    {
      let id = params['id'];
      console.log(id);
      this._productoService.getProducto(id).subscribe(
        response =>
        {
          console.log(response);
          if (response.code==200)
          {
            this.producto = response.data;

          }
          else
          {
            this._router.navigate(['/product']);
          }
        },
        error =>
        {
          console.log(<any>error);
        }
      )
    });
  }
}
