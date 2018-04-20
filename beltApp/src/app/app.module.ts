import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewComponent } from './new/new.component';
import { AllComponent } from './all/all.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    AllComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
