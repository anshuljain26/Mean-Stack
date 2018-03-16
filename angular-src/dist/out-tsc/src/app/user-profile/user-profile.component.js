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
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(router, http, routes, _video) {
        this.router = router;
        this.http = http;
        this.routes = routes;
        this._video = _video;
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.req = this.routes.params.subscribe(function (params) {
            _this.username = params['username'];
            var user = JSON.parse(localStorage.getItem('use'));
            var data = {
                username: _this.username,
                id: user.id,
                loggedinuser: user.username
            };
            _this.req = _this._video.profile_by_username(data).subscribe(function (data) {
                //console.log(data.user);
                _this.user = data.user;
                var hist = {
                    email: user.email,
                    slug: 'profile/' + _this.username
                };
                console.log(hist);
                _this.req = _this._video.history(hist).subscribe(function (history) {
                    console.log(history);
                });
            });
        });
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['./user-profile.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, http_1.Http, router_1.ActivatedRoute, auth_service_1.AuthService])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map