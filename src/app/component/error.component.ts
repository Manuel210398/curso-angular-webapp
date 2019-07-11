import {Component} from '@angular/core';

@Component ({
  selector: 'error',
  templateUrl: '../views/error.html'
})
export class ErrorComponent
{
  public titulo:string;
  constructor ()
  {
    this.titulo = "ERROR! Pagina no encontrada";
  }
  ngOnInit ()
  {
    console.log ("Componente Error ")
  }
}
