import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TweetModalComponent } from './tweet-modal.component';
 

describe('TweetModalComponent', () => {
  let component: TweetModalComponent;
  let fixture: ComponentFixture<TweetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});