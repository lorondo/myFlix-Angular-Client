import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../user-login/user-login.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * WelcomePageComponent is the component displayed as the welcome page of the app.
 * It contains the functionality for opening modals for user registration and login.
 */
@Component({
  selector: 'app-welcome-page', // The selector for the component, used to place it in the DOM
  templateUrl: './welcome-page.component.html', // The HTML template associated with the component
  styleUrls: ['./welcome-page.component.scss'] // The styles specific to this component
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of the WelcomePageComponent.
   * @param dialog The MatDialog service used for opening modals.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * It is currently empty, but you can add initialization logic here.
   */
  ngOnInit(): void { }

  /**
   * Opens the user registration form dialog.
   * The dialog is set with a specific width for the UI presentation.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   * The dialog is set with a specific width for the UI presentation.
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '280px'
    });
  }
}
