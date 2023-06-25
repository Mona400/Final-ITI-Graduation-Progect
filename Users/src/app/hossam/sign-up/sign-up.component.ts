import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SignUpService } from './service/sign-up.service';
import Swal from 'sweetalert2';
import { LoginService } from '../service/login.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CartService } from 'src/app/Alyaa/services/cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  implements  OnInit {
  get passwordInput() { return this.myRegisterationForm.get('password'); }
  hide = true;

  constructor(private cartService:CartService , private myservice:SignUpService , private loginService:LoginService , public sh:SharedService){}







  // userData:{firstName:string,lastName:string,userName:string ,
  //   Date_of_birth:string,email:string,address?:string,passward:string,type?:string ,subscriptions:any}
  myRegisterationForm = new FormGroup({


     firstName: new FormControl("",[Validators.required ,Validators.minLength(3),Validators.maxLength(20) ]),
     lastName: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20) ]),
     username: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),
     gender: new FormControl(),
     DOB: new FormControl("",[Validators.required ]),
     email: new FormControl("",[Validators.required,Validators.email]),
     address: new FormControl("",[Validators.max(40), Validators.min(20)]) ,
     password: new FormControl("",[Validators.required])



     })

    //  get firstNamevalid(){
    //   return this.myRegisterationForm.get("firstName")
    //  }

    //  get passValid(){
    //   return this.myRegisterationForm.controls["passward"].valid; /// returns true or false
    // };


    newuser:any ;
    ngOnInit(): void {





    }



   async Add(profileimg) {
      console.log(profileimg)
      if(this.myRegisterationForm.valid && profileimg.files.length != 0){
        const fromdata = new FormData()
        for(let item in this.myRegisterationForm.value){
          fromdata.append(item , this.myRegisterationForm.value[item])
        }
        fromdata.append("userType" , 'user')
        fromdata.append("profileImg" , profileimg.files[0])
        console.log(this.myRegisterationForm.value , profileimg)
        this.myservice.addnewuser(fromdata)
        .subscribe({
          next: async (res:any)=>{
        //  await  Swal.fire("Logged in Successfully", ` Thank you for signing up `, "success");
            var newCart = {

              userId : res.userID,
              monthlyPrice : 0
            }

            this.cartService.createCart(newCart).subscribe(
              _ => {

                console.log("finised creating cart")
   this.loginService.LoginMeIn({email:this.myRegisterationForm.value.email , password:this.myRegisterationForm.value.password})
          .subscribe({
            next: async (res)=>{
              console.log(res)
              localStorage.setItem("Loggedin" , "true");
              localStorage.setItem("token" , res['token']);

              this.sh.sign_me_in(res)
              localStorage.setItem("user" , JSON.stringify(res))
              await Swal.fire("Logged in Successfully", `Welcome , ${this.myRegisterationForm.value.username} `, "success");
              location.replace('home')
            },
            error: async(err)=>{
             await Swal.fire("Logged in failed", `Wrong Username or Password`, "error");

            },

          })
              }
            )



          },
          error: async ()=>{
            await  Swal.fire("Failed", `something fields were empty or wrong `, "error");

          }
        })
      }else{
        await  Swal.fire("Failed", `something fields were empty or wrong `, "error");

      }

    //   if(this.myRegisterationForm.valid ) {
    //     console.log(this.myRegisterationForm.value)
    //     this.myservice.addnewuser(this.myRegisterationForm.value)
    //     .subscribe({
    //       next:(res)=>console.log
    //     })
    //      // console.log(this.myRegisterationForm.valid);
    //  ; /// get us the object
    //  // this.userData = this.myRegisterationForm.value;

    //   }
    //   else {
    //     alert(" some of fields are empty or  wrong ")
    //   }


      }



    }


























