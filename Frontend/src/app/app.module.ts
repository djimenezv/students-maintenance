import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Client } from './api/student';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { API_BASE_URL } from './api/student';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './effects/student';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GridContainerComponent } from './components/grid-container/grid-container.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { EditCreateStudentComponent } from './components/edit-create-student/edit-create-student.component';

@NgModule({
  declarations: [
    AppComponent,
    GridContainerComponent,
    ConfirmationComponent,
    EditCreateStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([StudentEffects]),
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Client,
    {
      provide: API_BASE_URL,
      useValue: environment.base_url_api
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
