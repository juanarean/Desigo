import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://EGEON.sanabria.local:8080/api';
  private API_KEY = 'AIzaSyBXE1YNraaBNEXECbeTqOilI6ZWQ1hh8HQ';

  userToken: string = '';


  constructor(
    private http: HttpClient
  ) { }

  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      username: usuario.email,
      password: usuario.password,
      grant_type: 'password',
      // ...usuario,
      //returnSecureToken: true
    };

    const httpParams = new HttpParams()
    .set("username", usuario.email)
    .set("password", usuario.password)
    .set("grant_type", "password");

    const header = new HttpHeaders();

    header.append("Content-Type", "application/x-www-form-urlencoded");
    header.append("Host", "EGEON.sanabria.local");

    return this.http.post(`${this.url}/token`, httpParams, { headers : header}).pipe(map(resp => {
      console.log("Entro al map del rxjs");
      this.guardarToken(resp['access_token']);
      return resp;
    }));
    
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/accounts:signUp?key=${this.API_KEY}`, authData).pipe(map(resp => {
      this.guardarToken(resp['access_token']);
      return resp;
    }));
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {
    return this.userToken.length > 2;
  }
}
