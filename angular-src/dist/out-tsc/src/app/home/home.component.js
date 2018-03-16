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
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_video) {
        this._video = _video;
        this.homelist = [];
        this.videoListDefaultImage = 'assets/images/nature/1.jpg';
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.req = this._video.list().subscribe(function (data) {
            console.log(data);
            data.filter(function (item) {
                if (item.featured) {
                    _this.homelist.push(item);
                }
            });
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.req.unsubscribe();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            providers: [auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map