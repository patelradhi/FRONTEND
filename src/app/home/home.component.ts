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

  constructor(private http: HttpClient,private router :Router
  ) {

  }

  ngOnInit(): void {

  }


  onClick(){
    this.router.navigate(['']);
  }
}
