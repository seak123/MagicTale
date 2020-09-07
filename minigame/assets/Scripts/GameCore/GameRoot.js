"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var AssetManager_1 = require("../GameBase/Asset/AssetManager");
var GameRoot = (function (_super) {
    tslib_1.__extends(GameRoot, _super);
    function GameRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameRoot.prototype.onAwake = function () {
        this.m_game = engine_1.default.game;
    };
    GameRoot.prototype.onStart = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nodeRoot, entity;
            return tslib_1.__generator(this, function (_a) {
                nodeRoot = this.m_game.createEntity3D("Node3DRoot");
                this.m_game.activeScene.root.transform.addChild(nodeRoot.transform);
                this.m_game.markAsPersist(nodeRoot);
                entity = this.m_game.createEntity3D("Monster");
                nodeRoot.transform.addChild(entity.transform);
                AssetManager_1.default.LoadAssetAsync("Assets/Resources/Modle/Monster_1/Prefab/Monster_1.prefab").then(function (prefab) {
                    var p = prefab.instantiate();
                    nodeRoot.transform.addChild(p.transform);
                });
                return [2];
            });
        });
    };
    GameRoot = tslib_1.__decorate([
        engine_1.default.decorators.serialize("GameRoot")
    ], GameRoot);
    return GameRoot;
}(engine_1.default.Script));
exports.default = GameRoot;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvR2FtZUNvcmUvR2FtZVJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTRCO0FBRTVCLCtEQUEwRDtBQU0xRDtJQUFzQyxvQ0FBYTtJQUFuRDs7SUFpQ0EsQ0FBQztJQTlCQywwQkFBTyxHQUFQO1FBRUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBTSxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUssMEJBQU8sR0FBYjs7OztnQkFNTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBVWhDLE1BQU0sR0FBVSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QyxzQkFBWSxDQUFDLGNBQWMsQ0FBQywwREFBMEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQWdCO29CQUM1RyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzdCLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Ozs7S0FDSjtJQWhDa0IsUUFBUTtRQUQ1QixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO09BQ25CLFFBQVEsQ0FpQzVCO0lBQUQsZUFBQztDQWpDRCxBQWlDQyxDQWpDcUMsZ0JBQU0sQ0FBQyxNQUFNLEdBaUNsRDtrQkFqQ29CLFFBQVEiLCJmaWxlIjoiU2NyaXB0cy9HYW1lQ29yZS9HYW1lUm9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xyXG5pbXBvcnQgTUxvZ2dlciBmcm9tIFwiLi4vR2FtZUJhc2UvRGVidWcvTUxvZ2dlclwiO1xyXG5pbXBvcnQgQXNzZXRNYW5hZ2VyIGZyb20gXCIuLi9HYW1lQmFzZS9Bc3NldC9Bc3NldE1hbmFnZXJcIjtcclxuaW1wb3J0ICogYXMgRyBmcm9tIFwiLi4vR1wiO1xyXG5cclxuZGVjbGFyZSBjb25zdCB3eDtcclxuXHJcbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJHYW1lUm9vdFwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lUm9vdCBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG4gIHByaXZhdGUgbV9nYW1lO1xyXG4gIHByaXZhdGUgY2FtZXJhTm9kZTogRy5DYW07XHJcbiAgb25Bd2FrZSgpIHtcclxuICAgIC8vaW5pdFxyXG4gICAgdGhpcy5tX2dhbWUgPSBlbmdpbmUuZ2FtZTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uU3RhcnQoKSB7XHJcblxyXG4gICAgLy8gbGV0IHNjZW5lID0gYXdhaXQgQXNzZXRNYW5hZ2VyLkxvYWRBc3NldEFzeW5jKFwiQXNzZXRzL1Jlc291cmNlcy9TY2VuZS9CYXR0bGUuc2NlbmVcIik7XHJcblxyXG4gICAgLy8gbGV0IHNjZW5lRXR0OkcuRXR0ID0gdGhpcy5tX2dhbWUucGxheVNjZW5lKHNjZW5lKTtcclxuXHJcbiAgICBsZXQgbm9kZVJvb3QgPSB0aGlzLm1fZ2FtZS5jcmVhdGVFbnRpdHkzRChcIk5vZGUzRFJvb3RcIik7XHJcbiAgICB0aGlzLm1fZ2FtZS5hY3RpdmVTY2VuZS5yb290LnRyYW5zZm9ybS5hZGRDaGlsZChub2RlUm9vdC50cmFuc2Zvcm0pO1xyXG4gICAgdGhpcy5tX2dhbWUubWFya0FzUGVyc2lzdChub2RlUm9vdCk7XHJcbiAgICAvLyDmsqHmnInnm7jmnLrliJnliJvlu7rkuIDkuKpcclxuICAgIFxyXG4gICAgLy8gbGV0IGNhbWVyYVRyYW5zID0gdGhpcy5tX2dhbWUuY3JlYXRlRW50aXR5M0QoXCJNYWluQ2FtZXJhXCIpLnRyYW5zZm9ybTtcclxuICAgIC8vIHRoaXMubV9nYW1lLmFjdGl2ZVNjZW5lLnJvb3QudHJhbnNmb3JtLmFkZENoaWxkKGNhbWVyYVRyYW5zLmVudGl0eS50cmFuc2Zvcm0pO1xyXG5cclxuICAgIC8vIHRoaXMuY2FtZXJhTm9kZSA9IGNhbWVyYVRyYW5zLmVudGl0eS5hZGRDb21wb25lbnQoRy5FLkNhbWVyYSk7XHJcbiAgICAvLyB0aGlzLmNhbWVyYU5vZGUuYXNwZWN0ID0gRy5FLmRldmljZS5zY3JlZW5XaWR0aCAvIEcuRS5kZXZpY2Uuc2NyZWVuSGVpZ2h0O1xyXG4gIFxyXG5cclxuICAgIGxldCBlbnRpdHk6IEcuRXR0ID0gdGhpcy5tX2dhbWUuY3JlYXRlRW50aXR5M0QoXCJNb25zdGVyXCIpO1xyXG4gICAgbm9kZVJvb3QudHJhbnNmb3JtLmFkZENoaWxkKGVudGl0eS50cmFuc2Zvcm0pO1xyXG4gICAgQXNzZXRNYW5hZ2VyLkxvYWRBc3NldEFzeW5jKFwiQXNzZXRzL1Jlc291cmNlcy9Nb2RsZS9Nb25zdGVyXzEvUHJlZmFiL01vbnN0ZXJfMS5wcmVmYWJcIikudGhlbigocHJlZmFiOiBHLlByZWZhYikgPT4ge1xyXG4gICAgICBsZXQgcCA9IHByZWZhYi5pbnN0YW50aWF0ZSgpO1xyXG4gICAgICBub2RlUm9vdC50cmFuc2Zvcm0uYWRkQ2hpbGQocC50cmFuc2Zvcm0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
