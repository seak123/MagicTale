"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AssetManager = (function () {
    function AssetManager() {
    }
    AssetManager.LoadAssetAsync = function (path) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, engine.loader.load(path).promise];
            });
        });
    };
    return AssetManager;
}());
exports.default = AssetManager;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvR2FtZUJhc2UvQXNzZXQvQXNzZXRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBO0lBQUE7SUFJQSxDQUFDO0lBSGdCLDJCQUFjLEdBQTNCLFVBQTRCLElBQVc7OztnQkFDbkMsV0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUE7OztLQUMxQztJQUNMLG1CQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUEiLCJmaWxlIjoiU2NyaXB0cy9HYW1lQmFzZS9Bc3NldC9Bc3NldE1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NldE1hbmFnZXIge1xyXG4gICAgc3RhdGljIGFzeW5jIExvYWRBc3NldEFzeW5jKHBhdGg6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gZW5naW5lLmxvYWRlci5sb2FkKHBhdGgpLnByb21pc2VcclxuICAgIH1cclxufSJdfQ==
