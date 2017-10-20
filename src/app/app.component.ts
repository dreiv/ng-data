import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-users></app-users>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
