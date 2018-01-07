import { Category } from './Category';

export class ProductUtil{
    
    id:number;
    name:string;
    price: number;
    instock: boolean;
    quantity:number;
    description: string;
    image_url: string;
    sku: string;
    _links:object[];
    selectedCategory:string;
    category:string;
    
    constructor(id:number,name:string,instock:boolean,image_url:string,quantity:number,price:number){
        this.id=id;
        this.name=name;
        this.price=price;
        this.quantity=quantity;
        this.image_url=image_url; 
    }

    }