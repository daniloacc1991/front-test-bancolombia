import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoneyComponent } from './list-money.component';

describe('ListMoneyComponent', () => {
  let component: ListMoneyComponent;
  let fixture: ComponentFixture<ListMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
