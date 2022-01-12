import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { HomeLayoutComponent } from './containers/home-layout.component';
import { DevicesPageComponent } from './components/devices-page/devices-page.component';
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { PatientsPageComponent } from './components/patients-page/patients-page.component';
import { PatientDetailsPageComponent } from './components/patients-page/patient-details-page/patient-details-page.component';
import { AddPatientPageComponent } from './components/patients-page/add-patient-page/add-patient-page.component';
import { CheckDevicePageComponent } from './components/devices-page/check-device-page/check-device-page.component';
import { PatientsListPageComponent } from './components/patients-page/patients-list-page/patients-list-page.component';
import { DeviceListPageComponent } from './components/devices-page/device-list-page/device-list-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { PatientDetailsComponent } from './components/patients-page/patient-details/patient-details.component';
import { PatientEventHistoryComponent } from './components/patients-page/patient-event-history/patient-event-history.component';
import { CurrentUserResolver } from './resolvers/current-user.resolver';
import { PatientStatusComponent } from './components/patients-page/patient-status/patient-status.component';
import { PatientConfigurationComponent } from './components/patients-page/patient-configuration/patient-configuration.component';
import { EditPatientPageComponent } from './components/patients-page/edit-patient-page/edit-patient-page.component';
import { PatientUsersComponent } from './components/patients-page/patient-users/patient-users.component';
import { PatientProfileComponent } from './components/patients-page/patient-profile/patient-profile.component';
import { ConfigUlceraComponent } from './components/patients-page/patient-configuration/configs/config-ulcera.component';
import { ConfigActiveTrackingComponent } from './components/patients-page/patient-configuration/configs/config-active-tracking.component';
import { ConfigActivityProfileComponent } from './components/patients-page/patient-configuration/configs/config-activity-profile.component';
import { ConfigBatteryLifeComponent } from './components/patients-page/patient-configuration/configs/config-battery-life.component';
import { ConfigFallDetectionComponent } from './components/patients-page/patient-configuration/configs/config-fall-detection.component';
import { ConfigFallPreventionComponent } from './components/patients-page/patient-configuration/configs/config-fall-prevention.component';
import { ConfigGeofencingComponent } from './components/patients-page/patient-configuration/configs/config-geofencing.component';
import { ConfigWearingControlComponent } from './components/patients-page/patient-configuration/configs/config-wearing-control.component';
import { ConfigGeoZoneComponent } from './components/patients-page/patient-configuration/configs/config-geo-zone.component';

/**
 * home module routings
 * protected by AuthGuard
 */
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    resolve: {
      currentUser: CurrentUserResolver
    },
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }, {
        path: 'home',
        component: HomePageComponent,
      }, {
        path: 'devices',
        component: DevicesPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full'
          }, {
            path: 'all',
            component: DeviceListPageComponent
          }, {
            path: 'add',
            component: CheckDevicePageComponent
          }
        ]
      }, {
        path: 'patients',
        component: PatientsPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }, {
            path: 'list',
            component: PatientsListPageComponent
          }, {
            path: 'details',
            component: PatientDetailsPageComponent,
            children: [
              {
                path: 'patient',
                component: PatientDetailsComponent
              }, {
                path: 'profile',
                component: PatientProfileComponent
              }, {
                path: 'edit',
                component: EditPatientPageComponent
              }, {
                path: 'history',
                component: PatientEventHistoryComponent
              }, {
                path: 'status',
                component: PatientStatusComponent
              }, {
                path: 'configuration',
                component: PatientConfigurationComponent
              }, {
                path: 'users',
                component: PatientUsersComponent
              }, {
                path: 'ulcera',
                component: ConfigUlceraComponent
              }, {
                path: 'active-tracking',
                component: ConfigActiveTrackingComponent
              }, {
                path: 'activity-profile',
                component: ConfigActivityProfileComponent
              }, {
                path: 'battery-life',
                component: ConfigBatteryLifeComponent
              }, {
                path: 'fall-detection',
                component: ConfigFallDetectionComponent
              }, {
                path: 'fall-prevention',
                component: ConfigFallPreventionComponent
              }, {
                path: 'geofencing',
                component: ConfigGeofencingComponent
              }, {
                path: 'wearing-control',
                component: ConfigWearingControlComponent
              }, {
                path: 'geo-zone',
                component: ConfigGeoZoneComponent
              }
            ]
          }, {
            path: 'add',
            component: AddPatientPageComponent
          }
        ]
      }, {
        path: 'about',
        component: AboutPageComponent
      }
    ]
  }
];

/**
 * Home routing module
 * exports all routes for the section 'home' of the app
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {
}
