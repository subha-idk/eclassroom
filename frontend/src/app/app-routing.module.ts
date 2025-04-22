import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  
  {
    path:'',
    loadChildren:()=> import('./shared/shared.module').then((m)=>m.SharedModule),
    
  },
  {
    path:'auth',
    loadChildren:()=> import('./authentication/authentication.module').then((m)=>m.AuthenticationModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
