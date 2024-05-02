import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit  {
  Api_url =" http://localhost:9300"
  userId:string
  getById:boolean=false
  visible:boolean=true
  visibleButton:boolean=false


  constructor(private http :HttpClient,private router :Router){
    this.userId=""
  }

  ngOnInit(): void {
    this.getAllUser()

  }


  response:any=[]

  getAllUser(){
    this.http.get(this.Api_url + '/get/user').subscribe((res:any)=>{
      // console.log("res.................",res)
      this.response = res.data
      // console.log(this.response , "////////////////")
    })
  }


  deleteUser(id:string){
    this.http.delete(this.Api_url + '/delete/user'+`/${id}`).subscribe((res:any)=>{
      console.log("res.................",res)
      this.getAllUser();

    })
  }

  viewUser(id:string){
    this.http.get(this.Api_url +'/get/user'+`/${id}`).subscribe((res:any)=>{
      console.log("res>>>>>>>>>>>>>>>>>>>>>>>>>>.",res)
      this.response =[ res.data]
      console.log(this.response)
      this.getById=true
      this.visible=false
      this.visibleButton=true

      
    })
  
  }
  goBack(){
    // Navigate back to the previous page
   this.router.navigate(['']);
   // Reset flags
    this.getById = false;
    this.visible = true;
    this.visibleButton = false;
  }


  }

