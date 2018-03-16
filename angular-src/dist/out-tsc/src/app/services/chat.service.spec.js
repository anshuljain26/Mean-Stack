"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var chat_service_1 = require("./chat.service");
describe('ChatService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [chat_service_1.ChatService]
        });
    });
    it('should ...', testing_1.inject([chat_service_1.ChatService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=chat.service.spec.js.map