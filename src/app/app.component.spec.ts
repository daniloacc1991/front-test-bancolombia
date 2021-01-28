import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { authMock, initialBncStateMock } from './mock';

describe('AppComponent', () => {

  let component: AppComponent;
  let serviceJWT: JwtHelperService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return authMock.access_token;
            }
          }
        }),
      ],
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState: initialBncStateMock }),],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    serviceJWT = TestBed.inject(JwtHelperService);
  });

  it('Debería crear AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe injectar el servicio JWT', () => {
    expect(serviceJWT).toBeTruthy();
  });

});
