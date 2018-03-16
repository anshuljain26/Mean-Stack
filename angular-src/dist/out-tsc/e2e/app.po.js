"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var AngularSrcPage = /** @class */ (function () {
    function AngularSrcPage() {
    }
    AngularSrcPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    AngularSrcPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return AngularSrcPage;
}());
exports.AngularSrcPage = AngularSrcPage;
//# sourceMappingURL=app.po.js.map