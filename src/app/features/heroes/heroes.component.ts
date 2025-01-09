import { Component } from '@angular/core';
import { Hero } from '~/app/core/models/Hero';
import { HeroesService } from '~/app/core/services/heroes/heroes.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {
  heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.heroesService
      .loadAll()
      .subscribe((res) => (this.heroes = res as Hero[]));
  }
}
