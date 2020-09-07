"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var d3Bullet_js_1 = require("./d3Bullet.js");
var d3Player_js_1 = require("./d3Player.js");
var randomBetween = function (min, max) {
    return Math.random() * (max - min) + min;
};
var D3Enemy = (function (_super) {
    tslib_1.__extends(D3Enemy, _super);
    function D3Enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.direction = engine_1.default.Vector3.ZERO.clone();
        _this.speed = randomBetween(3, 6);
        _this.sumTime = 0;
        _this.maxTime = 15;
        _this.hp = 5;
        _this.score = {
            collide: -2,
            dead: 1,
        };
        _this.rotationY = (Math.random() < 0.5 ? -1 : 1) * 0.05;
        _this.hurtParticle = null;
        _this.bound = engine_1.default.Vector3.createFromNumber(0.9 / 2, 0.5 / 2, 0.9 / 2);
        return _this;
    }
    D3Enemy_1 = D3Enemy;
    D3Enemy.prototype.onAwake = function () {
        this.direction.z = 1;
        this.hurtParticle = this.entity.transform._children[0].findChildByName("Hurt").entity.getComponent(engine_1.default.Particle);
        collider_js_1.default.watch(this, ["enemy"]);
    };
    D3Enemy.prototype.onUpdate = function (dt) {
        if (this.sumTime < this.maxTime) {
            this.sumTime += dt;
            this.entity.transform.position.x += this.direction.x * this.speed * dt;
            this.entity.transform.position.y += this.direction.y * this.speed * dt;
            this.entity.transform.position.z += this.direction.z * this.speed * dt;
            this.entity.transform.euler.y += this.rotationY;
        }
        else {
            this.removeEnemy();
        }
    };
    D3Enemy.prototype.onCollide = function (comp) {
        if (comp instanceof d3Player_js_1.default) {
            eventCenter_js_1.default.emit(eventCenter_js_1.default.HURT_PLAYER);
            eventCenter_js_1.default.emit(eventCenter_js_1.default.GET_SCORE, this.score.collide);
            this.removeEnemy();
        }
        else if (comp instanceof d3Bullet_js_1.default) {
            this.hp -= comp.attack;
            this.hurtParticle.emitter.start = true;
            if (this.hp <= 0) {
                eventCenter_js_1.default.emit(eventCenter_js_1.default.GET_SCORE, this.score.dead);
                this.removeEnemy();
            }
        }
    };
    D3Enemy.prototype.removeEnemy = function () {
        if (this.entity.transform) {
            var parentTransform = this.entity.transform.parent;
            parentTransform.removeChild(this.entity.transform);
            collider_js_1.default.unwatch(this);
            this.entity.destroy();
            D3Enemy_1.enemyCount--;
        }
    };
    D3Enemy.prototype.onDestroy = function () {
    };
    var D3Enemy_1;
    D3Enemy.enemyCount = 0;
    D3Enemy = D3Enemy_1 = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Enemy")
    ], D3Enemy);
    return D3Enemy;
}(engine_1.default.Script));
exports.default = D3Enemy;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kM0VuZW15LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE0QjtBQUM1QixzREFBOEM7QUFFOUMsNERBQW9EO0FBQ3BELDZDQUFxQztBQUNyQyw2Q0FBcUM7QUFFckMsSUFBTSxhQUFhLEdBQUcsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBSUY7SUFBcUMsbUNBQWE7SUFBbEQ7UUFBQSxxRUEwRUM7UUF2RVEsZUFBUyxHQUFHLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxXQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osYUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFFBQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxXQUFLLEdBQUc7WUFDYixPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDO1FBQ0ssZUFBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNsRCxrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixXQUFLLEdBQUcsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUE0RDVFLENBQUM7Z0JBMUVvQixPQUFPO0lBZ0JuQix5QkFBTyxHQUFkO1FBRUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxD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QUFDO09BQ2xCLE9BQU8sQ0EwRTNCO0lBQUQsY0FBQztDQTFFRCxBQTBFQyxDQTFFb0MsZ0JBQU0sQ0FBQyxNQUFNLEdBMEVqRDtrQkExRW9CLE9BQU8iLCJmaWxlIjoiU2NyaXB0cy9jb21wb25lbnRzL2QzRW5lbXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcclxuaW1wb3J0IENvbGxpZGVyIGZyb20gXCIuLi9jb21tb25zL2NvbGxpZGVyLmpzXCI7XHJcbmltcG9ydCBEYXRhQ2VudGVyIGZyb20gXCIuLi9jb21tb25zL2RhdGFDZW50ZXIuanNcIjtcclxuaW1wb3J0IEV2ZW50Q2VudGVyIGZyb20gXCIuLi9jb21tb25zL2V2ZW50Q2VudGVyLmpzXCI7XHJcbmltcG9ydCBEM0J1bGxldCBmcm9tIFwiLi9kM0J1bGxldC5qc1wiO1xyXG5pbXBvcnQgRDNQbGF5ZXIgZnJvbSBcIi4vZDNQbGF5ZXIuanNcIjtcclxuXHJcbmNvbnN0IHJhbmRvbUJldHdlZW4gPSAobWluLCBtYXgpID0+IHtcclxuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xyXG59O1xyXG5cclxuXHJcbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEM0VuZW15XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQzRW5lbXkgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBlbmVteUNvdW50ID0gMDtcclxuICBwdWJsaWMgZGlyZWN0aW9uID0gZW5naW5lLlZlY3RvcjMuWkVSTy5jbG9uZSgpO1xyXG4gIHB1YmxpYyBzcGVlZCA9IHJhbmRvbUJldHdlZW4oMywgNik7XHJcbiAgcHVibGljIHN1bVRpbWUgPSAwO1xyXG4gIHB1YmxpYyBtYXhUaW1lID0gMTU7XHJcbiAgcHVibGljIGhwID0gNTtcclxuICBwdWJsaWMgc2NvcmUgPSB7XHJcbiAgICBjb2xsaWRlOiAtMixcclxuICAgIGRlYWQ6IDEsXHJcbiAgfTtcclxuICBwdWJsaWMgcm90YXRpb25ZID0gKE1hdGgucmFuZG9tKCkgPCAwLjUgPyAtMSA6IDEpICogMC4wNTtcclxuICBwdWJsaWMgaHVydFBhcnRpY2xlID0gbnVsbDtcclxuICBwdWJsaWMgYm91bmQgPSBlbmdpbmUuVmVjdG9yMy5jcmVhdGVGcm9tTnVtYmVyKDAuOSAvIDIsIDAuNSAvIDIsIDAuOSAvIDIpO1xyXG5cclxuICBwdWJsaWMgb25Bd2FrZSgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwib25Bd2FrZSBEM0VuZW15XCIpO1xyXG4gICAgdGhpcy5kaXJlY3Rpb24ueiA9IDE7XHJcbiAgICB0aGlzLmh1cnRQYXJ0aWNsZSA9IHRoaXMuZW50aXR5LnRyYW5zZm9ybS5fY2hpbGRyZW5bMF0uZmluZENoaWxkQnlOYW1lKFwiSHVydFwiKS5lbnRpdHkuZ2V0Q29tcG9uZW50KGVuZ2luZS5QYXJ0aWNsZSk7XHJcbiAgICBDb2xsaWRlci53YXRjaCh0aGlzLCBbXCJlbmVteVwiXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcclxuICAgIGlmICh0aGlzLnN1bVRpbWUgPCB0aGlzLm1heFRpbWUpIHtcclxuXHJcbiAgICAgIHRoaXMuc3VtVGltZSArPSBkdDtcclxuXHJcbiAgICAgIC8vIGNvbnN0IHBsYXllciA9IERhdGFDZW50ZXIucGxheWVyRW50aXR5O1xyXG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbi54ID0gcGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi54IC0gdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLng7XHJcbiAgICAgIC8vIHRoaXMuZGlyZWN0aW9uLnkgPSBwbGF5ZXIudHJhbnNmb3JtLnBvc2l0aW9uLnkgLSB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueTtcclxuICAgICAgLy8gdGhpcy5kaXJlY3Rpb24ueiA9IHBsYXllci50cmFuc2Zvcm0ucG9zaXRpb24ueiAtIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56O1xyXG4gICAgICAvLyB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnggKz0gdGhpcy5kaXJlY3Rpb24ueCAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnkgKz0gdGhpcy5kaXJlY3Rpb24ueSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICAgICAgdGhpcy5lbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnogKz0gdGhpcy5kaXJlY3Rpb24ueiAqIHRoaXMuc3BlZWQgKiBkdDtcclxuXHJcbiAgICAgIHRoaXMuZW50aXR5LnRyYW5zZm9ybS5ldWxlci55ICs9IHRoaXMucm90YXRpb25ZO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW1vdmVFbmVteSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ29sbGlkZShjb21wKSB7XHJcbiAgICBpZiAoY29tcCBpbnN0YW5jZW9mIEQzUGxheWVyKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdpc0NvbGxpZGVkIGVuZW15IHBsYXllcicpO1xyXG4gICAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLkhVUlRfUExBWUVSKTtcclxuICAgICAgRXZlbnRDZW50ZXIuZW1pdChFdmVudENlbnRlci5HRVRfU0NPUkUsIHRoaXMuc2NvcmUuY29sbGlkZSk7XHJcbiAgICAgIHRoaXMucmVtb3ZlRW5lbXkoKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGNvbXAgaW5zdGFuY2VvZiBEM0J1bGxldCkge1xyXG4gICAgICB0aGlzLmhwIC09IGNvbXAuYXR0YWNrO1xyXG4gICAgICB0aGlzLmh1cnRQYXJ0aWNsZS5lbWl0dGVyLnN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xyXG4gICAgICAgIEV2ZW50Q2VudGVyLmVtaXQoRXZlbnRDZW50ZXIuR0VUX1NDT1JFLCB0aGlzLnNjb3JlLmRlYWQpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRW5lbXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUVuZW15KCkge1xyXG4gICAgaWYgKHRoaXMuZW50aXR5LnRyYW5zZm9ybSkge1xyXG4gICAgICBjb25zdCBwYXJlbnRUcmFuc2Zvcm0gPSB0aGlzLmVudGl0eS50cmFuc2Zvcm0ucGFyZW50O1xyXG4gICAgICBwYXJlbnRUcmFuc2Zvcm0ucmVtb3ZlQ2hpbGQodGhpcy5lbnRpdHkudHJhbnNmb3JtKTtcclxuICAgICAgQ29sbGlkZXIudW53YXRjaCh0aGlzKTtcclxuICAgICAgdGhpcy5lbnRpdHkuZGVzdHJveSgpO1xyXG4gICAgICBEM0VuZW15LmVuZW15Q291bnQtLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkRlc3Ryb3koKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25EZXN0cm95IGVuZW15Jyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
