import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(private service: CardsService) {}
  cartProducts: any[] = [];
  total: any = 0;
  success: boolean = false;
  ngOnInit(): void {
    this.getCartProduct();
  }
  getCartProduct() {
    if ('card' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('card')!);
    }
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quntity;
    }
  }
  addAmount(index: number) {
    this.cartProducts[index].quntity++;
    this.getCartTotal();
    localStorage.setItem('card', JSON.stringify(this.cartProducts));
  }
  minsAmount(index: number) {
    this.cartProducts[index].quntity--;
    this.getCartTotal();
    localStorage.setItem('card', JSON.stringify(this.cartProducts));
  }
  detectChange() {
    this.getCartTotal();
    localStorage.setItem('card', JSON.stringify(this.cartProducts));
  }
  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem('card', JSON.stringify(this.cartProducts));
  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
    localStorage.setItem('card', JSON.stringify(this.cartProducts));
  }
  addCart() {
    let products = this.cartProducts.map((item) => {
      return { productId: item.item.id, quantity: item.quntity };
    });
    let Modele = {
      userId: 5,
      date: new Date(),
      products: products,
    };
    this.service.createNewCart(Modele).subscribe((res) => {
      this.success = true;
    });
    console.log(Modele);
  }
}
