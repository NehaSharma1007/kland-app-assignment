import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'account', component: AccountComponent }
];
