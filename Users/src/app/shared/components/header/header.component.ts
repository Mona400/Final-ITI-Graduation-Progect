import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   *
   */
  enviroment = environment
  current_user
  chosen_file:any
  form:FormGroup;
  constructor(public sh:SharedService , public build:FormBuilder) {


  }

  fileChanges(data:any){
    this.chosen_file = data.target.files[0]
  }
  ngOnInit(): void {
    if(this.sh.my_checkAuth()){
      this.current_user = JSON.parse(localStorage.getItem("user"))
      this.sh.GetUser(this.current_user.userID).subscribe(res => {
         this.form = this.build.group({
        username:[this.current_user.username,[]],
        firstName:[res['firstName'],[]],
        lastName:[res['lastName'],[]],
        email:[res['email'],[]],
        address:[res['address'],[]],
        password:['',[]]

      })
      })


    }

  }
  backme(){

    document.querySelectorAll(".modal-body").forEach( e => e["style"].display='none' )
    document.getElementById('general').style.display='block'
  }
  show(id){
    // document.getElementById('general').style.display='none'
    // document.getElementById(id).style.display='block'
  }
  auth_flag = this.sh.my_checkAuth()
  id:any
  logout(){
    localStorage.setItem("Loggedin","false")
    localStorage.setItem("user","{}")
    localStorage.setItem("cart","[]")
    location.replace("/home")
  }
  drop(param:any){
    if(this.id==param){
      this.id=" "
    }
    else{
      this.id=param;
    }

  }

  async UpdateUser(pass,repass){


    if(pass.value != repass.value){
      await swal.fire("failed" , "Please Ensure that the passwords match" , 'error');
    }else{
      if(pass.value == ''){
        delete this.form.value.password
      }else{
        this.form.value.password = pass.value
      }

      console.log({  ...this.form.value })
      var fromdataer = new FormData()
      for(let item in this.form.value){
        fromdataer.append( item , this.form.value[item] )
      }
      if(this.chosen_file){
        fromdataer.append("profileImg" , this.chosen_file)
      }
      console.log(this.current_user)
      this.sh.UpdateUser(this.current_user.userID , fromdataer)
      .subscribe({
        next: async (res)=>{
          await swal.fire("success",'You have succesfully Updated Your Profile' , 'success')

          this.sh.GetUser(this.current_user.userID).subscribe(res => {
            console.log(res)

              var user = {
                email : res['email'],
                profileImg : res['profileImg'],
                userID : this.current_user.userID,
                username: res['userName'],

              }
              this.sh.sign_me_in(user)
              localStorage.setItem("user" , JSON.stringify(user))
              location.reload()
          })

        },
        error:async(err)=>{
          console.log(err)
          await swal.fire("failure",'Somthing Wrong Has Happened ' , 'error')

        }
      })
    }

  //  this.userService.UpdateUser()
}
}
