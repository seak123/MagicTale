"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var MLogger_1 = require("../GameBase/Debug/MLogger");
var GameRoot = (function (_super) {
    tslib_1.__extends(GameRoot, _super);
    function GameRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameRoot.prototype.onAwake = function () {
        MLogger_1.default.Log("Magic Story begin here", "hello world", "glhf");
    };
    GameRoot = tslib_1.__decorate([
        engine_1.default.decorators.serialize("GameRoot")
    ], GameRoot);
    return GameRoot;
}(engine_1.default.Script));
exports.default = GameRoot;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvR2FtZUNvcmUvR2FtZVJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTRCO0FBQzVCLHFEQUFnRDtBQUtoRDtJQUFzQyxvQ0FBYTtJQUFuRDs7SUFLQSxDQUFDO0lBSkMsMEJBQU8sR0FBUDtRQUVFLGlCQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBSmtCLFFBQVE7UUFENUIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztPQUNuQixRQUFRLENBSzVCO0lBQUQsZUFBQztDQUxELEFBS0MsQ0FMcUMsZ0JBQU0sQ0FBQyxNQUFNLEdBS2xEO2tCQUxvQixRQUFRIiwiZmlsZSI6IlNjcmlwdHMvR2FtZUNvcmUvR2FtZVJvb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcclxuaW1wb3J0IE1Mb2dnZXIgZnJvbSBcIi4uL0dhbWVCYXNlL0RlYnVnL01Mb2dnZXJcIjtcclxuXHJcbmRlY2xhcmUgY29uc3Qgd3g7XHJcblxyXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiR2FtZVJvb3RcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVJvb3QgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuICBvbkF3YWtlKCkge1xyXG4gICAgLy9zdXBlci5vbkF3YWtlKCk7XHJcbiAgICBNTG9nZ2VyLkxvZyhcIk1hZ2ljIFN0b3J5IGJlZ2luIGhlcmVcIiwgXCJoZWxsbyB3b3JsZFwiLCBcImdsaGZcIik7XHJcbiAgfVxyXG59XHJcbiJdfQ==
