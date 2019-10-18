import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contactList:object;

  constructor(private router: Router) {
    this.contactList = [
      {
        id: 0,
        name: "Ana Batista",
        number: "11 01020304",
        email: "email@test.com"
      },
      {
        id: 1,
        name: "Afonso Siqueira",
        number: "11 01020304",
        email: "email@test.com"
      },
      {
        id: 2,
        name: "Barbara Dias",
        number: "11 01020304",
        email: "email@test.com"
      },
      {
        id: 3,
        name: "Cristiano Ronaldo",
        number: "11 01020304",
        email: "email@test.com"
      },
      {
        id: 4,
        name: "Denis",
        number: "11 01020304",
        email: "email@test.com"
      },
      {
        id: 5,
        name: "Euclides B.",
        number: "11 01020304",
        email: "email@test.com"
      },
      {
        id: 6,
        name: "Fernanda W.",
        number: "11 01020304",
        email: "email@test.com"
      },
      {
        id: 7,
        name: "Fernanza Zattini",
        number: "11 01020304",
        email: "email@test.com"
      },
    ];
  }

  openContact(item, index) {
    // console.log("eae: ", item);
    // item = JSON.stringify(item);
    // this.router.navigate(['/detalhes/'], item);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(item)
      }
    };
    this.router.navigate(['detalhes'], navigationExtras);
  }

}
