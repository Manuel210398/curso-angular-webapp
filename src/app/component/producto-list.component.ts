import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProductoServicios} from '../servicios/producto.service';
import {Producto} from '../models/producto';
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'productos-list',
  templateUrl: '../views/productos-list.html',
 providers: [ProductoServicios]
})
export class ProductoListComponent
{
  public titulo: string;
  public productos: Producto[];
  public confirmado;
  constructor (
    private _route:ActivatedRoute,
    private _router: Router,
   private _productoServicio: ProductoServicios
  )
  {
    this.titulo= 'Listado de Productos';
    this.confirmado= null;
  }
  ngOnInit ()
  {

    console.log("Se ha cargado el component list-productos");
    //alert(this._productoServicio.getProductos());
    this.getProductos();
    //console.log(this._productoServicio.getProductos());
  }
  getProductos()
  {
    this._productoServicio.getProductos().subscribe(
            result => {
              console.log(result);
               if(result.code !== 200)
               {
                    console.log(result);
               }else{
                    this.productos = result.data;
               }
            },
            error => {
                console.log(<any>error);
            }
        );
  }
  borrarConfirm (id)
  {
    this.confirmado=id;
  }
  cancelarConfirm()
  {
    this.confirmado= "";
  }
  onDeleteProduct(id)
  {
    this._productoServicio.deleteProducto(id).subscribe(
      response =>
      {
          this.getProductos();
      },
      error =>
      {
        console.log(<any>error)
      }
    )

  }
}
