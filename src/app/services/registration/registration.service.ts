
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'https://twitterapiv.azurewebsites.net/api/Tweet/createUser'; // Change this to your actual backend API URL

  constructor(private http: HttpClient) { }

  registerUser(user: IUser): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }
}