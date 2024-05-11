import { Component,OnInit,Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class UserListComponent implements OnInit  {
  Api_url =" http://localhost:9300"
  userId:string
  getById:boolean=false
  visible:boolean=true
  visibleButton:boolean=false
  httpOptions: any = null; 

  constructor(private http :HttpClient,private router :Router,private authService: AuthService ){
    this.userId=""
  }

  ngOnInit(): void {

    if (typeof localStorage !== 'undefined') {
      let accessToken = localStorage.getItem('access-token');

      if (accessToken) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'x-access-token': accessToken
            })
        };
    } else {
        this.httpOptions = {
            headers: new HttpHeaders()
        };
    }
      // setTimeout(() => {
      //   this.getAllUser();
      // }, 2000);
      this.getAllUser()
    }

    
    // this.getAllUser()

  }


  response:any=[]

  getAllUser(){

    this.http.get(this.Api_url + '/get/user',this.httpOptions).subscribe((res:any)=>{

      console.log("res.................",res)
      this.response = res.data
      console.log(this.response , "////////////////")
    })
  }


  deleteUser(id:string){
    this.http.delete(this.Api_url + '/delete/user'+`/${id}`,this.httpOptions).subscribe((res:any)=>{
      console.log("res.................",res)
      this.getAllUser();

    })
  }

  viewUser(id:string){
    this.http.get(this.Api_url +'/get/user'+`/${id}`,this.httpOptions).subscribe((res:any)=>{
      console.log("res>>>>>>>>>>>>>>>>>>>>>>>>>>.",res)
      this.response =[ res.data]
      console.log(this.response , "============================")
      this.getById=true
      this.visible=false
      this.visibleButton=true

      
    })
  
  }

  goBack(){
    // Navigate back to the previous page
   this.router.navigate(['admin']);
   this.getAllUser()
   // Reset flags
    this.getById = false;
    this.visible = true;
    this.visibleButton = false;
  }

onClick(){
  this.authService.logout(); // Call the logout method of AuthService
  this.router.navigate(['']);
}

  }

