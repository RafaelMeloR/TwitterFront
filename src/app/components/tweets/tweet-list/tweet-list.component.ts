import { Component, OnInit } from '@angular/core';
import { TweetsService } from 'src/app/services/tweets/tweets.service';
import { ITweet } from 'src/app/model/tweets';
import { IUser } from 'src/app/model/user';
import { TweetEventService } from 'src/app/services/shared/tweet-event.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  tweets: ITweet[] = [];
  usersMap: { [username: string]: IUser } = {}; // Explicitly typed usersMap

  constructor(
    private tweetsService: TweetsService,
    private tweetEventService: TweetEventService // Inject the TweetEventService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.subscribeToTweetPosted();
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
   
  private subscribeToTweetPosted() {
    this.tweetEventService.tweetPosted$.subscribe(() => {
      this.loadData(); // Refresh the list of tweets
      this.ngOnInit();
    });
  }
}