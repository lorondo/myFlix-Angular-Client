import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// API URL (Ensure it ends with `/`)
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

/**
 * Service for user registration and interaction with movie-related data.
 * Provides methods to perform HTTP requests to the backend API.
 */
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /**
   * Creates an instance of UserRegistrationService.
   * @param http HttpClient instance used for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Generates HTTP headers, including Authorization if a token exists.
   * @returns HttpHeaders The headers including Authorization token if present.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  /**
   * Safely extracts response data from the HTTP response.
   * @param res The HTTP response to extract data from.
   * @returns The extracted data, or an empty object if no data is found.
   */
  private extractResponseData(res: any) {
    return res || {};
  }

  /**
   * Handles HTTP errors and formats the error message accordingly.
   * @param error The error response from the HTTP request.
   * @returns An observable that throws the formatted error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unknown error occurred.';
    
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client-side error: ${error.error.message}`;
    } else {
      errorMsg = error.error.message 
        ? `Server error (${error.status}): ${error.error.message}`
        : `Server error (${error.status}). Please try again later.`;
    }

    console.error(errorMsg);
    return throwError(errorMsg);
  }

  /**
   * Performs an HTTP GET request to the specified endpoint.
   * @param endpoint The API endpoint to send the GET request to.
   * @returns An observable containing the response data from the GET request.
   */
  private get(endpoint: string): Observable<any> {
    return this.http.get(`${apiUrl}${endpoint}`, { headers: this.getAuthHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Performs an HTTP POST request to the specified endpoint with a request body.
   * @param endpoint The API endpoint to send the POST request to.
   * @param body The body of the POST request.
   * @returns An observable containing the response data from the POST request.
   */
  private post(endpoint: string, body: any = {}): Observable<any> {
    return this.http.post(`${apiUrl}${endpoint}`, body, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Performs an HTTP PUT request to the specified endpoint with a request body.
   * @param endpoint The API endpoint to send the PUT request to.
   * @param body The body of the PUT request.
   * @returns An observable containing the response data from the PUT request.
   */
  private put(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${apiUrl}${endpoint}`, body, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * Performs an HTTP DELETE request to the specified endpoint.
   * @param endpoint The API endpoint to send the DELETE request to.
   * @returns An observable containing the response data from the DELETE request.
   */
  private delete(endpoint: string): Observable<any> {
    return this.http.delete(`${apiUrl}${endpoint}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // -------------------- Public API Methods --------------------

  /**
   * Registers a new user by sending the user details to the backend API.
   * @param userDetails The details of the user to register.
   * @returns An observable containing the response data from the user registration API.
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.post('users', userDetails);
  }

  /**
   * Retrieves all movies from the backend API.
   * @returns An observable containing the list of all movies.
   */
  getAllMovies(): Observable<any> {
    return this.get('movies');
  }

  /**
   * Retrieves the details of a specific movie by its title.
   * @param title The title of the movie to retrieve.
   * @returns An observable containing the movie details.
   */
  getOneMovie(title: string): Observable<any> {
    return this.get(`movies/${title}`);
  }

  /**
   * Retrieves movies that belong to a specific genre.
   * @param genre The genre of the movies to retrieve.
   * @returns An observable containing the list of movies matching the genre.
   */
  getMoviesByGenre(genre: string): Observable<any> {
    return this.get(`movies/genre/${genre}`);
  }

  /**
   * Retrieves movies directed by a specific director.
   * @param director The name of the director whose movies to retrieve.
   * @returns An observable containing the list of movies directed by the specified director.
   */
  getMoviesByDirector(director: string): Observable<any> {
    return this.get(`movies/director/${director}`);
  }

  /**
   * Retrieves information about a user by their username.
   * @param username The username of the user to retrieve.
   * @returns An observable containing the user's information.
   */
  getUserInfo(username: string): Observable<any> {
    return this.get(`users/${username}`);
  }

  /**
   * Updates the profile information of a user.
   * @param username The username of the user to update.
   * @param updatedDetails The updated details of the user.
   * @returns An observable containing the updated user information.
   */
  updateUser(username: string, updatedDetails: any): Observable<any> {
    return this.put(`users/${username}`, updatedDetails);
  }

  /**
   * Deletes a user by their username.
   * @param username The username of the user to delete.
   * @returns An observable containing the result of the delete operation.
   */
  deleteUser(username: string): Observable<any> {
    return this.delete(`users/${username}`);
  }

  /**
   * Logs in the user by sending the login credentials (username and password) to the backend API.
   * @param userData The login credentials of the user (username and password).
   * @returns An observable containing the login response (user data and token).
   */
  userLogin(userData: { Username: string, Password: string }): Observable<any> {
    return this.http.post(`${apiUrl}login`, userData, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
}
