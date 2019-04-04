import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyMindComponent } from './body-mind/body-mind.component';
import { FoodComponent } from './food/food.component';
import { SchoolBooksComponent } from './school-books/school-books.component';

const routes: Routes = [
  { path: 'food', component: FoodComponent, pathMatch: 'full' },
  { path: 'body-mind', component: BodyMindComponent, pathMatch: 'full' },
  { path: 'school-books', component: SchoolBooksComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
