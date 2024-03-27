import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAddItemComponent } from './inventario-add-item.component';

describe('InventarioAddItemComponent', () => {
  let component: InventarioAddItemComponent;
  let fixture: ComponentFixture<InventarioAddItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioAddItemComponent]
    });
    fixture = TestBed.createComponent(InventarioAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
