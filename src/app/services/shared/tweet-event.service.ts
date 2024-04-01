import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetEventService {
  private tweetPostedSubject = new Subject<void>();

  tweetPosted$ = this.tweetPostedSubject.asObservable();

  triggerTweetPosted() {
    this.tweetPostedSubject.next();
  }
}
