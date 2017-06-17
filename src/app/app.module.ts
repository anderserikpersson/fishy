import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';


// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyD7AfRfeV5D7r6U5BKYzh6E4MbnlZHn-s4",
    authDomain: "af2-lists-ae90f.firebaseapp.com",
    databaseURL: "https://af2-lists-ae90f.firebaseio.com",
    projectId: "af2-lists-ae90f",
    storageBucket: "",
    messagingSenderId: "775950119354"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
