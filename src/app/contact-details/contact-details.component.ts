import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact-service.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  contactDetails = {
    name: null,
    number: null,
    email: null
  };

  inputsDisabled: boolean = true;

  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm.controls['name'].disable();
    this.contactForm.controls['number'].disable();
    this.contactForm.controls['email'].disable();

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.contactDetails = JSON.parse(params.special);
      }
      // console.log("rapadura é doce mas não é mole não: ", this.contactDetails);
    });
  }

  editContact() {
    this.inputsDisabled = !this.inputsDisabled;
    this.contactForm.controls['name'].enable();
    this.contactForm.controls['number'].enable();
    this.contactForm.controls['email'].enable();
  }

  saveContact() {
    var contactObj = this.contactForm.value;
    this.inputsDisabled = !this.inputsDisabled;
    this.contactService.updateContactList(contactObj);
  }

  //Campos para edição
  contactForm = new FormGroup({
    name: new FormControl('name'),
    number: new FormControl('number'),
    email: new FormControl('email'),
  });

  // updateName() {
  //   this.contactForm.name.setValue('Nancy');
  // }
}
