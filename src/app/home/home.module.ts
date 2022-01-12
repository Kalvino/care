import {NgModule} from '@angular/core';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from '../shared/shared.module';
import {HomeRoutingModule} from './home-routing.module';
import {MenuComponent} from './components/menu/menu.component';
import {HomeLayoutComponent} from './containers/home-layout.component';
import {MenuHeaderComponent} from './components/menu/menu-header.component';
import {DevicesPageComponent} from './components/devices-page/devices-page.component';
import {EffectsModule} from '@ngrx/effects';
import {MenuEffects} from './effects/menu.effects';
import {MenuButtonComponent} from './components/menu/menu-button/menu-button.component';
import {CheckDeviceFormComponent} from './components/devices-page/check-device-page/check-device-form/check-device-form.component';
import {PatientsPageComponent} from './components/patients-page/patients-page.component';
import {PatientDetailsPageComponent} from './components/patients-page/patient-details-page/patient-details-page.component';
import {AddPatientFormComponent} from './components/patients-page/add-patient-page/add-patient-form/add-patient-form.component';
import {AddPatientPageComponent} from './components/patients-page/add-patient-page/add-patient-page.component';
import {CheckDevicePageComponent} from './components/devices-page/check-device-page/check-device-page.component';
import {PatientsListPageComponent} from './components/patients-page/patients-list-page/patients-list-page.component';
import {DeviceListPageComponent} from './components/devices-page/device-list-page/device-list-page.component';
import {DevicesEffects} from './effects/devices.effects';
import {PatientsEffects} from './effects/patients.effects';
import {StoreModule} from '@ngrx/store';
import * as fromHome from './reducers';
import {AboutPageComponent} from './components/about-page/about-page.component';
import {PatientsListComponent} from './components/patients-page/patients-list-page/patients-list/patients-list.component';
import {PatientDetailsComponent} from './components/patients-page/patient-details/patient-details.component';
import {PatientImageComponent} from './components/patients-page/patient-image/patient-image.component';
import {
    PatientsListItemComponent
} from './components/patients-page/patients-list-page/patients-list/patients-list-item/patients-list-item.component';
import {PatientEventHistoryComponent} from './components/patients-page/patient-event-history/patient-event-history.component';
import {
    PatientEventListComponent
} from './components/patients-page/patient-event-history/patient-event-list/patient-event-list.component';
import {NotificationsEffects} from './effects/notifications.effects';
import {HeaderComponent} from './components/header/header.component';
import {NotificationButtonComponent} from './components/menu/notification-button/notification-button.component';
import {ModalNotificationsComponent} from './components/notifications/modal-notifications.component';
import {EditPatientPageComponent} from './components/patients-page/edit-patient-page/edit-patient-page.component';
import {PatientNavigationComponent} from './components/patients-page/patient-navigation/patient-navigation.component';
import {PatientStatusComponent} from './components/patients-page/patient-status/patient-status.component';
import {PatientConfigurationComponent} from './components/patients-page/patient-configuration/patient-configuration.component';
import {CoreModule} from '../core/core.module';
import {PatientUsersComponent} from './components/patients-page/patient-users/patient-users.component';
import {PatientImageCropComponent} from './components/patients-page/patient-image-crop/patient-image-crop.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {PatientProfileComponent} from './components/patients-page/patient-profile/patient-profile.component';
import {ConfigUlceraComponent} from './components/patients-page/patient-configuration/configs/config-ulcera.component';
import {ConfigActiveTrackingComponent} from './components/patients-page/patient-configuration/configs/config-active-tracking.component';
import {ConfigActivityProfileComponent} from './components/patients-page/patient-configuration/configs/config-activity-profile.component';
import {ConfigBatteryLifeComponent} from './components/patients-page/patient-configuration/configs/config-battery-life.component';
import {ConfigFallPreventionComponent} from './components/patients-page/patient-configuration/configs/config-fall-prevention.component';
import {ConfigFallDetectionComponent} from './components/patients-page/patient-configuration/configs/config-fall-detection.component';
import {ConfigGeofencingComponent} from './components/patients-page/patient-configuration/configs/config-geofencing.component';
import {ConfigWearingControlComponent} from './components/patients-page/patient-configuration/configs/config-wearing-control.component';
import {ConfigGeoZoneComponent} from './components/patients-page/patient-configuration/configs/config-geo-zone.component';
import {ModalConfirmActiveTrackingComponent} from './components/patients-page/patient-configuration/configs/confirm-active-tracking.component';
import { NavigationService } from './services/navigation.service';
import { DashboardService } from './services/dashboard.service';

/**
 * COMPONENTS bucket for the components of this module
 */
export const COMPONENTS = [
    HomeLayoutComponent,
    HomePageComponent,
    MenuComponent,
    MenuHeaderComponent,
    MenuButtonComponent,
    DevicesPageComponent,
    DeviceListPageComponent,
    CheckDevicePageComponent,
    CheckDeviceFormComponent,
    PatientsPageComponent,
    PatientsListPageComponent,
    PatientDetailsPageComponent,
    PatientDetailsComponent,
    PatientsListComponent,
    PatientsListItemComponent,
    PatientImageComponent,
    PatientEventHistoryComponent,
    PatientEventListComponent,
    AddPatientPageComponent,
    EditPatientPageComponent,
    AddPatientFormComponent,
    AboutPageComponent,
    HeaderComponent,
    NotificationButtonComponent,
    ModalNotificationsComponent,
    ModalConfirmActiveTrackingComponent,
    PatientNavigationComponent,
    PatientStatusComponent,
    PatientConfigurationComponent,
    PatientUsersComponent,
    PatientImageCropComponent,
    PatientProfileComponent,
    ConfigUlceraComponent,
    ConfigActiveTrackingComponent,
    ConfigActivityProfileComponent,
    ConfigBatteryLifeComponent,
    ConfigFallDetectionComponent,
    ConfigFallPreventionComponent,
    ConfigGeofencingComponent,
    ConfigWearingControlComponent,
    ConfigGeoZoneComponent
];

/**
 * EFFECTS bucket for home effects
 */
export const EFFECTS = [
    MenuEffects,
    DevicesEffects,
    PatientsEffects,
    NotificationsEffects
];

/**
 * HomeModule the module for the home section of the app
 */
@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
        StoreModule.forFeature('home', fromHome.reducers),
        EffectsModule.forFeature(EFFECTS),
        CoreModule,
        ImageCropperModule
    ],
    declarations: [COMPONENTS],
    providers: [NavigationService, DashboardService],
    entryComponents: [
        ModalNotificationsComponent,
        EditPatientPageComponent,
        PatientImageCropComponent,
        ModalConfirmActiveTrackingComponent
    ]
})
export class HomeModule {
}
