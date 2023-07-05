import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Login
  url = 'http://localhost:8000/Login';

  constructor(private http: HttpClient) { }
  async login(username: string, password: string) {
    const body = {
      username: "lucas",
      password: "pass"
    }
    return (await (await fetch(`${this.url}/login/validateUser`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })).json());
  }


 
}




