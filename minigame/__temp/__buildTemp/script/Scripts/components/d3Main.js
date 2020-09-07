"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var dataCenter_js_1 = require("../commons/dataCenter.js");
var d3Enemy_js_1 = require("./d3Enemy.js");
var d3Player_js_1 = require("./d3Player.js");
var ENEMY_INTERVAL = 0.5;
var randomBetween = function (min, max) {
    return Math.random() * (max - min) + min;
};
var D3Main = (function (_super) {
    tslib_1.__extends(D3Main, _super);
    function D3Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.world = null;
        _this.enemyTime = 0;
        _this.enemyPrefab = null;
        return _this;
    }
    D3Main.prototype.onAwake = function () {
        console.log("onAwake D3Main");
        this.world = this.entity.transform.parent.entity;
        dataCenter_js_1.default.worldEntity = this.world;
        collider_js_1.default.watchGroup("enemy", "player");
        collider_js_1.default.watchGroup("enemy", "bullet");
        this.initPlayer();
        this.initEnemy();
    };
    D3Main.prototype.onUpdate = function (dt) {
        collider_js_1.default.onUpdate(dt);
        this.enemyTime += dt;
        if (this.enemyTime >= ENEMY_INTERVAL) {
            this.addEnemy();
            this.enemyTime -= ENEMY_INTERVAL;
        }
    };
    D3Main.prototype.initPlayer = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Aircraft.prefab").promise.then(function (prefab) {
            var entity = prefab.instantiate();
            entity.addComponent(d3Player_js_1.default);
            entity.transform.position.y += 1;
            entity.transform.position.z = 8;
            _this.world.transform.addChild(entity.transform);
        });
    };
    D3Main.prototype.initEnemy = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Enemy01.prefab").promise.then(function (prefab) {
            _this.enemyPrefab = prefab;
        });
    };
    D3Main.prototype.addEnemy = function () {
        if (!this.enemyPrefab) {
            return;
        }
        if (d3Enemy_js_1.default.enemyCount >= 20) {
            return;
        }
        var entity = this.enemyPrefab.instantiate();
        var script = entity.addComponent(d3Enemy_js_1.default);
        entity.transform.position.x = randomBetween(-26, 26);
        entity.transform.position.y += 1;
        entity.transform.position.z = randomBetween(-50, -20);
        this.world.transform.addChild(entity.transform);
        d3Enemy_js_1.default.enemyCount++;
    };
    D3Main = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Main")
    ], D3Main);
    return D3Main;
}(engine_1.default.Script));
exports.default = D3Main;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kM01haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTRCO0FBQzVCLHNEQUE4QztBQUM5QywwREFBa0Q7QUFDbEQsMkNBQW1DO0FBQ25DLDZDQUFxQztBQUVyQyxJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsSUFBTSxhQUFhLEdBQUcsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBR0Y7SUFBb0Msa0NBQWE7SUFBakQ7UUFBQSxxRUE0REM7UUEzRFEsV0FBSyxHQUF5QixJQUFJLENBQUM7UUFDbkMsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUN0QixpQkFBVyxHQUF5QixJQUFJLENBQUM7O0lBeURsRCxDQUFDO0lBdkRRLHdCQUFPLEdBQWQ7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pELHVCQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFcEMscUJBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLHFCQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSx5QkFBUSxHQUFmLFVBQWdCLEVBQVU7UUFDeEIscUJBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLGNBQWMsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxjQUFjLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRU0sMkJBQVUsR0FBakI7UUFBQSxpQkFRQztRQVBDLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBZ0IsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUNoRixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQkFBUSxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sMEJBQVMsR0FBaEI7UUFBQSxpQkFJQztRQUhDLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBZ0IseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTTtZQUMvRSxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5QkFBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTztTQUNSO1FBQ0QsSUFBSSxvQkFBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUU7WUFDNUIsT0FBTztTQUNSO1FBQ0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLG9CQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR3RELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsb0JBQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUV2QixDQUFDO0lBM0RrQixNQUFNO1FBRDFCLGdCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7T0FDakIsTUFBTSxDQTREMUI7SUFBRCxhQUFDO0NBNURELEFBNERDLENBNURtQyxnQkFBTSxDQUFDLE1BQU0sR0E0RGhEO2tCQTVEb0IsTUFBTSIsImZpbGUiOiJTY3JpcHRzL2NvbXBvbmVudHMvZDNNYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XHJcbmltcG9ydCBDb2xsaWRlciBmcm9tIFwiLi4vY29tbW9ucy9jb2xsaWRlci5qc1wiO1xyXG5pbXBvcnQgRGF0YUNlbnRlciBmcm9tIFwiLi4vY29tbW9ucy9kYXRhQ2VudGVyLmpzXCI7XHJcbmltcG9ydCBEM0VuZW15IGZyb20gXCIuL2QzRW5lbXkuanNcIjtcclxuaW1wb3J0IEQzUGxheWVyIGZyb20gXCIuL2QzUGxheWVyLmpzXCI7XHJcblxyXG5jb25zdCBFTkVNWV9JTlRFUlZBTCA9IDAuNTtcclxuY29uc3QgcmFuZG9tQmV0d2VlbiA9IChtaW4sIG1heCkgPT4ge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbn07XHJcblxyXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDNNYWluXCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzTWFpbiBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG4gIHB1YmxpYyB3b3JsZDogbnVsbCB8IGVuZ2luZS5FbnRpdHkgPSBudWxsOyAvLyB3b3JsZCBlbnRpdHlcclxuICBwdWJsaWMgZW5lbXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBlbmVteVByZWZhYjogZW5naW5lLlByZWZhYiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgb25Bd2FrZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwib25Bd2FrZSBEM01haW5cIik7XHJcbiAgICB0aGlzLndvcmxkID0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBhcmVudC5lbnRpdHk7XHJcbiAgICBEYXRhQ2VudGVyLndvcmxkRW50aXR5ID0gdGhpcy53b3JsZDtcclxuICAgIFxyXG4gICAgQ29sbGlkZXIud2F0Y2hHcm91cChcImVuZW15XCIsIFwicGxheWVyXCIpO1xyXG4gICAgQ29sbGlkZXIud2F0Y2hHcm91cChcImVuZW15XCIsIFwiYnVsbGV0XCIpO1xyXG5cclxuICAgIHRoaXMuaW5pdFBsYXllcigpO1xyXG4gICAgdGhpcy5pbml0RW5lbXkoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVwZGF0ZShkdDogbnVtYmVyKSB7XHJcbiAgICBDb2xsaWRlci5vblVwZGF0ZShkdCk7XHJcbiAgICB0aGlzLmVuZW15VGltZSArPSBkdDtcclxuICAgIGlmICh0aGlzLmVuZW15VGltZSA+PSBFTkVNWV9JTlRFUlZBTCkge1xyXG4gICAgICB0aGlzLmFkZEVuZW15KCk7XHJcbiAgICAgIHRoaXMuZW5lbXlUaW1lIC09IEVORU1ZX0lOVEVSVkFMO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRQbGF5ZXIoKSB7XHJcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQ8ZW5naW5lLlByZWZhYj4oXCJyZXNvdXJjZS9BaXJjcmFmdC5wcmVmYWJcIikucHJvbWlzZS50aGVuKChwcmVmYWIpID0+IHtcclxuICAgICAgY29uc3QgZW50aXR5ID0gcHJlZmFiLmluc3RhbnRpYXRlKCk7XHJcbiAgICAgIGVudGl0eS5hZGRDb21wb25lbnQoRDNQbGF5ZXIpO1xyXG4gICAgICBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gMTtcclxuICAgICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gODtcclxuICAgICAgdGhpcy53b3JsZC50cmFuc2Zvcm0uYWRkQ2hpbGQoZW50aXR5LnRyYW5zZm9ybSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0RW5lbXkoKSB7XHJcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQ8ZW5naW5lLlByZWZhYj4oXCJyZXNvdXJjZS9FbmVteTAxLnByZWZhYlwiKS5wcm9taXNlLnRoZW4oKHByZWZhYikgPT4ge1xyXG4gICAgICB0aGlzLmVuZW15UHJlZmFiID0gcHJlZmFiO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRW5lbXkoKSB7XHJcbiAgICBpZiAoIXRoaXMuZW5lbXlQcmVmYWIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKEQzRW5lbXkuZW5lbXlDb3VudCA+PSAyMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmVuZW15UHJlZmFiLmluc3RhbnRpYXRlKCk7XHJcbiAgICBjb25zdCBzY3JpcHQgPSBlbnRpdHkuYWRkQ29tcG9uZW50KEQzRW5lbXkpO1xyXG4gICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi54ID0gcmFuZG9tQmV0d2VlbigtMjYsIDI2KTtcclxuICAgIGVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueSArPSAxO1xyXG4gICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gcmFuZG9tQmV0d2VlbigtNTAsIC0yMCk7XHJcbiAgICAvLyBlbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnggPSByYW5kb21CZXR3ZWVuKC0xMCwgMTApO1xyXG4gICAgLy8gZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56ID0gcmFuZG9tQmV0d2VlbigxMCwgMSk7XHJcbiAgICB0aGlzLndvcmxkLnRyYW5zZm9ybS5hZGRDaGlsZChlbnRpdHkudHJhbnNmb3JtKTtcclxuICAgIEQzRW5lbXkuZW5lbXlDb3VudCsrO1xyXG4gICAgLy8gY29uc29sZS5sb2coJ0FkZCBFbmVteScsIEQzRW5lbXkuZW5lbXlDb3VudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
