import { Component ,OnInit,Injectable} from '@angular/core';
import { FormBuilder, FormGroup, Validators ,AbstractControl} from '@angular/forms';

import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrl: './batch.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class BatchComponent  implements OnInit {

  Api_url = ' http://localhost:9300';
  response: any = {};
  products :any =[]
  batches:any =[]
  errorMessage :string= ""
  httpOptions: any = null; 






  constructor(private http: HttpClient,private router :Router
  ) {

  }

  batchData={
    productName: '',
    mrp: '',
    mfg: '',
    exp: '',
  };


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
    }


    //fetch all product
    this.http.get(this.Api_url + '/get/product',this.httpOptions).subscribe((ans:any)=>{
      console.log('ans>>>>>>>>>>>>>>>>>>>>>>>>', ans)

      this.products = ans.data
    })


      // console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', this.response)

        //fetch all batch list
          this.getBatch()




  }


  getBatch(){
        //fetch all batch list

        this.http.get(this.Api_url + '/get/batch',this.httpOptions).subscribe((res:any)=>{
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', res)
          this.batches = res.data
    
          console.log(this.batches , ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> i am looking for")
    
        })
    
    
  }

  onSubmit(){
// Convert the dates to the desired format (YYYY-MM-DD)
const formattedMfgDate = moment(this.batchData.mfg, 'MM-DD-YYYY').format('YYYY-MM-DD');
const formattedExpDate = moment(this.batchData.exp, 'MM-DD-YYYY').format('YYYY-MM-DD');


console.log(formattedExpDate , "expppppppppppppppppppppppp")
console.log(formattedMfgDate , "mgfffffffffffffffffffffffffffffffff")

// Check if expiration date is earlier than manufacturing date
if (new Date(this.batchData.exp) < new Date(this.batchData.mfg)) {
  this.errorMessage = 'Expiration date must be later than manufacturing date.';


  setTimeout(()=>{
    this.errorMessage = ""

  },2000)
  return; // Stop form submission
}

// Reset error message
this.errorMessage = '';


// Update batchData with formatted dates
this.batchData.mfg = formattedMfgDate;
this.batchData.exp = formattedExpDate;


/////////////
    this.http.post(this.Api_url + '/create/batch',this.batchData,this.httpOptions).subscribe((res:any)=>{
      console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', res)

      this.response = res.Batch

      console.log('res>>>>>>>>>>>>>>>>>>>>>>>>', this.response)
      this.getBatch()

  })



}
}
