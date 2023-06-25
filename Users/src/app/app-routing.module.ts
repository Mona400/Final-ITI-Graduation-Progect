import { importProvidersFrom, NgModule } from "@angular/core";
import { provideRouter, RouterModule, Routes } from "@angular/router";
import { CardComponent } from "./cards/components/card/card.component";
import { AccountGuardGuard } from "./hossam/guards/account-guard.guard";
import { AllProductsComponent } from "./products/components/all-products/all-products.component";
import { AboutComponent } from './about/about.component';
import { ProductDetailsComponent } from "./products/components/product-details/product-details.component";
import { HomeComponent } from "./home/home/home.component";
import { AllResturantsComponent } from "./all-resturants/all-resturants/all-resturants.component";
import { ProductCrudComponent } from "./product-crud/component/product-crud/product-crud.component";
import { RestDetailsComponent } from "./all-resturants/rest-details/rest-details.component";
import { MealsComponent } from "./all-resturants/meals/meals.component";
import { SubsComponent } from "./profile/components/subs/subs.component";
import { CartComponent } from "./Alyaa/components/cart/cart.component";
import { LoginComponent } from "./hossam/login/login/login.component";
import { SignUpComponent } from "./hossam/sign-up/sign-up.component";
var routes: Routes  = [
  {path:"product-crud",component:ProductCrudComponent},
  {path:"all-resturants",component:AllResturantsComponent},
  {path:"products",component:AllProductsComponent},
  {path:"restaurant/:id",component:RestDetailsComponent},
  {path:"about",component:AboutComponent},
  {path:"restaurant/:id/meals",component:MealsComponent},
  {path:"home",component:HomeComponent},
  {path:"details/:id",component:ProductDetailsComponent},
  {path:"cart",component:CartComponent , canActivate:[AccountGuardGuard]},
  {path:"users/subs",component:SubsComponent , canActivate:[AccountGuardGuard]},
  {path:"login",component:LoginComponent },
  {path:"sign-up",component:SignUpComponent},
  {path:"**",redirectTo:"home" ,pathMatch:"full"},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})



export class AppRoutingModule { }

