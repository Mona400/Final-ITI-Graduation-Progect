import { Component, OnInit } from '@angular/core';
import { SubsServiceService } from './../../services/subs-service.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { PickerInteractionMode } from 'igniteui-angular';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.scss']
})
export class SubsComponent implements OnInit {
  payload;
  current_user;
  enivorment = environment
  loading = true;
  NoSub = false
  selected_sub;
  displayedColumns: string[] = ['RestName', 'Renew_time', 'Status' , 'Price' , 'Actions'];
  setSelected(sub){
    console.log(sub)
    this.selected_sub = sub
    console.log(sub)
  }

  datify(str){return new Date(str)}
  // public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
  public format = 'hh:mm tt';
  public date = [new Date() , new Date() , new Date()];
  constructor( public subService:SubsServiceService , public state:SharedService) {
    this.current_user = JSON.parse(localStorage.getItem("user"))

    this.payload = subService.getSubscribtions(this.current_user.userID).subscribe({
      next:(res:any[])=>{
        // res = res.map(item => {return {...item }})
        console.log(res)
        this.payload = res
        this.loading = false;
      },
      error:(err)=>{
        this.loading = false
        this.payload = []
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem("user"))
  }
  ChangeMeal(meal){
    console.log(meal)
  }

async  deleteSub( sub_ID , substate){
    console.log(sub_ID)
    console.log(substate)
    if(substate == 1){
      await Swal.fire("Sorry", "You Cant Delete the subscription since it's in active state", "error");
      return;
    }
    this.subService.DeleteSubscribtions(this.current_user._id , sub_ID)
    .subscribe({
      next:(res) => {
        this.payload = this.payload.filter(e => e.id != sub_ID)
      },
      error: async (err) => {
        await  Swal.fire("Something wrong happened", "Please try again later", "error");
      }
    })
  }

  updateSub( ){
    //this.selected_sub.Dates = this.date
    console.log(this.selected_sub)
    this.subService.UpdateSubs(this.selected_sub.id , { meals_and_Dates : this.selected_sub.meals_and_Dates})
    .subscribe({
      next: async (res) => {

        await  Swal.fire("Good job!", "You Have Successfully Updated Your Subscription", "success");
      },
      error: async (err) => {
        await  Swal.fire("Something wrong happened", "Please try again later", "error");
      }
    })
  }


}
