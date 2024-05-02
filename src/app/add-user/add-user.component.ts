import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  Api_url = ' http://localhost:9300';
  userId: string;
  response: any = [];


  // Declare formData property


  showSuccessMessage: boolean = false;
  // transactionType: Boolean = true;


  
  
  formData={
    Name: '',
    Email: '',
    Password: '',
    Contact: '',
    Address: '',
  };

  // userData = new FormGroup({
  //   Name:new FormControl("",[Validators.required]),
  //   Email: new FormControl("",[Validators.required,Validators.email]),
  //   Password:new FormControl("",[Validators.required]),
  //   Contact: new FormControl("",[Validators.required]),
  //   Address: new FormControl("",[Validators.required]),

  // })

  constructor(private http: HttpClient, private route: ActivatedRoute
  ) {
    this.userId = ''

  }


  ngOnInit(): void {
    // Get user ID from route parameters
    this.route.params.subscribe((params) => {
      if(params['id']){
        // this.transactionType = false;
      }
      this.userId = params['id'];
      console.log(params)
      if (this.userId) {
        // Fetch user data for update operation
        this.http
          .get(this.Api_url + '/get/user' + `/${this.userId}`)
          .subscribe((res: any) => {
            // console.log('res///////////////////////////////', res);
            this.formData = res.data; // Store fetched user data

          });
      }
    });
  }

  onSubmit() {
    if (this.userId) {

      this.http.put(this.Api_url + '/update/user',this.formData).subscribe((res:any)=>{
        console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', res)
        this.response = res.data
                 // Set update success message flag to true


      })
    } else {
      this.http
        .post(this.Api_url + '/create/user', this.formData)
        .subscribe((res: any) => {
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', res);
          this.response = res.data;

        });
    }
  }

  createUser(){
    // After successfully creating user, show success message
    this.showSuccessMessage =true
    // Automatically hide the success message after a few seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }

  // get Name (){
  //   return this.userData.get("Name")
  // }


  }


