import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { BodyMindComponent } from './body-mind/body-mind.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent, pathMatch: 'full' },
  { path: 'body-mind', component: BodyMindComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
