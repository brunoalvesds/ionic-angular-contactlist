import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from './database.service';

@Injectable()
export class ContactService {

  constructor(private dbProvider: DatabaseService) { }

  public insert(contact: Contact) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into contacts (name, number) values (?, ?)';
        let data = [contact.name, contact.price, contact.duedate, contact.active ? 1 : 0, contact.category_id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(contact: Contact) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update contacts set name = ?, price = ?, duedate = ?, active = ?, category_id = ? where id = ?';
        let data = [contact.name, contact.price, contact.duedate, contact.active ? 1 : 0, contact.category_id, contact.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from contacts where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from contacts where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let contact = new Contact();
              contact.id = item.id;
              contact.name = item.name;
              contact.price = item.price;
              contact.duedate = item.duedate;
              contact.active = item.active;
              contact.category_id = item.category_id;

              return contact;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(active: boolean, name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT p.*, c.name as category_name FROM contacts p inner join categories c on p.category_id = c.id where p.active = ?';
        var data: any[] = [active ? 1 : 0];

        // filtrando pelo nome
        if (name) {
          sql += ' and p.name like ?'
          data.push('%' + name + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let contacts: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var contact = data.rows.item(i);
                contacts.push(contact);
              }
              return contacts;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Contact {
  id: number;
  name: string;
  price: number;
  duedate: Date;
  active: boolean;
  category_id: number;
}