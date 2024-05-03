import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Api_url = ' http://localhost:9300';
  response: any ;
  success:boolean=false




  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router  ) { 
    this.loginForm = this.fb. group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required ,this.passwordValidator] ]
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
          // Perform login logic here

    if (this.loginForm.valid) {
      console.log(this.loginForm.value ,"?/////////////////////////////");
      let queryParams = `&email=${this.loginForm.value.email}&password=${this.loginForm.value.password}`

      this.http.get(this.Api_url +"/login?" + queryParams).subscribe((res:any)=>{
        console.log(res,"/////////////////////////////")
        this.response=res.data.existUser;
        console.log(this.response,"response>>>>>>>>>>>>>>>>>>>>>>>>>.")

        this.success=true

        if(this.success==true && this.response.Role==1){
          this.router.navigate(['admin']);
  
        }else if (this.success==true && this.response.Role==0){
          this.router.navigate(['home']);



        }
          
        
  
      })


    
    } else {
      // Handle invalid form
      console.log('Form is invalid');
    }

  }
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
