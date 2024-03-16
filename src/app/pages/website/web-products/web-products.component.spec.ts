import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProductsComponent } from './web-products.component';

describe('WebProductsComponent', () => {
  let component: WebProductsComponent;
  let fixture: ComponentFixture<WebProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebProductsComponent]
    });
    fixture = TestBed.createComponent(WebProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
