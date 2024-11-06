import { Product } from "./product";

export interface NewProduct extends Product{
  optionId:string,
  amount:number,
  size:string,
  color:string
}