import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';
import { assetsMocks, initialBncStateMock } from 'src/app/mock';

import { ListMoneyComponent } from './list-money.component';

describe('ListMoneyComponent', () => {
  let component: ListMoneyComponent;
  let fixture: ComponentFixture<ListMoneyComponent>;

  let mockStore: MockStore;
  const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMoneyComponent, InfiniteScrollDirective],
      imports: [InfiniteScrollModule],
      providers: [
        provideMockStore({ initialState: initialBncStateMock }),
        { provide: Router, useValue: RouterSpy }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMoneyComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe injectar el mockStore', () => {
    expect(mockStore).toBeTruthy();
  });

  it('Debe llamar al metodo getPrice()', () => {
    spyOn(component, 'getPrice').and.callThrough();
    component.getPrice();
    expect(component.getPrice).toHaveBeenCalled();
  });

  it('Debe llamar al metodo goConvert()', () => {
    spyOn(component, 'goConvert').and.callThrough();
    component.goConvert(assetsMocks[0]);
    expect(component.goConvert).toHaveBeenCalled();
  });

  it('Debe llamar al metodo appendItems()', () => {
    spyOn(component, 'appendItems').and.callThrough();
    component.assetsLoad = assetsMocks;
    component.appendItems(0, 20);
    fixture.detectChanges();
    expect(component.appendItems).toHaveBeenCalled();
    expect(component.assetsView.length).toEqual(20);
  });

});
