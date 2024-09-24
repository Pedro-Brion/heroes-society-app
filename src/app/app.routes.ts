import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HeroesComponent } from './features/heroes/heroes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'heroes', component: HeroesComponent },
];
