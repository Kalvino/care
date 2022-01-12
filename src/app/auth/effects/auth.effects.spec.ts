import { AuthEffects } from './auth.effects';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

// TODO: Write test for auth.effects
xdescribe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$)
      ]
    });

    actions$ = TestBed.get(Actions);
  });

  xdescribe('login$', () => {

  });

});
