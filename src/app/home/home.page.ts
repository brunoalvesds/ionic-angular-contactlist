import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from '../contact-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contactList = this.contactService.getContactsJson();
  newContactActive: boolean = false;

  constructor(private router: Router, private contactService: ContactService) {
    
  }

  addContact() {
    this.contactService.addContact(this.contactForm.value);
    this.contactList;
  }

  openContact(item, index) {

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
    email: new FormControl('email'),
  });

}
