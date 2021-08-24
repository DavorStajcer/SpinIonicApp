import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewDishPageRoutingModule } from './new-dish-routing.module';
import { NewDishPage } from './new-dish.page';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDishPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
   
  ],
  providers: [
    File,
    Camera,
    ImagePicker,
    
  ],
  declarations: [NewDishPage, SideNavComponent]
})
export class NewDishPageModule {}
