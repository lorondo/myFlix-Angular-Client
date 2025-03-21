import { Component } from '@angular/core';

/**
 * The root component of the Angular application.
 * It serves as the entry point for the app and contains the main structure.
 */
@Component({
  selector: 'app-root', // The CSS selector used to place this component in the DOM
  templateUrl: './app.component.html', // The HTML template for the component
  styleUrls: ['./app.component.scss'] // The styles specific to this component
})
export class AppComponent {
  /**
   * The title of the application, displayed in the template.
   * This value is used in the HTML to show the title of the app.
   */
  title = 'myFlix-Angular-client';
}
