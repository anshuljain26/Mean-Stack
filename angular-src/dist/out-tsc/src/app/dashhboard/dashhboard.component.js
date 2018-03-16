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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var auth_service_1 = require("../services/auth.service");
var DashhboardComponent = /** @class */ (function () {
    function DashhboardComponent(router, http, _video) {
        this.router = router;
        this.http = http;
        this._video = _video;
    }
    DashhboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.req = this._video.getProfile().subscribe(function (profile) {
            _this.user = profile.user.email;
            _this.username = profile.user.username;
        });
        this.req = this._video.list().subscribe(function (data) {
            _this.video = data;
            console.log(_this.video);
        });
    };
    DashhboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashhboard',
            templateUrl: './dashhboard.component.html',
            styleUrls: ['./dashhboard.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, http_1.Http, auth_service_1.AuthService])
    ], DashhboardComponent);
    return DashhboardComponent;
}());
exports.DashhboardComponent = DashhboardComponent;
//# sourceMappingURL=dashhboard.component.js.map