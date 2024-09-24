import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/models/User';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: User | null = null;
  loading: boolean = true;

  constructor(private authService: AuthService) {
    this.authService.request$.subscribe((response) => {
      this.user = response.data;
    });
  }
}
