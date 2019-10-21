import { Injectable } from '@angular/core';

@Injectable()
export class ContactService {
  contactList: Array<any> = [
    ];

  constructor() { }
  
  public pushToArray(obj, index) {
    // const index = arr.findIndex((e) => e.id === obj.id);
      this.contactList[index] = obj;
  }

  public removeFromArray(arr, obj) {
    const index = arr.findIndex((e) => e.id === obj.id);

    if (index === -1) {
      arr.splice(obj);
    } else {
      arr[index] = obj;
    }
  }

  public getContactsJson() {
    return this.contactList;
  }

  public addContact(contactObj) {
    this.contactList.push(contactObj);
  }

  public removeContact(index) {
    this.contactList = this.contactList.splice(index);
  }

  public updateContactList(contactObj, index) {
    this.contactList[index] = contactObj;
  }
}

export class Contact {
  id: number;
  name: string;
  number: number;
  email: string;
}