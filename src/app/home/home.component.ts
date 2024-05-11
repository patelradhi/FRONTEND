import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




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
  ) {

  }

  ngOnInit(): void {
  //   if (!this.authService.isAuthenticated()) {
  //     // If not authenticated, redirect to login page
  //     this.router.navigate(['/login']);
  //   }
    }

  toogelLogout(){
    this.router.navigate(['']);
    console.log("///////////////////////////////////////////////////")
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
