import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { StudentTableComponent, NgbdSortableHeader } from './student-table/student-table.component';
import { NgxElectronModule } from 'ngx-electron';
import { InitComponent } from './init/init.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterTablePipe } from './pipes/filter-table.pipe';
import { StudentComponent } from './student/student.component';
import { TabsComponent } from './tabs/tabs.component';
import { ArchiveComponent } from './archive/archive.component';
import { FeesComponent } from './fees/fees.component';
import { SuspensionsComponent } from './suspensions/suspensions.component';
import { DatePipe } from './pipes/date.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AnnualFeesComponent } from './annual-fees/annual-fees.component';
import { SearchPipe } from './pipes/search.pipe';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    StudentTableComponent,
    InitComponent,
    NgbdSortableHeader,
    FilterTablePipe,
    StudentComponent,
    TabsComponent,
    ArchiveComponent,
    FeesComponent,
    SuspensionsComponent,
    DatePipe,
    AnnualFeesComponent,
    SearchPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxElectronModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
