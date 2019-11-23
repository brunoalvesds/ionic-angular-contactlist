import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from '../contact-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contactList = [];
  newContactActive: boolean = false;
  itemIndex: any;

  items: Observable<any[]>;

  constructor(private router: Router, private contactService: ContactService, private db: AngularFireDatabase) {
    this.db.list('CONTATOS').snapshotChanges().subscribe(res => {
      console.log(res);
      this.contactList = res;
      res.forEach((item) => {
        console.log(item);
      });
    });
    // this.contactList = this.contactService.getContactsJson();
    console.log("contact list loadedddd: ", this.contactList);
  }

  addContact() {
    this.contactService.addContact(this.contactForm.value);
  }

  openContact(item, index) {
    //posição do item na lista de contatos
    item.id = index;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(item)
      }
    };
    this.router.navigate(['detalhes'], navigationExtras);
  }

  //Campos para edição
  contactForm = new FormGroup({
    name: new FormControl('name'),
    number: new FormControl('number'),
    email: new FormControl('email')
  });

}
