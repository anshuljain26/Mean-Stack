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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var angular2_jwt_1 = require("angular2-jwt");
var endpoint = 'assets/json/videos.json';
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.RegisterUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        //console.log(user);
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:8080/user/register', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post('http://localhost:8080/user/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.localstoredata = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('use', JSON.stringify(user));
        this.authtoken = token;
        this.user = user;
    };
    AuthService.prototype.loggedOut = function () {
        this.authtoken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService.prototype.getProfile = function () {
        var headers = new http_1.Headers();
        this.loadtoken();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', this.authtoken);
        return this.http.get('http://localhost:8080/user/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.profile_by_username = function (data) {
        var headers = new http_1.Headers();
        this.loadtoken();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', this.authtoken);
        //console.log(data.username)
        //console.log(data.loggedinuser)
        return this.http.get('http://localhost:8080/user/profile/info', { params: { id: data.id, username: data.username, loggedinuser: data.loggedinuser } })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.loadtoken = function () {
        this.authtoken = localStorage.getItem('id_token');
    };
    AuthService.prototype.loggedIn = function () {
        //console.log(tokenNotExpired('id_token'));
        return angular2_jwt_1.tokenNotExpired('id_token');
    };
    // Video Configuration
    AuthService.prototype.list = function () {
        return this.http.get("http://localhost:8080/user/videos")
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.get = function (slug) {
        return this.http.get("http://localhost:8080/user/videos")
            .map(function (response) {
            var data = response.json().filter(function (item) {
                if (item.slug == slug) {
                    return item;
                }
            });
            if (data.length == 1) {
                return data[0];
            }
            return {};
        })
            .catch(this.handleError);
    };
    AuthService.prototype.search = function (query) {
        return this.http.get("http://localhost:8080/user/videos")
            .map(function (response) {
            var data = [];
            var req = response.json().filter(function (item) {
                if (item.name.indexOf(query) >= 0) {
                    data.push(item);
                }
            });
            return data;
        })
            .catch(this.handleError);
    };
    AuthService.prototype.Addvideo = function (video) {
        var headers = new http_1.Headers();
        console.log(video);
        headers.append('Content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post('http://localhost:8080/user/addVideo', video, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.deleteVideo = function (id) {
        return this.http.delete("http://localhost:8080/user/videos/" + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.updateVideo = function (id) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        return this.http.put("http://localhost:8080/user/videos/" + id, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /*
      upload(fileToUpload: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        console.log(fileToUpload)
    
        return this.http.post("http://localhost:8080/public", input);
    }*/
    AuthService.prototype.likepost = function (content) {
        var headers = new http_1.Headers();
        //const blogData = { id: id };
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        //console.log(content)
        return this.http.post("http://localhost:8080/user/video/like/", content, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.dislikepost = function (content) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post("http://localhost:8080/user/video/dislike/", content, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.videocomment = function (comment) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post("http://localhost:8080/user/video/comment/", comment, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.location = function (location) {
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post("http://localhost:8080/user/find_location/", location, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.request = function (data) {
        var headers = new http_1.Headers();
        //console.log(data);
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post("http://localhost:8080/user/permission_request/", data, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.permitrequest = function (data) {
        var headers = new http_1.Headers();
        //console.log(data);
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post("http://localhost:8080/user/permission_status/", data, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.reditsearch = function (search) {
        var headers = new http_1.Headers();
        //console.log(data);
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post("http://localhost:8080/user/redit-search/", search, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.history = function (his) {
        var headers = new http_1.Headers();
        //console.log(data);
        headers.append('content-type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post("http://localhost:8080/user/history/", his, { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AuthService.prototype.handleError = function (error, caught) {
        console.log(error, caught);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map