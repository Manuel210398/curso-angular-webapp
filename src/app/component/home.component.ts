import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: '../views/home.html'
})
export class HomeComponent
{
  public titulo: string;
  constructor ()
  {
    this.titulo= 'Webapp de Productos';
  }
  ngOnInit ()
  {
    console.log("Se ha cargado el component home");
  }
}
