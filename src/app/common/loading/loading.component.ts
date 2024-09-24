import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  @Input() loading: boolean = true;
}
