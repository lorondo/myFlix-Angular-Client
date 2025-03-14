import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result: any) => {
        // Logic for a successful user registration goes here
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000
        });
      },
      (error: any) => {
        this.snackBar.open('Registration failed. Please try again.', 'OK', {
          duration: 2000
        });
        console.error('Error during registration:', error); // Log error for debugging
      }
    );
  }
}
