import { Component } from '@angular/core';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent {


   products: Product[] = [
     
    
  ];
  
}

interface Product {
  location: string;
  topic: string;
  amount: number;
}
