// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

/**
 * MovieCardComponent displays a list of movies in card format.
 * It fetches movie data from the UserRegistrationService and displays it to the user.
 */
@Component({
  selector: 'app-movie-card', // The selector for this component, used to place it in the DOM
  templateUrl: './movie-card.component.html', // The HTML template for this component
  styleUrls: ['./movie-card.component.scss'] // The styles specific to this component
})
export class MovieCardComponent implements OnInit {  // ✅ Implements OnInit properly
  /**
   * The array that holds the movie data fetched from the API.
   * @type {any[]}
   */
  movies: any[] = [];

  /**
   * Creates an instance of MovieCardComponent.
   * @param fetchApiData The service for fetching movie data.
   */
  constructor(private fetchApiData: UserRegistrationService) {}  // ✅ Marked as private (best practice)

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It calls the getMovies method to fetch the movie data when the component is first loaded.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches a list of movies using the UserRegistrationService.
   * The movie data is assigned to the `movies` property.
   * In case of a successful response, the movie data is logged to the console.
   * In case of an error, an error message is logged to the console.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp; // Assign fetched movies to the component's movies property
        console.log('Movies fetched:', this.movies);
      },
      (error) => {
        console.error('Error fetching movies:', error); // Log any errors that occur
      }
    );
  }
}
