"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_cron_jobs_1 = require("angular2-cron-jobs");
var safe_pipe_1 = require("./utility/safe.pipe");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./navbar/navbar.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var dashhboard_component_1 = require("./dashhboard/dashhboard.component");
var profile_component_1 = require("./profile/profile.component");
var validate_service_1 = require("./services/validate.service");
var auth_service_1 = require("./services/auth.service");
var chat_service_1 = require("./services/chat.service");
//import {ClientActiveService} from './services/clientactiveservice';
var auth_guard_1 = require("./guard/auth.guard");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var videolist_component_1 = require("./videolist/videolist.component");
var videodetail_component_1 = require("./videodetail/videodetail.component");
var carousel_1 = require("ngx-bootstrap/carousel");
var search_component_1 = require("./search/search.component");
var searchdetail_component_1 = require("./searchdetail/searchdetail.component");
var addvideo_component_1 = require("./addvideo/addvideo.component");
var edit_video_component_1 = require("./edit-video/edit-video.component");
var location_component_1 = require("./location/location.component");
var core_2 = require("@agm/core");
var core_3 = require("@ng-idle/core");
var angular2_moment_1 = require("angular2-moment");
var permission_component_1 = require("./permission/permission.component");
var chat_component_1 = require("./chat/chat.component");
var redit_search_component_1 = require("./redit-search/redit-search.component");
var user_profile_component_1 = require("./user-profile/user-profile.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'dashboard', component: dashhboard_component_1.DashhboardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'videos', component: videolist_component_1.VideolistComponent },
    { path: 'videos/:slug', component: videodetail_component_1.VideodetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'search', component: searchdetail_component_1.SearchdetailComponent },
    { path: 'add', component: addvideo_component_1.AddvideoComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'edit/:slug', component: edit_video_component_1.EditVideoComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'location', component: location_component_1.LocationComponent },
    { path: 'share', component: permission_component_1.PermissionComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'chat', component: chat_component_1.ChatComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'redit-search', component: redit_search_component_1.ReditSearchComponent },
    { path: 'profile/:username', component: user_profile_component_1.UserProfileComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                dashhboard_component_1.DashhboardComponent,
                profile_component_1.ProfileComponent,
                videolist_component_1.VideolistComponent,
                videodetail_component_1.VideodetailComponent,
                safe_pipe_1.SafePipe,
                search_component_1.SearchComponent,
                searchdetail_component_1.SearchdetailComponent,
                addvideo_component_1.AddvideoComponent,
                edit_video_component_1.EditVideoComponent,
                location_component_1.LocationComponent,
                permission_component_1.PermissionComponent,
                chat_component_1.ChatComponent,
                redit_search_component_1.ReditSearchComponent,
                user_profile_component_1.UserProfileComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular2_cron_jobs_1.CronSelectionModule,
                angular2_moment_1.MomentModule,
                core_3.NgIdleModule.forRoot(),
                //UserIdleModule.forRoot({idle: 18, timeout: 12, ping: 6}),
                angular2_flash_messages_1.FlashMessagesModule,
                router_1.RouterModule.forRoot(appRoutes),
                carousel_1.CarouselModule.forRoot(),
                core_2.AgmCoreModule.forRoot({
                    apiKey: "AIzaSyAS7ydX9ACTKsDZs9mqLMNixf6-CHZRUDE",
                    libraries: ["places"]
                }),
            ],
            providers: [validate_service_1.ValidateService, auth_service_1.AuthService, auth_guard_1.AuthGuard, chat_service_1.ChatService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map