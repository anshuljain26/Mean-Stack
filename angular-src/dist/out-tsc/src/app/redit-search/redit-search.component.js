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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var auth_service_1 = require("../services/auth.service");
var ReditSearchComponent = /** @class */ (function () {
    function ReditSearchComponent(http, router, _video) {
        this.http = http;
        this.router = router;
        this._video = _video;
        this.model = {
            sortby: "Relevance"
        };
    }
    ReditSearchComponent.prototype.ngOnInit = function () {
    };
    ReditSearchComponent.prototype.reditsearch = function () {
        var _this = this;
        var search = {
            search: this.Search,
            sortby: this.model.sortby,
            limit: this.limit
        };
        this.Search = " ";
        this.model.sortby = " ";
        this.limit = " ";
        this.req = this._video.reditsearch(search).subscribe(function (search) {
            _this.content = search.body.data.children;
            console.log(_this.content);
            //console.log(search.body.data.children.data);
        });
    };
    ReditSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-redit-search',
            templateUrl: './redit-search.component.html',
            styleUrls: ['./redit-search.component.css'],
        }),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router, auth_service_1.AuthService])
    ], ReditSearchComponent);
    return ReditSearchComponent;
}());
exports.ReditSearchComponent = ReditSearchComponent;
//# sourceMappingURL=redit-search.component.js.map