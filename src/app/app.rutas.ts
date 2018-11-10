import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './componentes';

import { CategoriesComponent } from './componentes/categories';

import { LoginComponent } from './componentes/logIn';

import { LoginPacienteComponent } from './componentes/logInPaciente';

import { SigninComponent } from './componentes/signin';

import {SigninPacientesComponent} from './componentes/signinPacientes';
import {SigninDoctoresComponent} from './componentes/signinDoctores';

const appRoutes: Routes = [

  {path: '', component: IndexComponent},
  {path: 'index', component: IndexComponent},
  {path: 'logInDoctor', component: LoginComponent},
  {path: 'logInPaciente', component: LoginPacienteComponent},
  {path: 'signIn', component: SigninComponent},
  {path: 'signinDoctores', component: SigninDoctoresComponent},
  {path: 'signinPaciente', component: SigninPacientesComponent},
  {path: 'app-categories', component: CategoriesComponent},
  {path: '**', component: IndexComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
