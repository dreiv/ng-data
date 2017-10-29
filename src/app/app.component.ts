import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-users-table></app-users-table>
    <app-user-chart></app-user-chart>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
