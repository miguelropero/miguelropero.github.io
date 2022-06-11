import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/index';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }


  login(user: User): Observable<User> {
    const apiUrl = environment.apiUrl + "login";
    const headersApi = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    return this.http.post<User>(apiUrl, user, {headers: headersApi}).pipe(
      catchError(this.handleHttpError)
    );
  }

  public handleHttpError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if(error.status && error.error){
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
      }else{
          console.error(error);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
