import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';   
import { Observable } from 'rxjs';
import { ITweet } from 'src/app/model/tweets';
import { IUser } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})

export class TweetsService { 
  urlGet = 'https://twitterapiv.azurewebsites.net/api/Tweet/Tweets';
  constructor(private http: HttpClient) { }

  getTweets(): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(`${this.urlGet}`);
  }

  urlPost = 'https://twitterapiv.azurewebsites.net/api/Tweet/postTweet';
  postTweets(tweet: ITweet): Observable<ITweet> {
    return this.http.post<ITweet>(this.urlPost, tweet);
  }

  urlGetUser= 'https://twitterapiv.azurewebsites.net/api/Tweet/Users';
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.urlGetUser}`);
  }

  urlGetUserByUsername= 'https://twitterapiv.azurewebsites.net/api/Tweet/UsersByName';
  getUserByUsername(username: string): Observable<IUser> {
    const params = { username }; // Constructing the query parameters
    return this.http.get<IUser>(this.urlGetUserByUsername, { params });
  }

  urldDeleteTweet= 'https://twitterapiv.azurewebsites.net/api/Tweet/deleteTweet';
  deleteTweet(tweetId: number): Observable<any> {  
    return this.http.delete(`${this.urldDeleteTweet}/${tweetId}`);  
  }

  urlLikeTweet= 'https://twitterapiv.azurewebsites.net/api/Tweet/likeTweet';
  likeTweet(tweetId: number): Observable<any> {  
    return this.http.post(`${this.urlLikeTweet}/${tweetId}`, tweetId);  
  } 
   
  
}
 
 