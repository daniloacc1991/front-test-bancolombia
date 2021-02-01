import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { authMock, bncStateMock } from './mock';

describe('AppComponent', () => {

  let component: AppComponent;
  let serviceJWT: JwtHelperService;
  let fixture: ComponentFixture<AppComponent>;

  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        JwtModule.forRoot({}),
      ],
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState: bncStateMock }),],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    serviceJWT = TestBed.inject(JwtHelperService);
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('Debería crear AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe injectar el servicio JWT', () => {
    expect(serviceJWT).toBeTruthy();
  });

  it('Debería estar expirado el token y hacer dispatch', () => {
    const spy = spyOn(serviceJWT, 'isTokenExpired').and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});
