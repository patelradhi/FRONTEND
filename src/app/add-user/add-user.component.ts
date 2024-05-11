import { Component, OnInit ,Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from "@angular/forms";



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})


@Injectable({
  providedIn: 'root'
})


export class AddUserComponent implements OnInit {
  Api_url = ' http://localhost:9300';
  userId: string;
  response: any = [];
  httpOptions: any = null; 

  userForm: FormGroup = this.formBuilder.group({
    Name: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required,this.passwordValidator],
    Contact: ['', Validators.required],
    Address: ['', Validators.required]
  });

  //added
  // userForm !: FormGroup; // Define FormGroup



  // Declare formData property


  showSuccessMessage: boolean = false;
  // transactionType: Boolean = true;


  
  
  // formData={
  //   Name: '',
  //   Email: '',
  //   Password: '',
  //   Contact: '',
  //   Address: '',
  // };


  constructor(private http: HttpClient, private route: ActivatedRoute,private formBuilder: FormBuilder
  ) {


    this.userId = ''

  }


  ngOnInit(): void {

    //addde

    //added




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
    }


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
          .get(this.Api_url + '/get/user' + `/${this.userId}`,this.httpOptions)
          .subscribe((res: any) => {

            if(res !== null){
              // this.userForm = res.data; // Store fetched user data
              this.userForm.patchValue({Name: res.data.Name});
              this.userForm.patchValue({Email: res.data.Email});
              this.userForm.patchValue({Contact: res.data.Contact});
              this.userForm.patchValue({Address: res.data.Address});
              // console.log(">>>>>>>>>>>>>>:;;;;;;;;;;;;;;",this.userForm)
              // if(res.headers){
    
              // }else{
              //   console.error('Response headers are missing here:', res);
              // }

            }else{
              console.error('Null response received.');
            }
            // console.log('res///////////////////////////////', res);

          });
      }
    });
  }

  onSubmit() {

    //added

    if (this.userForm.valid) {
      // Proceed with form submission
      const formData = this.userForm.value;

      //added

    if (this.userId) {

      // this.http.put(this.Api_url + '/update/user',this.formData,this.httpOptions).subscribe((res:any)=>{
        this.http.put(this.Api_url + '/update/user',formData,this.httpOptions).subscribe((res:any)=>{

        console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', res)
        this.response = res.data
        
                 // Set update success message flag to true


      })
    } else {
      this.http
        // .post(this.Api_url + '/create/user', this.formData,this.httpOptions)
        .post(this.Api_url + '/create/user', formData,this.httpOptions)

        .subscribe((res: any) => {
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', res);
          this.response = res.data;

        });
    }
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


  passwordValidator(control: AbstractControl) {
    const value = control.value;
    const hasCharacter = /[a-zA-Z]/.test(value); // Check if it has characters
    const hasDigit = /[0-9]/.test(value); // Check if it has digits
    const isValidLength = value.length <= 10; // Check if it's no longer than 10 characters

    if (!hasCharacter || !hasDigit || !isValidLength) {
      return { invalidPassword: true };
    }

    return null;
  }


  }


