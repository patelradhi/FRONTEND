import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showProduct :boolean =false
  showBatch : boolean = false

  constructor(private http: HttpClient,
    private router :Router,
    private authService :AuthService
  ) {

  }

  ngOnInit(): void {
  //   if (!this.authService.isAuthenticated()) {
  //     // If not authenticated, redirect to login page
  //     this.router.navigate(['/login']);
  //   }
    }

  toogelLogout(){
    this.authService.logout(); // Call the logout method of AuthService
    this.router.navigate(['']);
  }
    


  toogelProduct(){
    this.showProduct = true;
    this.showBatch = false;
  }

  toogelBatch(){
    this.showBatch= true;
    this.showProduct=false;
  }
}
