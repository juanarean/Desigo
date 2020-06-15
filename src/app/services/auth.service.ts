import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private API_KEY = 'AIzaSyBXE1YNraaBNEXECbeTqOilI6ZWQ1hh8HQ';

  userToken: string = '';

  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(
    private http: HttpClient
  ) { }

  logout() {

  }

  login(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      // ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/accounts:signInWithPassword?key=${this.API_KEY}`, authData).pipe(map(resp => {
      console.log("Entro al map del rxjs");
      this.guardarToken(resp['idToken']);
      return resp;
    }));
    
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      // ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}/accounts:signUp?key=${this.API_KEY}`, authData).pipe(map(resp => {
      this.guardarToken(resp['idToken']);
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
