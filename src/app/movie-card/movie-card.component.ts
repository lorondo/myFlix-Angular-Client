// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: false,
})
export class MovieCardComponent implements OnInit {  // ✅ Implements OnInit properly
  movies: any[] = [];

  constructor(private fetchApiData: UserRegistrationService) {}  // ✅ Marked as private (best practice)

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log('Movies fetched:', this.movies);
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
}
