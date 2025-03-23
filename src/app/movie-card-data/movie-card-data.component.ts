import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card-data',
  templateUrl: './movie-card-data.component.html',
  styleUrls: ['./movie-card-data.component.scss'],
  standalone: false
})
export class MovieCardDataComponent {
  constructor(
    public dialogRef: MatDialogRef<MovieCardDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}