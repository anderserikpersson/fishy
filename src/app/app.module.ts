import { ListPage } from './../pages/list/list';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from "@angular/common";


// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAF0sjYIi328fawhlAPLBSiW1zJMYrErBI",
  authDomain: "fishy-a93ab.firebaseapp.com",
  databaseURL: "https://fishy-a93ab.firebaseio.com",
  projectId: "fishy-a93ab",
  storageBucket: "",
  messagingSenderId: "1020060788504"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
