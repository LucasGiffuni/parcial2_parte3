import { Component, OnInit,inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { CookieService } from 'src/app/service/cookie.service';

//Crear boton en html que llame al metodo login
//Verificar que queden bien las cookies
@Component({
  selector: 'app-login',
  
  template: ` 

`,

  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
	cookieService: CookieService = inject(CookieService);
  loginService: UserService = inject(UserService);


  constructor() { }
  ngOnInit() {}
  login() {
    
		this.loginService.login("lucas", "pass").then((response) => {
		  this.cookieService.set('USERID', response.user.idUsuario);

		  if (response.resultado.statusCode == '404') {
			
		  } else if (response.resultado.statusCode == '200') {
			this.cookieService.set('SESSIONID', response.user.token);
		
		  }
		});
	  } 
	}



