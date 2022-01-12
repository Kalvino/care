import { TestBed, inject } from '@angular/core/testing';
import { SocketService } from './socket.service';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import { LoginSuccess } from '../../auth/actions/auth-api.actions';

describe('SocketService', () => {

  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        StoreModule.forFeature('auth', fromAuth.reducers)
      ],
      providers: [SocketService]
    });

    store = TestBed.get(Store);
    store.dispatch(new LoginSuccess({
      loginResponse: {
        'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYxNzU1MjY5YzdlMGQxZDNjZjY0OGNhNzE4ZTlmMDE0NmY5ZmQxNTAyMmE1YzFlZTkxYTQ4YjRiMWVlMzVkZmYyN2MwY2Q2YmUwY2MwN2Q3In0.eyJhdWQiOiIxIiwianRpIjoiZjE3NTUyNjljN2UwZDFkM2NmNjQ4Y2E3MThlOWYwMTQ2ZjlmZDE1MDIyYTVjMWVlOTFhNDhiNGIxZWUzNWRmZjI3YzBjZDZiZTBjYzA3ZDciLCJpYXQiOjE1NDY0NTIxNDYsIm5iZiI6MTU0NjQ1MjE0NiwiZXhwIjoxNTc3OTg4MTQ2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.mCby8l5dhUN03tIVFM29qGB0XSKUEYQh-_ZNGXkZVGe93DkxUlxoXeUJ9QPNp0TPxqYH19a5yVDFEmM3_MhQqVW9-k4jUJEDjPR8LGYiUMeWgPIV9V8HmgfJokvSnAnUK7x-5s7QeCcg5FesVKf-PuASEYBvTXQFvybhmPoTLYuamliVbShHZE-MUm7991VYxvpCRv8vUVwzLK7hl_U1sV6irP9R3VL0qIvGPwOJb1DbcGJhW4qRR2eaH0SFYN4E-idoGyruqtPjKQQa7kEAvK11PlLjwEjJx1H9th0EHB5fpfj9P_WfLJL4XkYXhJSzbifDZ99Vy4H3Cb-fOcqUnD_QY_TX4G6Np_fy8e1rKuW1UKHb_IVL6yQAfIfSPi9UZgkzsDBP--qh-Ii-uSb6vxGn19-chm7eIDkk3JHVZH1-j-BEZbx03ekCvd-SjbeP9EdNtajFYZp5xizwKdu68eNLiYLqna3LfmipbBARbJeo3M3hH51f56_pzt1QbPqYHmln_WmNDuzVNBbIMoPB0cdtb9ujK3V_R9rj2n9eSFdGkWRGQbWg8NHX53TkyXZ-4tpNIeS_-qZA2CzyqML2wLUfC-wQJKuHlxEnlbeZikQd5oxybh2T36CGxXyMfv2_GDyRxh78J3OVMHaIaENIR63wQ4yP9pQnOhQKn36WX5k',
        'user': {
          'id': 2,
          'firstname': 'Yazmin',
          'lastname': 'Kovacek',
          'username': 'adminapp',
          'email': 'adminapp@example.org',
          'nursing_home_id': 1,
          'user_group_id': 1
        }
      }
    }));

  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
