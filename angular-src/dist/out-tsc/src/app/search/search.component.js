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
var SearchComponent = /** @class */ (function () {
    function SearchComponent(router, _video, http) {
        this.router = router;
        this._video = _video;
        this.http = http;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.req = this._video.search(this.query).subscribe(function (data) {
            _this.videoList = data;
            //this.query ="";
            console.log(_this.videoList);
        });
    };
    SearchComponent.prototype.formSubmit = function (event, formData) {
        console.log(formData);
        //console.log(formData.value)
        this.query = formData.value['q'];
        if (this.query) {
            this.router.navigate(['/search', { q: this.query }]);
        }
        this.SearchQuery = "";
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, http_1.Http])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map