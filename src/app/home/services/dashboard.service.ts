import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as fromAuth from '../../auth/reducers';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMenuItem} from '../../core/models/menu.model';

@Injectable()
export class DashboardService {

  level3Menu:IMenuItem[];

  constructor(private store: Store<fromAuth.State>) { 
  }

  // Facility-Admin Menu
  level3FacilityAdmin: IMenuItem[] = [
    {
      name: 'Users',
      type: 'link',
      tooltip: 'users',
      icon: 'people',
      state: 'dashboard/users'
    },
    {
      name: 'Patients',
      type: 'link',
      tooltip: 'patients',
      icon: 'bed',
      state: 'dashboard/patients'
    },
    {
      name: 'Sensors',
      type: 'link',
      tooltip: 'sensors',
      icon: 'phone-landscape',
      state: 'dashboard/sensors'
    },
    {
      name: 'VirtualZones',
      type: 'link',
      tooltip: 'virtual zones',
      icon: 'map',
      state: 'dashboard/virtual-zones'
    }
  ]
  
  // Service-Partner-Admin menu
  level1ServicePartnerAdmin: IMenuItem[] = [
    {
      name: 'Users',
      type: 'link',
      tooltip: 'users',
      icon: 'person',
      state: 'dashboard/users'
    },
    {
      name: 'Organizations',
      type: 'link',
      tooltip: 'organizations',
      icon: 'domain',
      state: 'dashboard/organizations'
    }
  ]

  // Service-Partner menu
  level1ServicePartner: IMenuItem[] = [
    {
      name: 'Organizations',
      type: 'link',
      tooltip: 'organizations',
      icon: 'domain',
      state: 'dashboard/organizations'
    }
  ]

  // navigation component has subscribed to this Observable
  menuItems$:Observable<IMenuItem[]> = this.store.pipe(
    select(fromAuth.userRole),
    map(role => {
      console.log(role);
      if (role.includes("Facility Admin")) {
        this.level3Menu = this.level3FacilityAdmin;
      }else if (role.includes("Service Partner Admin")){
        this.level3Menu = this.level1ServicePartnerAdmin;
      }else if (role.includes("Service Partner")){
        this.level3Menu = this.level1ServicePartner;
      }else{
        this.level3Menu = [
          {
            name: 'Dashboard',
            type: 'link',
            tooltip: 'Dashboard',
            icon: 'dashboard',
            state: 'dashboard/blank'
          }
        ];
      }

      return this.level3Menu
    }),
    take(1)
  );
}