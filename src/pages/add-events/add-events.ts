import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';
import { Events, ToastController } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorageProvider } from '../../providers/sql-storage/sql-storage';

/**
 * Generated class for the AddEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-events',
  templateUrl: 'add-events.html',
})
export class AddEventsPage {

  public database: SQLite;
  public evento: any;
    public argmts = {
    'name': '',
    'phone': '',
    'message': 'Hey! Adicione aqui o seu texto!'
  }

  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public sqliteService: SqlStorageProvider,
    protected platform: Platform, public events: Events) {
    this.navCtrl = navCtrl;
    //First We need to ready the Platform
    this
      .platform
      .ready()
      .then(() => {
        this
          .sqliteService
          .getRows()
          .then(s => {
            this.evento = this.sqliteService.arr;
            console.log('Lendo o db getRows(): ', s)
            console.log('Lendo o db this.sqliteService.arr: ', this.sqliteService.arr)
          });
      })
  }
  //Adding the Function
  addContact(i) {
    this
      .sqliteService
      .addItem(i)
      .then(s => {
        this.evento = this.sqliteService.arr;
        console.log('Salvando no db: ', i.value);
        let successToast = this.toastCtrl.create({
          message: " Adicionado com sucesso!",
          duration: 2000,
          cssClass: 'babypadClassToast',
          position: 'middle'
        })
        successToast.present();
        this.argmts = {
          'name': '',
          'phone': '',
          'message': 'Hey! Algo está errado!'
        };
      });
  }

  //Deleting function
  delete(i) {
    this
      .sqliteService
      .del(i)
      .then(s => {
        this.evento = this.sqliteService.arr;
      });
  }

  //updating function
  update(id, evento) {
    var prompt = window.prompt('Edit', evento);
    this
      .sqliteService
      .update(id, prompt)
      .then(s => {
        this.evento = this.sqliteService.arr;
      });
  }  

  public contactsList() {
    this
      .sqliteService
      .getRows()
      .then(s => {
        this.evento = this.sqliteService.arr;
    });
    console.log('Em this.evento: ', this.evento);
  }
}