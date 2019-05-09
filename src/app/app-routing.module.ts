import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { InitComponent } from './init/init.component';

const routes: Routes = [
  {path: '', redirectTo: '/init', pathMatch: 'full' },
  {path: 'students', component: StudentTableComponent},
  {path: 'init', component: InitComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
