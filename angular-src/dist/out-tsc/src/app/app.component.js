"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ng-idle/core");
//import {Keepalive} from '@ng-idle/keepalive';
var angular2_flash_messages_1 = require("angular2-flash-messages");
var router_1 = require("@angular/router");
var AppComponent = /** @class */ (function () {
    function AppComponent(idle, flashMessage, router) {
        var _this = this;
        this.idle = idle;
        this.flashMessage = flashMessage;
        this.router = router;
        this.title = 'app';
        //detail:any;
        this.idleState = 'Not started.';
        this.timedOut = false;
        this.lastPing = null;
        idle.setIdle(5);
        idle.setTimeout(3600);
        idle.setInterrupts(core_2.DEFAULT_INTERRUPTSOURCES);
        idle.onIdleEnd.subscribe(function () { return _this.idleState = 'No longer idle.'; });
        idle.onTimeout.subscribe(function () {
            _this.idleState = 'Timed out!';
            _this.timedOut = true;
            if (localStorage.getItem("use") === null) {
                //	...
                _this.router.navigate(['/login']);
                return true;
            }
            else {
                localStorage.clear();
                _this.flashMessage.show("You have been logged out due to timeout", { cssClass: 'alert-danger', timeout: 5000 });
            }
        });
        idle.onIdleStart.subscribe(function () { return _this.idleState = 'You\'ve gone idle!'; });
        idle.onTimeoutWarning.subscribe(function (countdown) {
            //	console.log('You will time out in ' + countdown + ' seconds!')
        });
        // sets the ping interval to 15 seconds
        //keepalive.interval(15);
        //keepalive.onPing.subscribe(() => this.lastPing = new Date());
        this.reset();
    }
    AppComponent.prototype.reset = function () {
        console.log("hii");
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [core_2.Idle, angular2_flash_messages_1.FlashMessagesService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map