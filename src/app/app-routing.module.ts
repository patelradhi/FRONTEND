import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { BatchComponent } from './batch/batch.component';
import { AuthGuard } from '../auth/auth.guard';

// import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent ,canActivate:[AuthGuard]},
  { path: 'update-user/:id', component:AddUserComponent,canActivate:[AuthGuard]},

  { path: 'home',
   component:HomeComponent,
   canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  }

//   { path: 'home/product', 
//   component: ProductComponent,
//   // canActivate: [AuthGuard]

//   // canActivate: [AuthGuard]
//  },
//   { path: 'home/batch',
//    component: BatchComponent ,
//   // canActivate: [AuthGuard]

//   },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
