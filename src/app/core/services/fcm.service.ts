import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class FcmService {

  constructor(
    private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform,
    private activatedRoute: ActivatedRoute) {
    }


  /**
   * get device Token from Firebase
   */            
  async getToken(currentUserId) {
    console.log(currentUserId);
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    console.log(token);

    this.saveToken(token, currentUserId);
  }

  /**
   * @param token Firebase Token
   * save Token to AngularFirestore with the logged in user
   */
  private saveToken(token, currentUserId) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');

    const data = {
      token,
      userId: currentUserId
    };

    return devicesRef.doc(token).set(data);
  }

  /**
   * Get notifications from the Firebase
   */
  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}