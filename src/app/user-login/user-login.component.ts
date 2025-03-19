import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API service for login
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,  // FIX: Inject the API service
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Function to log in the user using UserRegistrationService
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);

        // Close the login dialog
        this.dialogRef.close();

        // Show a success message
        this.snackBar.open(`Login Successful, Welcome ${result.user.Username}!`, 'OK', {
          duration: 2000
        });

        // Redirect to movies page
        this.router.navigate(['movies']);
      },
      (error) => {
        this.snackBar.open(
          `Login failed: ${error.error.message || 'Please try again.'}`, 
          'OK', 
          { duration: 2000 }
        );

        console.error('Login error:', error); // Log error for debugging
      }
    );
  }
}
