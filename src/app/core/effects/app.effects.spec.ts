import { TestBed } from '@angular/core/testing';
import { AppEffects } from './app.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';

xdescribe('AppEffects', () => {

  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$)
      ]
    });

    actions$ = TestBed.get(Actions);
  });

  xdescribe('showLoader', () => {

  });

  xdescribe('hideLoader', () => {

  });

});
