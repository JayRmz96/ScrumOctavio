import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

/*import { HttpModule } from '@angular/http';*/

import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { IndexComponent } from './componentes';

import { HeaderComponent } from './componentes/header';

import { SegmentComponent } from './componentes/segment';

import { LoginComponent } from './componentes/logIn';

import { LoginPacienteComponent } from './componentes/logInPaciente';

import { LoginContentComponent } from './componentes/loginContent';

import { LoginPacienteContentComponent } from './componentes/loginPacienteContent';

import { SigninComponent } from './componentes/signin';

import { SigninContentComponent } from './componentes/signinContent';

import { CategoriesComponent } from './componentes/categories';

import { TypesComponent } from './componentes/tipos';

import { routing, appRoutingProviders } from './app.rutas';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SegmentComponent,
    HeaderComponent,
    LoginComponent,
    LoginPacienteComponent,
    LoginContentComponent,
    LoginPacienteContentComponent,
    SigninContentComponent,
    SigninComponent,
    CategoriesComponent,
    TypesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
