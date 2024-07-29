import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCardComponent } from './component/user-card/user-card.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { CreateEditUserComponent } from './create-edit-user/create-edit-user.component';

import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {ReactiveFormsModule} from '@angular/forms';




@NgModule({	
  declarations: [
    AppComponent,
	UsersListComponent,
	UserCardComponent,
	CreateEditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	MatDialogModule,
	MatButtonModule,
	MatIconModule,
	ReactiveFormsModule,
	MatCardModule,
	MatInputModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
	
 }
