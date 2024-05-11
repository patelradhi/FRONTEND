import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { File } from 'buffer';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl:'./product.component.css'
})
export class ProductComponent  implements OnInit {


  Api_url = ' http://localhost:9300';
  products :any ={}
  response : any =[]
  selectedFile : File |null = null;


  product = {
    Name:'',
    Type:'',
    images:null

  }


  constructor(private  http: HttpClient,private router: Router
  ) {
    };

  



  ngOnInit(): void {

    // Initialize the formData property in the ngOnInit lifecycle hook
            //fetch all product
    this.getProducts()

  }


  // onFileSelect(event: any){
  //   this.productData.images = event.target.files[0];
  // }

  // onUpload(){
  //   if(!this.selectedFile){
  //     alert("Error no file selected");
  //     return;
  //   }

    // this.productData.images = this.selectedFile
  // }

   getProducts(){
        //fetch all product
        this.http.get(this.Api_url + '/get/product').subscribe((ans:any)=>{
          console.log('ans>>>>>>>>>>>>>>>>>>>>>>>>', ans)
    
          this.products = ans.data
        })
    

  }



  onSubmit(){
    const formData = new FormData();
    formData.append('Name',this.product.Name)
    formData.append('Type',this.product.Type)

    if (this.product.images) {
      formData.append('image', this.product.images);
    }else{
      console.log("file is not recive")
    }
  

    
    console.log(formData, "Here is the formdata data ???????????????????????????")
    this.http.post(this.Api_url + '/create/product',formData).subscribe((res:any)=>{
      console.log('res recive from backend >>>>>>>>>>>>>>>>>>>>>>>>', res)

      //assing response into product array
      this.products = res.product

      console.log('this.product array>>>>>>>>>>>>>>>>>>>>>>>>', this.products)

      //get all product 
      this.getProducts()

  })



}


onFileSelected(event:any){
  this.product.images = event.target.files[0]
  console.log(this.product.images,"image from user")

}

}
