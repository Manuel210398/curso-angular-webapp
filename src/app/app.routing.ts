import{ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home.component';
import {ErrorComponent} from './component/error.component';
import {ProductoListComponent} from './component/producto-list.component';
import {ProductoAddComponent} from './component/producto-add.component';
import {ProductoDetailComponent} from './component/producto-detail.component';
import {ProductoEditComponent} from './component/producto-edit.component';


const appRoutes: Routes = [
  {path:'',component: HomeComponent},
  {path:'pagina-principal', component: HomeComponent},
  {path:'product', component: ProductoListComponent},
  {path:'product-add', component: ProductoAddComponent},
  {path:'product-detail/:id', component: ProductoDetailComponent},
  {path:'product-edit/:id', component: ProductoEditComponent},
  {path: '**', component: ErrorComponent}
];

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
