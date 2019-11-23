import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
  inputsDisabled: boolean = true;
  contactDetails = {
    id: null,
    name: null,
    number: null,
    email: null
  };

  //Criando campos para edição
  contactForm = new FormGroup({
    name: new FormControl(this.contactDetails.name),
    number: new FormControl(this.contactDetails.number),
    email: new FormControl(this.contactDetails.email),
  });




  constructor(private route: ActivatedRoute, private contactService: ContactService, private nav: NavController) { }

  ngOnInit() {
    //Desativando campos
    this.contactForm.controls['name'].disable();
    this.contactForm.controls['number'].disable();
    this.contactForm.controls['email'].disable();


    //Capturando parâmetros da URL
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.contactDetails = JSON.parse(params.special);

        //Setando os valores herdados
        this.contactForm.controls['name'].setValue(this.contactDetails.name);
        this.contactForm.controls['number'].setValue(this.contactDetails.number);
        this.contactForm.controls['email'].setValue(this.contactDetails.email);

      } else {
        console.error("Parâmetros inválidos.");
      }
    });
  }

  editContact() {
    //Ativando cmapos para edição
    this.inputsDisabled = !this.inputsDisabled;
    this.contactForm.controls['name'].enable();
    this.contactForm.controls['number'].enable();
    this.contactForm.controls['email'].enable();
  }

  saveContact() {
    //Capturando dados do formulário e adicionando id do item
    var contactObj = this.contactForm.value
    contactObj.id = this.contactDetails.id;

    //Desativando inputs
    this.inputsDisabled = !this.inputsDisabled;

    //Salvando alterações no service
    this.contactService.updateContactList(contactObj, contactObj.id);
  }

  removeContact() {
    var confirm = window.confirm("Deseja realmente remover este contato?");
    if (confirm) {
      this.nav.back();
      this.contactService.removeContact(this.contactDetails.id);
    } else {
      return
    }
  }
}
