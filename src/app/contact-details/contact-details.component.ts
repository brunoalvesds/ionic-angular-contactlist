import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  contactDetails = {
    id: null,
    name: null,
    number: null,
    email: null
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.contactDetails = JSON.parse(params.special);
      }
      // console.log("rapadura é doce mas não é mole não: ", this.contactDetails);
    });
  }

  //Campos para edição
  contactForm = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
  });

  // updateName() {
  //   this.contactForm.name.setValue('Nancy');
  // }
}
