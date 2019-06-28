import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNewComponent } from './shop-new.component';

describe('ShopNewComponent', () => {
  let component: ShopNewComponent;
  let fixture: ComponentFixture<ShopNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
