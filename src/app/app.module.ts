import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

//RUtas
import{routing, appRoutingProviders} from './app.routing';
//
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {HomeComponent} from './component/home.component';
import {ErrorComponent} from './component/error.component';
import {ProductoListComponent} from './component/producto-list.component';
import {ProductoAddComponent} from './component/producto-add.component';
import {ProductoDetailComponent} from './component/producto-detail.component';
import {ProductoEditComponent} from './component/producto-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ProductoListComponent,
    ProductoAddComponent,
    ProductoDetailComponent,
    ProductoEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
