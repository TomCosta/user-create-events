import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, MenuController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public database: SQLite;
  public evento: any;

  constructor(public navCtrl: NavController, public sqliteService: SqlStorageProvider,
    protected platform: Platform, public authData: AuthData, private menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    this.navCtrl = navCtrl;
    //First We need to ready the Platform
    this
      .platform
      .ready()
      .then(() => {
        this
          .sqliteService
          .getRows().then(s => {
            this.evento = this.sqliteService.arr;
            console.log('Lendo o db getRows(): ', s)
            console.log('Lendo o db this.sqliteService.arr: ', this.sqliteService.arr)
          });
      })
  }
}