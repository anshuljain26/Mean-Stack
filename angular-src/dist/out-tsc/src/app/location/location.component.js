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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var auth_service_1 = require("../services/auth.service");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@agm/core");
var LocationComponent = /** @class */ (function () {
    function LocationComponent(http, router, _video, mapsAPILoader, ngZone) {
        this.http = http;
        this.router = router;
        this._video = _video;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
    }
    LocationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude;
        this.longitude;
        //create search FormControl
        this.searchControl = new forms_1.FormControl();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    _this.address = place.formatted_address;
                    _this.address_component = place.address_components;
                    console.log(_this.address);
                    console.log(_this.address_component);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    LocationComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    __decorate([
        core_1.ViewChild("search"),
        __metadata("design:type", core_1.ElementRef)
    ], LocationComponent.prototype, "searchElementRef", void 0);
    LocationComponent = __decorate([
        core_1.Component({
            selector: 'app-location',
            templateUrl: './location.component.html',
            styleUrls: ['./location.component.css'],
            providers: [auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router, auth_service_1.AuthService, core_2.MapsAPILoader,
            core_1.NgZone])
    ], LocationComponent);
    return LocationComponent;
}());
exports.LocationComponent = LocationComponent;
//# sourceMappingURL=location.component.js.map