import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { productModel } from '../../product-curd.model';
import { ProductCrudService } from '../../services/product-crud.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss']
})
export class ProductCrudComponent {
  formValue!:FormGroup

  showadd!:boolean;
  showupdate!:boolean;
productmodelobj:productModel=new productModel;
allproductdata:any;

constructor(private formBuilder:FormBuilder,private api:ProductCrudService,private Activated:ActivatedRoute){

}
// constructor(private api:ProductCrudService){

// }


//to hide on add
  add(){
    this.showadd=true;
    this.showupdate=false


  }
  //to hide on edit
  edit(data:any){
    this.showadd=false;
    this.showupdate=true;

this.productmodelobj.id=data.id;
    this.formValue.controls['id'].setValue(data.id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['built_no'].setValue(data.built_no);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phone'].setValue(data.phone);

  }

  //update on edit

update(){
  this.productmodelobj.id=this.formValue.value.id;
  this.productmodelobj.productName=this.formValue.value.productName;
  this.productmodelobj.productTitle=this.formValue.value.productTitle;
  this.productmodelobj.oldPrice=this.formValue.value.oldPrice;
  this.productmodelobj.newPrice=this.formValue.value.newPrice;

  this.productmodelobj.description=this.formValue.value.description;
  this.productmodelobj.img=this.formValue.value.img;

  this.api.updatestudent(this.productmodelobj,this.productmodelobj.id).subscribe(res=>{
    this.formValue.reset();
    this.getdata();
alert("Record update successfully")
  },err=>{
    alert("something is wrong ")
  })
}


  addProduct(){
    this.productmodelobj.id=this.formValue.value.id;
    this.productmodelobj.productName=this.formValue.value.productName;
    this.productmodelobj.productTitle=this.formValue.value.productTitle;
    this.productmodelobj.oldPrice=this.formValue.value.oldPrice;
    this.productmodelobj.newPrice=this.formValue.value.newPrice;

    this.productmodelobj.description=this.formValue.value.description;
    this.productmodelobj.img=this.formValue.value.img;

    this.api.poststudent(this.productmodelobj).subscribe(res=>{
     // this.formValue.reset(res)
      //this.getdata();
      location.reload()
      alert("record add successfully")

    },err=>{
      alert("something went wrong ")
    })

  }

  //getdata
getdata(){
this.api.getstudent()
.subscribe(res=>{
  this.allproductdata=res;
})
}

//delete
deleteProduct(data:any){
  if(confirm('are you sure to delete?'))
  this.api.deletestudent(data.id)
  .subscribe(res=>{
    alert("Recodr delete successfully");
    this.getdata();
  })

}



  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      id:['',Validators.required],
      productName:['',Validators.required],
      productTitle:['',Validators.required],
      oldPrice:['',Validators.required],
      newPrice:['',Validators.required],
      description:['',Validators.required],
      img:['',Validators.required],


    })
    this.getdata();
  }

}
