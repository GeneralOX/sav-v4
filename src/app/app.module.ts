
import { NgModule } from '@angular/core'
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './services/api.service';

// COMPOENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login.component';
import { SearchComponent } from './components/search.component';
import { MainComponent } from './pages/main.component';
import { NotFoundComponent } from './pages/notfound.component';

@NgModule({
  declarations: [
    AppComponent, SearchComponent, LoginComponent, MainComponent, NotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
