// TweetsService

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITweet } from 'src/app/model/tweets';
import { IUser } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  private apiUrl = 'https://twitterapiv.azurewebsites.net/api/Tweet';

  constructor(private http: HttpClient) { }

  getTweets(): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(`${this.apiUrl}/Tweets`);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/Users`);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/UsersByName`, { params: { username } });
  }

  deleteTweet(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this.apiUrl}/deleteTweet`, { params: { id } });
  }
}