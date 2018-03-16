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
var angular2_flash_messages_1 = require("angular2-flash-messages");
var auth_service_1 = require("../services/auth.service");
var validate_service_1 = require("../services/validate.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AddvideoComponent = /** @class */ (function () {
    function AddvideoComponent(flashMessage, _video, validateService, router, http) {
        this.flashMessage = flashMessage;
        this._video = _video;
        this.validateService = validateService;
        this.router = router;
        this.http = http;
        this.filesToUpload = [];
    }
    AddvideoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._video.getProfile().subscribe(function (profile) {
            _this.username = profile.user;
            console.log(_this.username.username);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AddvideoComponent.prototype.upload = function () {
        var _this = this;
        var formData = new FormData();
        var files = this.filesToUpload;
        var files2 = this.filesToUpload2;
        var name = this.name;
        var slug = this.slug;
        formData.append("uploads[]", files[0], files[0]['name']);
        formData.append("uploads[]", files2[0], files2[0]['name']);
        formData.append("name", this.name);
        formData.append("slug", this.slug);
        formData.append("createdBy", this.username.username);
        var headers = new http_1.Headers();
        //console.log(user);
        headers.append('Content-type', 'application/json');
        //console.log(formData.get('name'))
        this.req = this.http.post('http://localhost:8080/user/upload', formData)
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            if (data.success) {
                console.log("Video is successfully added");
                _this.flashMessage.show('Video is successfully added', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/videos']);
            }
            else {
                _this.flashMessage.show('Error in uploading', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    AddvideoComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    };
    AddvideoComponent.prototype.file2ChangeEvent = function (fileInput) {
        this.filesToUpload2 = fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    };
    __decorate([
        core_1.ViewChild('userimage'),
        __metadata("design:type", Object)
    ], AddvideoComponent.prototype, "User_Image", void 0);
    __decorate([
        core_1.ViewChild('uservideo'),
        __metadata("design:type", Object)
    ], AddvideoComponent.prototype, "User_Video", void 0);
    AddvideoComponent = __decorate([
        core_1.Component({
            selector: 'app-addvideo',
            templateUrl: './addvideo.component.html',
            styleUrls: ['./addvideo.component.css'],
            providers: [auth_service_1.AuthService, validate_service_1.ValidateService]
        }),
        __metadata("design:paramtypes", [angular2_flash_messages_1.FlashMessagesService,
            auth_service_1.AuthService,
            validate_service_1.ValidateService,
            router_1.Router,
            http_1.Http])
    ], AddvideoComponent);
    return AddvideoComponent;
}());
exports.AddvideoComponent = AddvideoComponent;
//# sourceMappingURL=addvideo.component.js.map