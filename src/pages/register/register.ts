import { Component, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';

declare var google;

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(60.6741537, 17.1342999)
    });



  username: String;

  catches: FirebaseListObservable<any>;

  private catch : FormGroup;

  constructor(private formBuilder : FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, public actionSheetCtrl: ActionSheetController) {
    this.catch = this.formBuilder.group({
      fish:['', Validators.required],
      date: [moment().format()],
      weight: ['0', Validators.required],
      latitude: ['60.6741537', Validators.required],
      longitude: ['17.1342999', Validators.required],
    })
    this.username = 'Anders';
    this.catches = db.list(this.username + '/catches');
  }
  addCatch() {
    console.log(this.catch);
    this.catches.push(this.catch.value);
    this.catch.reset();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(60.6741537, 17.1342999);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  addPosition() {

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    

    // Ful lösning 
    let lat = this.marker.position.lat();
    let lng = this.marker.position.lng();
    this.catch.get('latitude').setValue(lat);
    this.catch.get('longitude').setValue(lng);

    let content = "<h4>Koordinater:" + this.map.getCenter() + "</h4>";
    this.addInfoWindow(content);

  }
  addInfoWindow(content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(this.marker, 'click', () => {
      infoWindow.open(this.map, this.marker);
    });

  }

}

