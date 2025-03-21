import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API service for login
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

/**
 * The LoginComponent handles user login functionality.
 * It allows users to log in using their credentials and navigates them to the movies page upon successful login.
 */
@Component({
  selector: 'app-user-login', // The selector for this component, used to place it in the DOM
  templateUrl: './user-login.component.html', // The HTML template for this component
  styleUrls: ['./user-login.component.scss'] // The styles specific to this component
})
export class LoginComponent implements OnInit {
  
  /**
   * The user data that is bound to the login form inputs (username and password).
   * This object holds the credentials entered by the user.
   * @input
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of LoginComponent.
   * @param fetchApiData The service for interacting with the backend API.
   * @param dialogRef The reference to the login dialog that can be closed after successful login.
   * @param router The router used for navigating to the movies page after login.
   * @param snackBar The snack bar used to show messages to the user.
   */
  constructor(
    public fetchApiData: UserRegistrationService,  // FIX: Inject the API service
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called when Angular initializes the component.
   * Currently, it does not contain any logic.
   */
  ngOnInit(): void {}

  /**
   * Logs in the user by calling the userLogin method from the UserRegistrationService.
   * On successful login:
   *  - Stores the user data and token in localStorage
   *  - Closes the login dialog
   *  - Displays a success message in a snack bar
   *  - Redirects the user to the movies page
   * If the login fails, an error message is displayed in the snack bar.
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
