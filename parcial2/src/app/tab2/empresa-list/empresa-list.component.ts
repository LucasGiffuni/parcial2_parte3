import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { EmpresaComponent } from "./empresa/empresa.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IEmpresa } from 'src/app/interfaces/IEmpresa';
import { IResponse } from 'src/app/interfaces/iresponse';
import { CookieService } from 'src/app/services/cookie.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
    selector: 'app-empresa-list',
    templateUrl: './empresa-list.component.html',
    standalone: true,
  	imports: [RouterModule, CommonModule, EmpresaComponent, IonicModule],
    styleUrls: ['./empresa-list.component.scss'],
})
export class EmpresaListComponent  implements OnInit {

	empresaList: IEmpresa[] = [];
	private data = inject(EmpresaService);
	empresaService: EmpresaService = inject(EmpresaService);
	cookieService: CookieService = inject(CookieService);
	alertController: any;

	constructor() {}

	async ngOnInit() {
		await this.getEmpresas();
	}

	refresh(ev: any) {
	  setTimeout(() => {
		(ev as RefresherCustomEvent).detail.complete();
	  }, 3000);
	}

	async getEmpresas() {
		await this.empresaService.getEmpresas()
		  .then((value: IResponse<IEmpresa>) => {
			if (value.Result.statuscode === "403") {
			  this.openSnackBar("Session expired", "Cerrar")

			  	const router = document.querySelector('ion-router');
				const routeRedirect = document.createElement('ion-route-redirect');
				routeRedirect.setAttribute('from', '*');
				routeRedirect.setAttribute('to', '/login');

			} else {
			  value.data.forEach(element => {
				this.empresaList.push(element);
			  });
			}
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }

	  async openSnackBar(message: string, action: string) {
		const alert = await this.alertController.create({
		  header: message,
		  buttons: [action]
		});
		await alert.present();
	  }

}
