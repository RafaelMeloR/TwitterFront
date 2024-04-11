import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { ITweet } from 'src/app/model/tweets';
import { RefreshService } from 'src/app/services/shared/tweet-event.service';
import { TweetsService } from 'src/app/services/tweets/tweets.service';

@Component({
  selector: 'tweet-modal',
  templateUrl: './tweet-modal.component.html',
  styleUrls: ['./tweet-modal.component.scss']
})

export class TweetModalComponent {
  form: any;
  error_msg!: string; 
  tweetsService: any;
  tweets: any;

  constructor(
    private refreshService: RefreshService,
    private tweetService: TweetsService,
    public dialogRef: MatDialogRef<TweetModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { tweet: ITweet, usersMap: any } ){
    this.form = new FormGroup({
      tweetField: new FormControl(data.tweet.body, [Validators.required]), 
    });
  } 
  // AN HANDLER METHOD THAT CLOSES THE DIALOG ON CLICK
  onNoClick(): void {
    this.dialogRef.close();
  } 

  UpdateTweet() { 
      var tweetUpdated: ITweet
      if (this.form.tweetField !== '') {
        tweetUpdated = {
          id: this.data.tweet.id,
          authorId: this.data.tweet.authorId,
          body: this.form.get('tweetField').value,
          likes: this.data.tweet.likes,
          imageUrl: this.data.tweet.imageUrl,
          status: this.data.tweet.status,
          createdAt: this.data.tweet.createdAt,
          updatedAt: new Date()
        };
   
        this.tweetService.updateTweet(tweetUpdated).subscribe(
          (response) => {
            console.log('Tweet updating successfully:', response); 
            this.refreshService.refreshComponent(); // Trigger the event
          },
          (error) => {
            console.error('Error updating tweet:', error);
          }
        );
      } else {
        console.warn('Tweet text is empty. Please enter something to tweet.');
      }
      this.dialogRef.close();
  }	
}
  
