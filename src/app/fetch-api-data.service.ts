import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// API URL (Ensure it ends with `/`)
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  /**
   * Generates HTTP headers, including Authorization if a token exists.
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
   * Extracts response data safely.
   */
  private extractResponseData(res: any) {
    return res || {};
  }

  /**
   * Handles HTTP errors with error messages.
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
   * HTTP GET helper method.
   */
  private get(endpoint: string): Observable<any> {
    return this.http.get(`${apiUrl}${endpoint}`, { headers: this.getAuthHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * HTTP POST helper method.
   */
  private post(endpoint: string, body: any = {}): Observable<any> {
    return this.http.post(`${apiUrl}${endpoint}`, body, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * HTTP PUT helper method.
   */
  private put(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${apiUrl}${endpoint}`, body, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  /**
   * HTTP DELETE helper method.
   */
  private delete(endpoint: string): Observable<any> {
    return this.http.delete(`${apiUrl}${endpoint}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // -------------------- Public API Methods --------------------

  /** Registers a new user */
  userRegistration(userDetails: any): Observable<any> {
    return this.post('users', userDetails);
  }

  /** Retrieves all movies */
  getAllMovies(): Observable<any> {
    return this.get('movies');
  }

  /** Retrieves details for one movie */
  getOneMovie(title: string): Observable<any> {
    return this.get(`movies/${title}`);
  }

  /** Retrieves movies based on genre */
  getMoviesByGenre(genre: string): Observable<any> {
    return this.get(`movies/genre/${genre}`);
  }

  /** Retrieves movies based on director */
  getMoviesByDirector(director: string): Observable<any> {
    return this.get(`movies/director/${director}`);
  }

  /** Retrieves user information */
  getUserInfo(username: string): Observable<any> {
    return this.get(`users/${username}`);
  }

  /** Updates user profile information */
  updateUser(username: string, updatedDetails: any): Observable<any> {
    return this.put(`users/${username}`, updatedDetails);
  }

  /** Deletes a user */
  deleteUser(username: string): Observable<any> {
    return this.delete(`users/${username}`);
  }
}
