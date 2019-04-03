import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { RunningMeditationComponent } from './running-meditation/running-meditation.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent, pathMatch: 'full' },
  { path: 'running-meditation', component: RunningMeditationComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
