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
var auth_service_1 = require("../services/auth.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var PermissionComponent = /** @class */ (function () {
    function PermissionComponent(_video, http, router, flashMessage) {
        this._video = _video;
        this.http = http;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    PermissionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.req = this._video.getProfile().subscribe(function (profile) {
            _this.email = profile.user.email;
            _this.username = profile.user.username;
        });
        this.req = this._video.list().subscribe(function (data) {
            _this.video = data;
            //console.log(this.video);
        });
    };
    PermissionComponent.prototype.permit = function (id, val, em) {
        var _this = this;
        var data = {
            id: id,
            val: val,
            em: em
        };
        console.log(data);
        this.req = this._video.permitrequest(data).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/share']);
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/share']);
            }
        });
    };
    PermissionComponent = __decorate([
        core_1.Component({
            selector: 'app-permission',
            templateUrl: './permission.component.html',
            styleUrls: ['./permission.component.css']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            http_1.Http,
            router_1.Router,
            angular2_flash_messages_1.FlashMessagesService])
    ], PermissionComponent);
    return PermissionComponent;
}());
exports.PermissionComponent = PermissionComponent;
//# sourceMappingURL=permission.component.js.map