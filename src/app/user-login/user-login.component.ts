import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserLoginService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit  {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public router: Router,
    public snackBar: MatSnackBar) { }
  ngOnInit(): void {
   
  }

  /**
   * Function to login user using FetchApiDataService
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     localStorage.setItem("user", JSON.stringify(result.user));
     localStorage.setItem("token", result.token);
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open(`Login Successful, Hello ${result.user.Username}`, 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);

    }, (error) => {
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