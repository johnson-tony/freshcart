import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'product-card',
  
  
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges{

  @Input() isShowCardHeader: boolean = false;
  @Input() headerClass: string = '';
  @Input() cardBodyClass: string = '';
  @Input() iconClass: string = '';
  @Input() cardHeight: string = '';
  @Input() cardDesign: string = '';
  @Input() headerStyle: string = '';
  @Input() headerTxtClass: string = '';
  @Input() headerTxt: string = '';
  @Input() productImg: string = '';
  @Input() shortName: string = '';
  @Input() price: number = 0;
  @Output() decrementQuantity = new EventEmitter<void>();
  @Output() incrementQuantity = new EventEmitter<void>();
  @Output() addProductToCart = new EventEmitter<void>();
  @Input() quantity: number = 1;
  @Input() isLoading: boolean = false;

  decrement() {
    this.decrementQuantity.emit();
  }

  increment() {
    this.incrementQuantity.emit();
  }

  addToCart() {
    this.addProductToCart.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


}
