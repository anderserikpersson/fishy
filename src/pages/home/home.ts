import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: String;

  songs: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.username = 'Anders';
    this.songs = db.list(this.username+'/songs');
  }
  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'release',
          placeholder: 'Release'
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
            this.songs.push({
              title: data.title,
              release: data.release
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId, songTitle,songRelease) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        }, {
          text: 'Update',
          handler: () => {
            this.updateSong(songId, songTitle,songRelease);
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

  removeSong(songId: string) {
    this.songs.remove(songId);
  }
  updateSong(songId, songTitle,songRelease) {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
        {
          name: 'release',
          placeholder: 'Release',
          value: songRelease
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
            this.songs.update(songId, {
              title: data.title,
              release: data.release
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
