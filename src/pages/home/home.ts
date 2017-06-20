import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: String;

  catches: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.username = 'Anders';
    this.catches = db.list(this.username + '/catches');
  }
  addCatch() {
    let prompt = this.alertCtrl.create({
      title: 'Registrera fångst',
      message: "Mata in uppgifter om din fångst",
      inputs: [
        {
          name: 'fish',
          placeholder: 'Fisktyp'
        },
        {
          name: 'date',
          placeholder: 'Fångstdatum'
        }
        ,
        {
          name: 'comments',
          placeholder: 'Kommentarer'
        }
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
            this.catches.push({
              fish: data.fish,
              date: data.date,
              comments: data.comments
            });
          }
        }
      ]
    });
    prompt.present();
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
          text: 'Uppdatera en registrerad fångst',
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
          name: 'fish',
          placeholder: 'Fisktyp',
          value: fish
        },
        {
          name: 'date',
          placeholder: 'Fångstdatum',
          value: date
        },
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
              fish: data.fish,
              date: data.date,
              comments: data.comments
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
