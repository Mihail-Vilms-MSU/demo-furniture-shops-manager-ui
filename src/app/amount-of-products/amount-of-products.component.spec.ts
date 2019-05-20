import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountOfProductsComponent } from './amount-of-products.component';

describe('AmountOfProductsComponent', () => {
  let component: AmountOfProductsComponent;
  let fixture: ComponentFixture<AmountOfProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountOfProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountOfProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
