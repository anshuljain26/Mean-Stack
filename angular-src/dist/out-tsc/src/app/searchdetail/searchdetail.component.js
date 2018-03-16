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
var auth_service_1 = require("../services/auth.service");
var SearchdetailComponent = /** @class */ (function () {
    function SearchdetailComponent(routes, _video) {
        this.routes = routes;
        this._video = _video;
    }
    SearchdetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routesub = this.routes.params.subscribe(function (params) {
            _this.query = params['q'];
            _this.req = _this._video.search(_this.query).subscribe(function (data) {
                _this.videolist = data;
                console.log(_this.videolist);
            });
        });
    };
    SearchdetailComponent.prototype.ngOnDestroy = function () {
        this.routesub.unsubscribe();
        this.req.unsubscribe();
    };
    SearchdetailComponent = __decorate([
        core_1.Component({
            selector: 'app-searchdetail',
            templateUrl: './searchdetail.component.html',
            styleUrls: ['./searchdetail.component.css'],
            providers: [auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, auth_service_1.AuthService])
    ], SearchdetailComponent);
    return SearchdetailComponent;
}());
exports.SearchdetailComponent = SearchdetailComponent;
//# sourceMappingURL=searchdetail.component.js.map