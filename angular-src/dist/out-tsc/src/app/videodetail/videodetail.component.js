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
var router_2 = require("@angular/router");
var http_1 = require("@angular/http");
var auth_service_1 = require("../services/auth.service");
var VideodetailComponent = /** @class */ (function () {
    function VideodetailComponent(routes, http, _video, router) {
        this.routes = routes;
        this.http = http;
        this._video = _video;
        this.router = router;
    }
    VideodetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routesub = this.routes.params.subscribe(function (params) {
            _this.slug = params['slug'];
            _this.req = _this._video.get(_this.slug).subscribe(function (data) {
                _this.video = data;
                _this.videoid = _this.video._id;
                console.log(data);
            });
        });
        this.req = this._video.getProfile().subscribe(function (profile) {
            _this.email = profile.user.email;
            //console.log(this.email);
            var data = {
                slug: _this.slug,
                email: _this.email
            };
            console.log(data);
            _this.req = _this._video.history(data).subscribe(function (history) {
                console.log(history);
            });
        });
    };
    VideodetailComponent.prototype.comment = function () {
        var _this = this;
        var comment = {
            email: this.email,
            comment: this.Comment,
            id: this.videoid
        };
        //console.log(comment)
        this.req = this._video.videocomment(comment).subscribe(function (data) {
            console.log(data);
            _this.router.navigate(["/videos/"]);
        });
    };
    VideodetailComponent.prototype.ngOnDestroy = function () {
        this.routesub.unsubscribe();
        this.req.unsubscribe();
    };
    VideodetailComponent = __decorate([
        core_1.Component({
            selector: 'app-videodetail',
            templateUrl: './videodetail.component.html',
            styleUrls: ['./videodetail.component.css'],
            providers: [auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, auth_service_1.AuthService, router_2.Router])
    ], VideodetailComponent);
    return VideodetailComponent;
}());
exports.VideodetailComponent = VideodetailComponent;
//# sourceMappingURL=videodetail.component.js.map