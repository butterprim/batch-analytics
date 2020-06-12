import { Component, AfterViewInit } from '@angular/core';
import { AnalyticsService } from './analytics/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  constructor(private analytics: AnalyticsService) {}

  ngAfterViewInit() {
  }

  handleClick() {
    this.analytics.track('service-worker-registered');
  }
}
