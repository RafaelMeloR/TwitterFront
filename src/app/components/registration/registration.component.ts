import { Component } from '@angular/core';
import { IUser } from 'src/app/model/user';
import { RegistrationService } from 'src/app/services/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  user: IUser = {
    username: '',
    name: '',
    email: '',
    phoneNo: '',
    password: '',  
    profileImage: '',
    gender: '',
    status: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(private registrationService: RegistrationService) { }

  registerUser() {
    this.registrationService.registerUser(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // Handle success, e.g., show success message, redirect to login page, etc.
      },
      (error) => {
        console.error('Error registering user:', error);
        // Handle error, e.g., show error message to the user
      }
    );
  }
}