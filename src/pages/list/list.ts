import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  username: String = 'Anders';
  catches: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.catches = db.list(this.username + '/catches');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  showOptions(catchId, fish, date, comments) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Vad vill du göra?',
      buttons: [
        {
          text: 'Ta bort en registerad fångst',
          role: 'destructive',
          handler: () => {
            this.removeCatch(catchId);
          }
        }, {
          text: 'Kommentera en fångst',
          handler: () => {
            this.updateCatch(catchId, fish, date, comments);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeCatch(catchId: string) {
    this.catches.remove(catchId);
  }
  updateCatch(catchId, fish, date, comments) {
    let prompt = this.alertCtrl.create({
      title: 'Registrerad fångst',
      message: "Uppdatera informationen om fångsten",
      inputs: [

        {
          name: 'comments',
          placeholder: 'Kommentarer',
          value: comments
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.catches.update(catchId, {
              comments: data.comments
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
