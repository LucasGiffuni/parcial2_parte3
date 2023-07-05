import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IPerson } from 'src/app/interfaces/IPerson';
import { PersonService } from 'src/app/services/person.service';
import { CookieService } from 'src/app/services/cookie.service';
import { IResponse } from 'src/app/interfaces/IResponse';
import { PersonComponent } from './person/person.component';
// import { CookieService } from '../services/cookie.service';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  standalone:true,
  imports: [IonicModule, PersonComponent, CommonModule, RouterModule],
})
export class PersonListComponent  implements OnInit {

  	peopleList: IPerson[] = [];
	private data = inject(PersonService);
	personService: PersonService = inject(PersonService);
	cookieService: CookieService = inject(CookieService);
	alertController: any;

	constructor() {}

	async ngOnInit() {
		await this.getPeople();
	}

	refresh(ev: any) {
	  setTimeout(() => {
		(ev as RefresherCustomEvent).detail.complete();
	  }, 3000);
	}

	async getPeople() {
		await this.personService.getPeople()
		  .then((value: IResponse<IPerson>) => {
			if (value.Result.statuscode === "403") {
			  this.openSnackBar("Session expired", "Cerrar")

			  	const router = document.querySelector('ion-router');
				const routeRedirect = document.createElement('ion-route-redirect');
				routeRedirect.setAttribute('from', '*');
				routeRedirect.setAttribute('to', '/login');

			} else {
			  value.data.forEach(element => {
				this.peopleList.push(element);
			  });
			}
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }
	  /*async getSongs() {
		const songs = await this.songService.getSongs();
		songs.data.forEach(song => this.songList.push(song))
	  }*/

	  async openSnackBar(message: string, action: string) {
		const alert = await this.alertController.create({
		  header: message,
		  buttons: [action]
		});
		await alert.present();
	  }

}
