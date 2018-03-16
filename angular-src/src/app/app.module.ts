import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CronSelectionModule } from 'angular2-cron-jobs';
import { UserIdleModule } from 'angular-user-idle';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import {SafePipe} from './utility/safe.pipe';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashhboardComponent } from './dashhboard/dashhboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
//import {ClientActiveService} from './services/clientactiveservice';

import { AuthGuard } from './guard/auth.guard';

import {FlashMessagesModule } from 'angular2-flash-messages';
import { VideolistComponent } from './videolist/videolist.component';
import { VideodetailComponent } from './videodetail/videodetail.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SearchComponent } from './search/search.component';
import { SearchdetailComponent } from './searchdetail/searchdetail.component';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { LocationComponent } from './location/location.component';

import { AgmCoreModule } from '@agm/core';
import {NgIdleModule} from '@ng-idle/core'
import { MomentModule } from 'angular2-moment';
import { PermissionComponent } from './permission/permission.component';
import { ChatComponent } from './chat/chat.component';
import { ReditSearchComponent } from './redit-search/redit-search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RecordComponent } from './record/record.component';
import { RecordlistComponent } from './recordlist/recordlist.component';
import { StoriesComponent } from './stories/stories.component';



const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashhboardComponent,canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'videos',component:VideolistComponent},
  {path:'videos/:slug',component:VideodetailComponent,canActivate:[AuthGuard]},
  {path:'search',component:SearchdetailComponent},
  {path:'add',component:AddvideoComponent,canActivate:[AuthGuard]},
  {path:'edit/:slug',component:EditVideoComponent,canActivate:[AuthGuard]},
  {path:'location',component:LocationComponent},
  {path:'share',component:PermissionComponent,canActivate:[AuthGuard]},
  {path:'chat',component:ChatComponent,canActivate:[AuthGuard]},
  {path:'redit-search',component:ReditSearchComponent},
  {path:'profile/:username',component:UserProfileComponent,canActivate:[AuthGuard]},
  {path:'record',component:RecordComponent},
  {path:'record/:slug',component:RecordlistComponent},
  {path:'stories',component:StoriesComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashhboardComponent,
    ProfileComponent,
    VideolistComponent,
    VideodetailComponent,
    SafePipe,
    SearchComponent,
    SearchdetailComponent,
    AddvideoComponent,
    EditVideoComponent,
    LocationComponent,
    PermissionComponent,
    ChatComponent,
    ReditSearchComponent,
    UserProfileComponent,
    RecordComponent,
    RecordlistComponent,
    StoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CronSelectionModule,
    MomentModule,
    NgIdleModule.forRoot(),
    AngularDateTimePickerModule,
    //UserIdleModule.forRoot({idle: 18, timeout: 12, ping: 6}),
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes),
    CarouselModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "Your-api-key",
      libraries: ["places"]
    }),
  ],
  providers: [ValidateService,AuthService,AuthGuard,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
