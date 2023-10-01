import { Component } from '@angular/core';
import { LoadingAnimationService } from './shared/services/loading-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public readonly loadingAnimationService: LoadingAnimationService) {}
}
