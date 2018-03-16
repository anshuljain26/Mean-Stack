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
var chat_service_1 = require("../services/chat.service");
var auth_service_1 = require("../services/auth.service");
var io = require("socket.io-client");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(chatService, _video) {
        this.chatService = chatService;
        this._video = _video;
        this.joinned = false;
        this.newUser = { nickname: '', room: '' };
        this.msgData = { room: '', nickname: '', message: '' };
        this.socket = io('http://localhost:4000');
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = JSON.parse(localStorage.getItem("user"));
        this.req = this._video.getProfile().subscribe(function (profile) {
            _this.username = profile.user.username;
            _this.newUser.nickname = _this.username;
        });
        if (user !== null) {
            this.getChatByRoom(user.room);
            this.msgData = { room: user.room, nickname: user.nickname, message: '' };
            this.joinned = true;
            this.scrollToBottom();
        }
        this.socket.on('new-message', function (data) {
            if (data.message.room === JSON.parse(localStorage.getItem("user")).room) {
                this.chats.push(data.message);
                this.msgData = { room: user.room, nickname: user.nickname, message: '' };
                this.scrollToBottom();
            }
        }.bind(this));
    };
    ChatComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    ChatComponent.prototype.scrollToBottom = function () {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) { }
    };
    ChatComponent.prototype.getChatByRoom = function (room) {
        var _this = this;
        this.chatService.getChatByRoom(room).then(function (res) {
            _this.chats = res;
        }, function (err) {
            console.log(err);
        });
    };
    ChatComponent.prototype.joinRoom = function () {
        var date = new Date();
        localStorage.setItem("user", JSON.stringify(this.newUser));
        this.getChatByRoom(this.newUser.room);
        this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
        this.joinned = true;
        this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
    };
    ChatComponent.prototype.sendMessage = function () {
        var _this = this;
        this.chatService.saveChat(this.msgData).then(function (result) {
            _this.socket.emit('save-message', result);
        }, function (err) {
            console.log(err);
        });
        this.msgData.message = " ";
    };
    ChatComponent.prototype.logout = function () {
        var date = new Date();
        var user = JSON.parse(localStorage.getItem("user"));
        this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
        localStorage.removeItem("user");
        this.joinned = false;
    };
    ChatComponent.prototype.delete = function (data) {
        var date = new Date();
        this.chatService.deleteChat(data).then((function (result) {
            console.log(result);
        }));
    };
    __decorate([
        core_1.ViewChild('scrollMe'),
        __metadata("design:type", core_1.ElementRef)
    ], ChatComponent.prototype, "myScrollContainer", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css']
        }),
        __metadata("design:paramtypes", [chat_service_1.ChatService, auth_service_1.AuthService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map