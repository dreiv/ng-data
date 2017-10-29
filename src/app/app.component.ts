import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-users></app-users>
    <app-user-chart></app-user-chart>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
