import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router for redirection

/**
 * Component for the user registration form.
 * Provides a form for users to enter their username, password, email, and birthday.
 */
@Component({
  selector: 'app-user-registration-form', // The selector for the component, used to place it in the DOM
  templateUrl: './user-registration-form.component.html', // The HTML template associated with the component
  styleUrls: ['./user-registration-form.component.scss'], // The styles specific to this component
  standalone: false,
})

export class UserRegistrationFormComponent implements OnInit {
  /**
   * The data object for the user registration form.
   * Bound to the form inputs for capturing user data.
   * @input
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData The service for handling API interactions related to user registration.
   * @param dialogRef The reference to the dialog to close it after successful registration.
   * @param snackBar The snack bar used to show messages to the user.
   * @param router The router used for navigation after registration.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router // Inject Router for navigation
  ) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * It is currently empty, but can be used to add initialization logic.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by calling the userRegistration method from fetchApiData service.
   * On successful registration:
   *  - Closes the registration modal
   *  - Shows a success message
   *  - Redirects to the login page
   * If registration fails, it shows an error message.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result: any) => {
        this.dialogRef.close(); // Close the registration dialog

        // Show success message
        this.snackBar.open('Registration successful! Please log in.', 'OK', {
          duration: 2000
        });

        // Redirect to the login page
        this.router.navigate(['welcome']);
      },
      (error: any) => {
        // Show an error message from the API response (if available)
        const errorMessage = error.error.message || 'Registration failed. Please try again.';
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000
        });

        console.error('Error during registration:', error); // Log for debugging
      }
    );
  }
}
