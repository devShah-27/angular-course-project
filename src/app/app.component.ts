import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentFeature: string= 'recipe';

  title = 'angular-course-project';

  onFeatureSelected(feature: string) {
    this.currentFeature = feature;
  }
}
