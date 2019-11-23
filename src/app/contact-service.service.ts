import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactService {
  contactList: Array<any> = [
    ];

  constructor(private db: AngularFireDatabase) { 
    // this.getContactsJson();
  }
  
  public pushToArray(obj, index) {
    // const index = arr.findIndex((e) => e.id === obj.id);
    // this.contactList[index] = obj;

    this.db.list('CONTATOS').push(obj)
      .then((result: any) => {
        console.log("enviado ao Firebase:", result.key);
      });
  }

  public removeFromArray(arr, obj) {
    const index = arr.findIndex((e) => e.id === obj.id);

    if (index === -1) {
      arr.splice(obj);
    } else {
      arr[index] = obj;
    }
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

  getContactsJson() {
     return this.db.list('CONTATOS')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(this.documentToDomainObject);
        })
      );
  }

  public addContact(contactObj) {
    // this.contactList.push(contactObj);
    this.db.list('CONTATOS').push(contactObj)
      .then((result: any) => {
        console.log("enviado ao Firebase:", result.key);
      });
  }

  public removeContact(index) {
    // this.contactList = this.contactList.splice(index);
    this.db.object(`CONTATOS/${index}`).remove();
  }

  public updateContactList(contactObj, index) {
    // this.contactList[index] = contactObj;
    this.db.list('CONTATOS').update(index, contactObj)
      .catch((error: any) => {
        console.error(error);
    });
  }
}

export class Contact {
  id: number;
  name: string;
  number: number;
  email: string;
}