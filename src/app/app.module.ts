
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BatchComponent } from './batch/batch.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from '../auth/auth.guard';

// import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserListComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    BatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideAnimationsAsync() ,
    [AuthGuard]
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//update user
//1. make route for chaange page into module.routing file
//2. import activate-route and add into constructor into add-user.component.ts file
//3. take user id from params
//4. apply condition that if user id exist then run the api for get data by id and put into ouu empty object(ngonit)
//5. then again apply condition whene we allready create function for form submission ,then if got id then we run update quary otherwise run create quary
//6. also make change into html file where we write submit button then if we got user id then give update name to the button
//7. update button (app-component.html) (click)="onclick(user.id)"
