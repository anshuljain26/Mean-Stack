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
var angular2_flash_messages_1 = require("angular2-flash-messages");
var auth_service_1 = require("../services/auth.service");
var EditVideoComponent = /** @class */ (function () {
    function EditVideoComponent(routes, http, _video, router, flashMessage) {
        this.routes = routes;
        this.http = http;
        this._video = _video;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    EditVideoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routesub = this.routes.params.subscribe(function (params) {
            _this.slug = params['slug'];
            _this.req = _this._video.get(_this.slug).subscribe(function (data) {
                _this.content = data;
                //console.log(this.content)
            });
        });
    };
    EditVideoComponent.prototype.upload = function () {
        var _this = this;
        var formData = new FormData();
        var files = this.filesToUpload;
        var files2 = this.filesToUpload2;
        var name = this.content.name;
        var slug1 = this.content.slug;
        formData.append("uploads[]", files[0], files[0]['name']);
        formData.append("uploads[]", files2[0], files2[0]['name']);
        formData.append("name", name);
        formData.append("slug", slug1);
        formData.append("id", this.content._id);
        var headers = new Headers();
        //console.log(user);
        headers.append('Content-type', 'application/json');
        //console.log(files[0]['name'])
        //console.log(files2[0]['name'])
        console.log(formData.get('name'));
        console.log(formData.get('slug'));
        //console.log(this.content.name);
        this.req = this.http.put('http://localhost:8080/user/edit/upload', formData)
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('Video is successfully Updated', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate['/videos'];
            }
            else {
                _this.flashMessage.show('Error in uploading', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate['/videos'];
            }
        });
    };
    EditVideoComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    };
    EditVideoComponent.prototype.file2ChangeEvent = function (fileInput) {
        this.filesToUpload2 = fileInput.target.files;
        //this.product.photo = fileInput.target.files[0]['name'];
    };
    EditVideoComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-video',
            templateUrl: './edit-video.component.html',
            styleUrls: ['./edit-video.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.Http, auth_service_1.AuthService, router_1.Router,
            angular2_flash_messages_1.FlashMessagesService])
    ], EditVideoComponent);
    return EditVideoComponent;
}());
exports.EditVideoComponent = EditVideoComponent;
//# sourceMappingURL=edit-video.component.js.map