import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { assetsMocks, bncStateMock } from 'src/app/mock';
import { TranslationService } from '~core/i18n';

import { locale as esLang } from '~core/i18n/config/es';
import { BncStoreActions, BncStoreModule, BncStoreReducer } from '~root-store/bnc-store';

import { ConvertMoneyComponent } from './convert-money.component';

fdescribe('ConvertMoneyComponent', () => {
  let component: ConvertMoneyComponent;
  let fixture: ComponentFixture<ConvertMoneyComponent>;

  let translateService: TranslateService;
  let translationService: TranslationService;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ConvertMoneyComponent],
      providers: [
        TranslateService,
        TranslateStore,
        TranslationService,
        provideMockStore({ initialState: bncStateMock }),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertMoneyComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    translationService = TestBed.inject(TranslationService);
    translationService.loadTranslations(esLang);
    mockStore = TestBed.inject(MockStore);
    // mockStore.setState(bncStateMock);
    fixture.detectChanges();
  });

  it('Debe crear el component', () => {
    expect(component).toBeTruthy();
  });

  it('Debe injectar el translateService', () => {
    expect(translateService).toBeTruthy();
  });

  it('Debe injectar el translationService', () => {
    expect(translationService).toBeTruthy();
  });

  it('Debe injectar el mockStore', () => {
    expect(mockStore).toBeTruthy();
  });


  // it('Debe ejecutar el ngOnInit y llamar a gesSubcrptions', () => {
  //   let spyComponent = spyOn(component, 'getSubcriptions').and.callThrough();
  //   let spyStore = spyOn(mockStore, 'select').and.callThrough();
  //   // mockStore.setState(bncStateMock);
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(spyComponent).toHaveBeenCalled();
  // });

});
