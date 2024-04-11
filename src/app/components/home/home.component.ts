import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core'; 
import { ITweet } from 'src/app/model/tweets';
import { UserProfile } from 'src/app/model/user-profile';
import { TweetsService } from 'src/app/services/tweets/tweets.service'  
import { RefreshService } from 'src/app/services/shared/tweet-event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  options = 'for you';
  tweetText: string = ''; // Property to bind to the input field

  userProfile: UserProfile = { 
    username: 'John Doe',
    fullname: 'John Doe',
    profile_image: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg',
    registration_date: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private tweetService: TweetsService, // Inject your tweet service
    private refreshService: RefreshService
  ) {  }
  ngOnInit(): void {
    
  }

  enableEditing() {
    // Implement any logic needed when the input field is focused 
    this.renderer.removeAttribute(this.elementRef.nativeElement.querySelector('input'), 'readonly');
  }


  submitTweet() {
    var tweet: ITweet
    if (this.tweetText.trim() !== '') {
        tweet = {
        id: 0,
        authorId: this.userProfile.username,
        body: this.tweetText,
        likes: 0,
        imageUrl: '',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }; 
      this.tweetService.postTweets(tweet).subscribe(
        (response) => {
          console.log('Tweet posted successfully:', response); 
          this.refreshService.refreshComponent(); // Trigger the event
        },
        (error) => {
          console.error('Error posting tweet:', error);
        }
      );
    } else {
      console.warn('Tweet text is empty. Please enter something to tweet.');
    }
    this.tweetText = '';
}

 
  toggleoptions(value: string) {
    this.options = value;
  }

  @HostListener('window:scroll')
  onWindowScroll(){
    const nav = this.elementRef.nativeElement.querySelector('.nav')
    if (window.pageYOffset > nav.offsetTop) {
      this.renderer.addClass(nav, 'fixed-top');
    } else {
      this.renderer.removeClass(nav, 'fixed-top');
    }
  }
}
