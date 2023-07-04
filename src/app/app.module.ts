import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const routes: Routes = [
  { path: 'employee-management', component: EmployeeManagementComponent },
  { path: '', redirectTo: '/employee-management', pathMatch: 'full' },
  { path: '**', component: EmployeeManagementComponent },  // Wildcard route for a 404 page
];

const dbConfig: DBConfig = {
  name: 'RTI',
  version: 1,
  objectStoresMeta: [{
    store: 'employeeDetails',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: true } },
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'role', keypath: 'role', options: { unique: false } },
      { name: 'fromDate', keypath: 'fromDate', options: { unique: false } },
      { name: 'toDate', keypath: 'toDate', options: { unique: false } }
    ]
  }]
};
@NgModule({
  declarations: [
    AppComponent,
    EmployeeManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-left',
        preventDuplicates: true,
      }
    ),
    RouterModule.forRoot(routes),
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDividerModule,
    MatDialogModule,
    NgbModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
