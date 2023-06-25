// import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
// import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products:Product[] = [];
  categories: string[] = [];
  loading: boolean = true;
  cartProducts: any[] = [];
  // color =["red","green","yrr"]
  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        console.log(res);
      },
      (error) => {
        alert(error);
      }
    );
  }
  getCategories() {
    this.service.getAllCategories().subscribe(
      (res: any) => {
        console.log(res);
        this.categories = res;
      },
      (error) => {
        alert(error);
      }
    );
  }
  filterCategory(event: any) {
    let value = event.target.value;
    if (value == 'all') {
      this.getProducts();
    } else {
      this.getProductsCategory(value);
    }
    console.log(value);
  }
  getProductsCategory(keyword: string) {
    this.service.getProductByCategory(keyword).subscribe((res: any) => {
      this.products = res;
    });
  }
  addToCart(event: any) {
    console.log(event);
    // in the local storage
    if ("card" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("card")!);
     let exist = this.cartProducts.find(item => item.item.id == event.item.id);
    //  let exist = this.cartProducts.find((item) => item.item.id == event.item.id);
     // this.searchVehicleId = this.description.find(x => x.id === x.id).id.toString();
      if (exist) {
        alert('Product is already in your cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('card', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('card', JSON.stringify(this.cartProducts));
    }
  }
}
