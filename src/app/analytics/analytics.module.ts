import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from './analytics.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
})
export class AnalyticsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AnalyticsModule,
      providers: [AnalyticsService]
    };
  }
}
