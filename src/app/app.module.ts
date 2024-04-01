import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { TweetListComponent } from './components/tweets/tweet-list/tweet-list.component'; 
import {HttpClientModule} from '@angular/common/http';
import { NavigationLinksComponent } from './components/navigation-links/navigation-links.component'; 
import { TrendsComponent } from './components/trends/trends.component';
import { RegistrationComponent } from './components/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent, 
    NavigationComponent,
    HomeComponent,  
    TweetListComponent, 
    NavigationLinksComponent,
    TrendsComponent,
    RegistrationComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
