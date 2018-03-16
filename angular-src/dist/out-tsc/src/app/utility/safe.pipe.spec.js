"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var safe_pipe_1 = require("./safe.pipe");
describe('SafePipe', function () {
    it('create an instance', function () {
        var sanitizer;
        var pipe = new safe_pipe_1.SafePipe(sanitizer);
        expect(pipe).toBeTruthy();
    });
});
//# sourceMappingURL=safe.pipe.spec.js.map