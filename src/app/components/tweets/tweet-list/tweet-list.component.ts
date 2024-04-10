import { Component, OnInit } from '@angular/core';
import { TweetsService } from 'src/app/services/tweets/tweets.service';
import { ITweet } from 'src/app/model/tweets';
import { IUser } from 'src/app/model/user'; 
import { RefreshService } from 'src/app/services/shared/tweet-event.service';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/model/user-profile';


@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  tweets: ITweet[] = [];
  usersMap: { [username: string]: IUser } = {}; // Explicitly typed usersMap
  refreshSubscription: Subscription | undefined;
  userProfile: UserProfile = { 
    username: '',
    fullname: '',
    profile_image: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
    registration_date: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  constructor(
    private refreshService: RefreshService,
    private tweetsService: TweetsService, 
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.refreshSubscription = this.refreshService.getRefreshObservable().subscribe(() => {
      this.loadData();
      console.log('Refreshed');
    });
  }

  loadData() {
    this.tweetsService.getTweets().subscribe(
      (tweets: ITweet[]) => {
        this.tweets = tweets;
        this.loadUsers(); // Fetch users after tweets are loaded
      },
      (error) => {
        console.error('Error fetching tweets:', error);
      }
    );
  }

  loadUsers() {
    this.tweetsService.getUsers().subscribe(
      (users: IUser[]) => {
        // Map users by username for quick access
        this.usersMap = users.reduce((acc, user) => {
          acc[user.username] = user;
          return acc;
        }, {} as { [username: string]: IUser }); // Explicitly typed accumulator
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteTweet(tweetId: number) {
    this.tweetsService.deleteTweet(tweetId).subscribe(
      () => {
        // Remove the deleted tweet from the local list of tweets
        this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId);
        console.log('Tweet deleted successfully');
        this.loadData();
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting tweet:', error);
        this.loadData();
        this.ngOnInit();
      },
    
    );
  }
   
  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }
}