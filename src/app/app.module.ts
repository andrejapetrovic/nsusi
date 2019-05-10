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
import { ReversePipe } from './pipes/reverse.pipe';
import { TabsComponent } from './tabs/tabs.component';
import { ArchiveComponent } from './archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    StudentTableComponent,
    InitComponent,
    NgbdSortableHeader,
    FilterTablePipe,
    ReversePipe,
    TabsComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxElectronModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
