import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { AddEventsPage } from '../pages/add-events/add-events';

import { Login } from '../pages/login/login';

import { ResetPassword }from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthData } from '../providers/auth-data';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
      Login,
      ResetPassword,
      AccountPage,
      AddEventsPage,
      Signup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
      Login,
      ResetPassword,
      AccountPage,
      AddEventsPage,
      Signup
  ],
  providers: [
    AuthData,
    StatusBar,
    SplashScreen,
    SQLite,
    SqlStorageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
