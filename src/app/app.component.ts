import { Platform } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { AccountPage } from '../pages/account/account';
import { AddEventsPage } from '../pages/add-events/add-events';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';

import { AuthData } from '../providers/auth-data';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

@ViewChild(Nav) nav: Nav;

    rootPage:any = HomePage; // TabsPage;
    pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public sqliteService: SqlStorageProvider, public authData: AuthData) {

    this.pages = [
      { title: 'Eventos', component: HomePage },
      { title: 'Usuário', component: AccountPage },
      { title: 'Criar Eventos', component: AddEventsPage }
    ];
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAhmIy_-JHmSNMOc7RwjfmCvmyNcrGwRHA",
        authDomain: "teste-ionic-a5c02.firebaseapp.com",
        databaseURL: "https://teste-ionic-a5c02.firebaseio.com",
        projectId: "teste-ionic-a5c02",
        storageBucket: "gs://teste-ionic-a5c02.appspot.com/user-pictures",
        messagingSenderId: "949273116314"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {

          if (!user) {
              console.log("not login");
              this.rootPage = Login;


          } else {
              console.log("login");
              this.rootPage = HomePage;

          }

      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.sqliteService.openDb(); 
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logOut() {
      this.authData.logoutUser().then(() => {
          this.nav.setRoot(Login);
      });
  }
}
