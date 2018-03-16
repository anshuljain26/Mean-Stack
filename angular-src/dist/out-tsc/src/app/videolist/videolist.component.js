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
var angular2_flash_messages_1 = require("angular2-flash-messages");
var router_1 = require("@angular/router");
var VideolistComponent = /** @class */ (function () {
    function VideolistComponent(_video, flashMessage, router) {
        this._video = _video;
        this.flashMessage = flashMessage;
        this.router = router;
    }
    VideolistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todayDate = new Date();
        this.req = this._video.list().subscribe(function (data) {
            //console.log(data)
            //console.log(data);
            _this.videolist = data;
        });
        this._video.getProfile().subscribe(function (profile) {
            _this.username = profile.user.username;
            _this.email = profile.user.email;
            console.log(_this.username);
        }, function (err) {
            localStorage.clear();
            console.log(err);
            return false;
        });
    };
    VideolistComponent.prototype.getEmbedUrl = function (item) {
        return 'https://youtube.com/embed/' + item.embed + '?ecver=2';
    };
    VideolistComponent.prototype.deleteVideo = function (id) {
        var _this = this;
        this.req = this._video.deleteVideo(id).subscribe(function (data) {
            _this._video.list().subscribe(function (videos) {
                _this.videolist = videos;
            });
            if (data.success == true) {
                _this.flashMessage.show('Video is successfully Deleted', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/videos']);
                //console.log("Video is successfully Deleted");
            }
            else {
                _this.flashMessage.show('Error occured ', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/videos']);
            }
        });
    };
    VideolistComponent.prototype.ngOnDestroy = function () {
        this.req.unsubscribe();
    };
    VideolistComponent.prototype.updatevi = function (item) {
    };
    VideolistComponent.prototype.likeBlog = function (id) {
        var _this = this;
        var content = {
            id: id,
            username: this.username
        };
        this.req = this._video.likepost(content).subscribe(function (data) {
            console.log(data);
            _this.req = _this._video.list().subscribe(function (data) {
                console.log(data);
                //console.log(data);
                _this.videolist = data;
            });
        });
    };
    VideolistComponent.prototype.dislikeBlog = function (id) {
        var _this = this;
        var content = {
            id: id,
            username: this.username
        };
        this.req = this._video.dislikepost(content).subscribe(function (data) {
            console.log(data);
            _this.req = _this._video.list().subscribe(function (data) {
                console.log(data);
                //console.log(data);
                _this.videolist = data;
            });
        });
    };
    VideolistComponent.prototype.request = function (id) {
        var _this = this;
        var user = {
            id: id,
            email: this.email
        };
        //console.log(user);
        this.req = this._video.request(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    VideolistComponent = __decorate([
        core_1.Component({
            selector: 'app-videolist',
            templateUrl: './videolist.component.html',
            styleUrls: ['./videolist.component.css'],
            providers: [auth_service_1.AuthService]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            angular2_flash_messages_1.FlashMessagesService,
            router_1.Router])
    ], VideolistComponent);
    return VideolistComponent;
}());
exports.VideolistComponent = VideolistComponent;
//# sourceMappingURL=videolist.component.js.map