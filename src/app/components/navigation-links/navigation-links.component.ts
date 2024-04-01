import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/model/user-profile'; 

@Component({
  selector: 'app-navigation-links',
  templateUrl: './navigation-links.component.html',
  styleUrls: ['./navigation-links.component.scss']
})
export class NavigationLinksComponent implements OnInit {

  userProfile: UserProfile | undefined;
  selectedFile: File | undefined; 

  ngOnInit(): void { 
  }

 

}
