import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../../../reducers';
import { Patient } from '../../../../core/models/patient';
import { PatientActions, PatientPageActions } from '../../../actions';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User, USER_PATIENT_PERMISSIONS } from '../../../../core/models/user';
import { ActionSheetController, ModalController, Platform, ToastController } from '@ionic/angular';
import { CameraService } from '../../../services/camera.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LoaderActions } from '../../../../core/actions';
import { PatientImageCropComponent } from '../patient-image-crop/patient-image-crop.component';

/**
 * the edit patient page component
 */
@Component({
  selector: 'care-edit-patient-page',
  templateUrl: './edit-patient-page.component.html',
  styleUrls: ['./edit-patient-page.component.scss']
})
export class EditPatientPageComponent implements OnInit {

  /**
   * errors$ subscr. for errors
   */
  errors$ = this.store.pipe(
    select(fromHome.getPatientPageError)
  );

  /**
   * isPending subscribe to pending page
   */
  isPending$ = this.store.pipe(
    select(fromHome.getPatientPagePending),
    map(isPending => {
      isPending ? this.editPatientForm.disable() : this.editPatientForm.enable();
      return isPending;
    })
  );

  /**
   * patient the patient
   */
  public patient: Patient;

  /**
   * the current user
   */
  private currentUser: User;

  /**
   * editPatientForm form builder for current form
   */
  editPatientForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required]
  });

  /**
   * constructor
   * @param {FormBuilder} formBuilder
   * @param {Store} store
   * @param {ActionSheetController} actionSheetController
   * @param {ActivatedRoute} activatedRoute
   * @param {TranslateService} translate
   * @param {CameraService} cameraService
   * @param {Platform} platform
   * @param {ToastController} toast
   * @param {ModalController} modalCtrl
   * @param {FilePath} filePath
   * @param {Router} router
   */
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromHome.State>,
    private actionSheetController: ActionSheetController,
    private translate: TranslateService,
    private cameraService: CameraService,
    private platform: Platform,
    private toast: ToastController,
    private modalCtrl: ModalController,
    private filePath: FilePath,
    public router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    this.currentUser = activatedRoute.parent.parent.parent.snapshot.data.currentUser;
  }

  /**
   * on init lifecycle callback
   */
  ngOnInit() {
    this.store
      .pipe(
        select(fromHome.getSelectedPatient),
      )
      .subscribe(patient => {
        this.patient = patient;

        if (this.patient) {
          this.editPatientForm.patchValue(patient);
        }
      });
  }

  /**
   * on submit form
   */
  onSubmit() {
    this.store.dispatch(
      new PatientActions.EditPatient({
        id: this.patient._id,
        changes: this.editPatientForm.value
      })
    );
  }

  /**
   * dismiss the modal edit form
   */
  onCancel() {
    this.store.dispatch(
      new PatientPageActions
        .CancelEditPatient({changed: this.editPatientForm.dirty})
    );
  }

  /**
   * on start editing the image
   */
  async onEditImage() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('Photo for patient profile'),
      buttons: [{
        text: this.translate.instant('Take Photo'),
        icon: 'camera',
        handler: () => {
          this.onStartCamera();
        }
      }, {
        text: this.translate.instant('Open Gallery'),
        icon: 'images',
        handler: () => {
          this.onOpenGallery();
        }
      }, {
        text: this.translate.instant('Delete Photo'),
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.onDeleteImage();
        }
      }, {
        text: this.translate.instant('CANCEL'),
        icon: 'close',
        role: 'cancel'
      }]
    });

    await actionSheet.present();
  }

  /**
   * start the camera
   * check for platform because not all platforms are supported
   */
  onStartCamera() {
    if (this.platform.is('cordova')) {
      this
        .cameraService
        .takePhoto()
        .then((data) => {
          this.store.dispatch(new LoaderActions.ShowLoader());
          this._processImage(data);
        }, () => {
          this.store.dispatch(new LoaderActions.HideLoader());
        });

    } else {
      this._notify();
    }
  }

  /**
   * open the gallery and pick an image
   */
  onOpenGallery() {
    if (this.platform.is('cordova')) {
      this.cameraService
        .takeFromGallery()
        .then(data => {

          this.store.dispatch(new LoaderActions.ShowLoader());

          if (data.indexOf('content://') !== -1) {
            this.filePath
              .resolveNativePath(data)
              .then(path => {
                this._processImage(path);
              }, () => {
                this.store.dispatch(new LoaderActions.HideLoader());
              });
          } else {
            this._processImage(data);
          }
        }, () => {
          this.store.dispatch(new LoaderActions.HideLoader());
        });

    } else {
      this._notify();
    }
  }

  /**
   * handle delete profile image
   */
  onDeleteImage() {
    this.store
      .dispatch(new PatientActions.ConfirmDeletePatientImage({patient: this.patient}));
  }

  /**
   * adding a new contact to the patient
   */
  onAddContact() {
    console.log('Handle Adding a Contact');
  }

  /**
   * process the image
   * in case of a browser we get base64 encoded data from the plugin
   * for ios & android we get a path to the image and need to convert it
   *
   * @param data
   * @private
   */
  private _processImage(data) {

    if (this.platform.is('desktop')) {
      const base64Image = 'data:image/jpeg;base64,' + data;
      this._cropImage(base64Image);

    } else if (this.platform.is('android') || this.platform.is('ios')) {

      this.cameraService.base64FromFile(data)
        .then(base64image => {
          this._cropImage(base64image);
        }, () => {
          this.store.dispatch(new LoaderActions.HideLoader());
        });

    } else {
      this._notify();
    }
  }

  /**
   * private function taking a base64
   * image string opens a modal for cropping
   *
   * @param image
   * @private
   */
  private _cropImage(image) {
    // disable the
    this.store.dispatch(new LoaderActions.HideLoader());

    this.modalCtrl
      .create({
        component: PatientImageCropComponent,
        componentProps: {
          cameraImage: image,
        }
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({data}) => {
        if (data.croppedImage) {
          this._persistImage(data.croppedImage);
        }
      });
  }

  /**
   * persist the image
   * @param {String} base64Image base64 encoded string
   * @private
   */
  private _persistImage(base64Image) {
    this.store
      .dispatch(new PatientActions.EditPatient({
        id: this.patient._id,
        changes: {
          lastName: this.patient.lastName,
          image: base64Image
        }
      }));
  }

  /**
   * notify the user that features are not
   * available on this platform
   * @private
   */
  private _notify() {
    this.toast.create({
      message: this.translate.instant('ERRORS.This feature is not available on this platform'),
      duration: 3000
    }).then(toast => toast.present());
  }

  /**
   * check if the current user
   * is admin for the selected patient
   */
  public isAdmin = () => {
    if (this.currentUser && this.patient) {
      return this.patient
        .users
        .find((user: User) => user._id === this.currentUser._id)
        .user_patient_permission === USER_PATIENT_PERMISSIONS.ADMINISTRATOR;
    }
    return false;
  }
}

