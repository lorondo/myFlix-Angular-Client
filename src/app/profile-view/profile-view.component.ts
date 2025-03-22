import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { UserRegistrationService } from '../fetch-api-data.service';

/**
 * ProfileViewComponent represents the profile page of the user.
 * This component is responsible for displaying the user’s profile information.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {
  user: any; // Holds the user data

  constructor(private fetchApiData: UserRegistrationService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  /**
   * Fetches the user profile data and assigns it to `user`.
   */
  getUserProfile(): void {
    const username = 'exampleUser'; // Replace with actual logic to fetch the logged-in user's username
    this.fetchApiData.getUserInfo(username).subscribe(
      (response) => {
        this.user = response; // Assign the fetched user data to `user`
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
