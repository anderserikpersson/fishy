import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  username: String;

  catches: FirebaseListObservable<any>;

  private catch : FormGroup;

  constructor(private formBuilder : FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.catch = this.formBuilder.group({
      fish:['', Validators.required],
      date: [moment().format()],
      weight: ['0', Validators.required],
    })
    this.username = 'Anders';
    this.catches = db.list(this.username + '/catches');
  }
  addCatch() {
    console.log(this.catch);
    this.catches.push(this.catch.value);
    this.catch.reset();
    
  }
  addCatchold() {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
}

