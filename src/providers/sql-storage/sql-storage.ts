import { Injectable } from '@angular/core';
/*
  Generated class for the Sqlite provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var window : any;
@Injectable()
export class SqlStorageProvider {
  public text : string = '';
  message: string = '';
  phone: string = '';
  name: string = '';
  SQLITE_DB_NAME = 'teste.db';
  public db = null;
  public arr = [];
  constructor() {}
 /**
  * 
  * Open The Datebase
  */
  openDb() {
    this.db = window
      .sqlitePlugin
      .openDatabase({name: 'teste.db', location: 'default'}); // usar no Device
//      .openDatabase(this.SQLITE_DB_NAME, '1.0', 'database', 5 * 1024 * 1024); //usar no Chrome
    try {
      this.db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS evento (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, message TEXT)');
      }, (e) => {
        console.log('Transtion Error', e);
      }, () => {
        console.log('Populated Datebase OK..');
      })
    } catch (err) {
      console.log('Erro abrir db: ', err)
    }
  }
  /**
   * 
   * @param addItem for adding: function
   */
  addItem(i) {
    return new Promise(resolve => {
      var InsertQuery = 'INSERT INTO evento (name, phone, message) VALUES (?, ?, ?)';
      this
        .db
        .executeSql(InsertQuery, [i.value.name, i.value.phone, i.value.message], (r) => {
          console.log('Inserted: ', i.value.name, i.value.phone, i.value.message);
          this
            .getRows()
            .then(s => {
              resolve(true)
            });
        }, e => {
          console.log('Inserted Error', e);
          resolve(false);
        })
    })
  }

  //Refresh everytime

  getRows() {
    return new Promise(res => {
      this.arr = [];
      let query = 'SELECT * FROM evento ORDER BY id DESC';
      this
        .db
        .executeSql(query, [], rs => {
          if (rs.rows.length > 0) {
            for (var i = 0; i < rs.rows.length; i++) {
              var item = rs
                .rows
                .item(i);
              this
                .arr
                .push(item);
            }
          }
          res(true);
        }, (e) => {
          console.log('Sql Query Error', e);
        });
    })

  }
  //to delete any Item
  del(id) {
    return new Promise(resolve => {
      var query = 'DELETE FROM evento WHERE id=?';
      this
        .db
        .executeSql(query, [id], (s) => {
          console.log('Delete Success...', s);
          this
            .getRows()
            .then(s => {
              resolve(true);
            });
        }, (err) => {
          console.log('Deleting Error', err);
        });
    })

  }
  //to Update any Item
  update(id, txt) {
    return new Promise(res => {
      var query = 'UPDATE evento SET phone=?  WHERE id=?';
      this
        .db
        .executeSql(query, [
          txt, id
        ], (s) => {
          console.log('Update Success...', s);
          this
            .getRows()
            .then(s => {
              res(true);
            });
        }, (err) => {
          console.log('Updating Error', err);
        });
    })

  }
}