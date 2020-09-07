import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  userToken: string;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.userToken = localStorage.getItem('token')
    const headers = new HttpHeaders(
      {
        "Authorization": "Bearer " + this.userToken,
      }
    );
    
    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.mensajeError)
    );
  }

  mensajeError(error: HttpErrorResponse) {
    console.log('Sucedió un error');
    console.warn(error);
    return throwError('Error personalizado');
  }
  
}
