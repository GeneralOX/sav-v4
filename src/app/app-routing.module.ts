import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search.component';
import { WelcomeComponent } from './components/welcome.component';
import { IsSignedInGuard } from './is-signed-in.guard';
import { LoginComponent } from './pages/login.component';
import { MainComponent } from './pages/main.component';
import { NotFoundComponent } from './pages/notfound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [IsSignedInGuard],

    children: [
      { path: '', component: WelcomeComponent },
      { path: 'search', component: SearchComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
