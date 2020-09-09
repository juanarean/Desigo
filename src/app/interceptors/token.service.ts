import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  userToken: string;

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.userToken = localStorage.getItem('token')
    if(this.userToken) {
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

    return next.handle(req);
    
  }

  mensajeError(error: HttpErrorResponse) {
    console.log('Sucedió un error');
    console.warn(error);
    Swal.fire({
      type: 'error',
      text: 'Token vencido'
    });
    this.router.navigateByUrl('/login');
    return throwError('Error personalizado');
  }
  
}
