import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProductoServicios} from '../servicios/producto.service';
import {Producto} from '../models/producto';
import {GLOBAL} from '../servicios/global';
@Component ({
  selector: 'producto-detail',
  templateUrl: '../views/producto-detail.html',
  providers: [ProductoServicios]
})
export class ProductoDetailComponent
{
  public producto: Producto;
  constructor(
    private _productoService : ProductoServicios,
    private _route: ActivatedRoute,
    private _router: Router
  ){}
  ngOnInit()
  {
    console.log('producto-datail cargado');
    this.getProducto();
  }
  getProducto()
  {
    this._route.params.forEach((params: Params)=>
    {
      let id = params['id'];
      this._productoService.getProducto(id).subscribe(
        response =>
        {
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
