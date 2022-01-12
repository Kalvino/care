import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as fromAuth from '../../auth/reducers';
import { Store, select } from '@ngrx/store';
import { map, take, filter, startWith, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMenuItem} from '../../core/models/menu.model';

@Injectable()
export class NavigationService {

  // Menu Items
  dashboard: IMenuItem = {
    name: 'Dashboard',
    type: 'link',
    tooltip: 'Dashboard',
    icon: 'apps',
    state: 'dashboard/blank'
  };

  users: IMenuItem = {
    name: 'Users',
    type: 'link',
    tooltip: 'users',
    icon: 'people',
    state: 'dashboard/users',
    buttonLabel: 'Create',
    buttonIcon: 'add'
  };

  patients: IMenuItem = {
    name: 'Patients',
    type: 'link',
    tooltip: 'patients',
    icon: 'bed',
    state: 'dashboard/patients',
    buttonLabel: 'Create',
    buttonIcon: 'add'
  };
  sensors: IMenuItem = {
    name: 'Sensors',
    type: 'link',
    tooltip: 'sensors',
    icon: 'phone-landscape',
    state: 'dashboard/sensors',
    buttonLabel: 'Create',
    buttonIcon: 'add'
  };
  virtualZones: IMenuItem = {
    name: 'VirtualZones',
    type: 'link',
    tooltip: 'virtual zones',
    icon: 'map',
    state: 'dashboard/virtual-zones',
    buttonLabel: 'Create',
    buttonIcon: 'add'
  };
  reports: IMenuItem = {
    name: 'Reports',
    type: 'link',
    tooltip: 'reports',
    icon: 'list',
    state: 'dashboard/reports',
    buttonLabel: 'ShowReports',
    buttonIcon: 'arrow_forward'
  };

  // arrays for navigation menu
  navigationMenu:IMenuItem[];
  collectedMenuItems: IMenuItem[] = []

  constructor(private store: Store<fromAuth.State>) { 
  }

  // navigation component has subscribed to this Observable
  menuItems$:Observable<IMenuItem[]> = this.store.pipe(
    select(fromAuth.userRole),
    map(role => {
      
      this.collectedMenuItems = [];

      if (role.includes("Facility Admin")) {
        this.collectedMenuItems.push(this.users, this.patients, this.sensors, this.virtualZones);

        this.navigationMenu = this.collectedMenuItems.reduce((menu, item) => {
          return menu.includes(item) ? menu: [...menu, item]
        }, []);
      }

      if (role.includes("User Management")){
        this.collectedMenuItems.push(this.users);
        this.navigationMenu = this.collectedMenuItems.reduce((menu, item) => {
          return menu.includes(item) ? menu: [...menu, item]
        }, []);
      }
      
      if (role.includes("Patient Management")){
        this.collectedMenuItems.push(this.patients);
        
        this.navigationMenu = this.collectedMenuItems.reduce((menu, item) => {
          return menu.includes(item) ? menu: [...menu, item]
        }, []);

      }

      this.navigationMenu.push(this.reports);    
      

      return this.navigationMenu
    }),
    take(1)
  );

}
