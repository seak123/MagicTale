"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var collider_js_1 = require("../commons/collider.js");
var dataCenter_js_1 = require("../commons/dataCenter.js");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var d3Bullet_js_1 = require("./d3Bullet.js");
var POS_LIMIT = {
    x: [-30, 30],
    z: [-54, 14.3],
};
var D3Player = (function (_super) {
    tslib_1.__extends(D3Player, _super);
    function D3Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null;
        _this.bulletInterval = 0.3;
        _this.bulletTime = 0;
        _this.player = null;
        _this.hurtParticle = null;
        _this.speed = 10;
        _this.direction = engine_1.default.Vector3.ZERO.clone();
        _this.rotation = engine_1.default.Vector3.ZERO.clone();
        _this.bound = engine_1.default.Vector3.createFromNumber(2.75 / 2, 0.46 / 2, 0.5 / 2);
        return _this;
    }
    D3Player.prototype.onAwake = function () {
        console.log("onAwake D3Player");
        this.player = this.entity;
        dataCenter_js_1.default.playerEntity = this.player;
        dataCenter_js_1.default.playerComp = this;
        this.hurtParticle = this.player.transform._children[0].findChildByName("Hurt").entity.getComponent(engine_1.default.Particle);
        this.initEvent();
        this.initPrefab();
        collider_js_1.default.watch(this, ["player"]);
        eventCenter_js_1.default.emit(eventCenter_js_1.default.ADD_PLAYER);
    };
    D3Player.prototype.onUpdate = function (dt) {
        if (this.player) {
            this.updateMove(dt);
            this.updateBullet(dt);
        }
    };
    D3Player.prototype.initPrefab = function () {
        var _this = this;
        engine_1.default.loader.load("resource/Bullet.prefab").promise.then(function (prefab) {
            _this.bulletPrefab = prefab;
        });
    };
    D3Player.prototype.initEvent = function () {
        var _this = this;
        eventCenter_js_1.default.on(eventCenter_js_1.default.TOUCH_MOVE, function (direction) {
            _this.direction.x = direction.x;
            _this.direction.y = direction.y;
            _this.direction.z = direction.z;
            if (direction.x === 0) {
                _this.rotation.x = 0;
                _this.rotation.z = 0;
            }
            else {
                _this.rotation.x = 0.01;
                _this.rotation.z = direction.x < 0 ? 0.01 : -0.01;
            }
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.HURT_PLAYER, function () {
            _this.hurtParticle.emitter.start = true;
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.START_SHOOT, function () {
            _this.bulletInterval = 0.1;
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.END_SHOOT, function () {
            _this.bulletInterval = 0.3;
        });
    };
    D3Player.prototype.updateMove = function (dt) {
        for (var k in POS_LIMIT) {
            if (this.rotation[k] === 0) {
                this.player.transform.euler[k] = 0;
            }
            else {
                this.player.transform.euler[k] += this.rotation[k];
                if (this.player.transform.euler[k] > 0.2) {
                    this.player.transform.euler[k] = 0.2;
                }
                else if (this.player.transform.euler[k] < -0.2) {
                    this.player.transform.euler[k] = -0.2;
                }
            }
        }
        var move = {
            x: this.speed * this.direction.x * dt,
            y: this.speed * this.direction.y * dt,
            z: this.speed * this.direction.z * dt,
        };
        var pos = this.player.transform.position;
        for (var k in POS_LIMIT) {
            if (pos[k] + move[k] < POS_LIMIT[k][0]
                ||
                    pos[k] + move[k] > POS_LIMIT[k][1]) {
                move[k] = 0;
            }
            this.player.transform.position[k] += move[k];
        }
        if (move.x !== 0 || move.y !== 0 || move.z !== 0) {
            eventCenter_js_1.default.emit(eventCenter_js_1.default.MOVE_PLAYER, move);
        }
    };
    D3Player.prototype.updateBullet = function (dt) {
        if (!this.bulletPrefab) {
            return;
        }
        this.bulletTime += dt;
        if (this.bulletTime >= this.bulletInterval) {
            var entity = this.bulletPrefab.instantiate();
            var script = entity.addComponent(d3Bullet_js_1.default);
            entity.transform.position = this.player.transform.position.clone();
            script.direction.z = -1;
            dataCenter_js_1.default.worldEntity.transform.addChild(entity.transform);
            this.bulletTime -= this.bulletInterval;
        }
    };
    D3Player = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Player")
    ], D3Player);
    return D3Player;
}(engine_1.default.Script));
exports.default = D3Player;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kM1BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBNEI7QUFDNUIsc0RBQThDO0FBQzlDLDBEQUFrRDtBQUNsRCw0REFBb0Q7QUFDcEQsNkNBQXFDO0FBRXJDLElBQU0sU0FBUyxHQUFHO0lBQ2hCLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUVaLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQztDQUNmLENBQUM7QUFHRjtJQUFzQyxvQ0FBYTtJQUFuRDtRQUFBLHFFQStIQztRQTlIUSxrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixvQkFBYyxHQUFHLEdBQUcsQ0FBQztRQUNyQixnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLFlBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxrQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixXQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsZUFBUyxHQUFHLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN4QyxjQUFRLEdBQUcsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLFdBQUssR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQXNIOUUsQ0FBQztJQXBIUSwwQkFBTyxHQUFkO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBR2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQix1QkFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3RDLHVCQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FB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QUksSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUN4QztJQUNILENBQUM7SUE5SGtCLFFBQVE7UUFENUIsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztPQUNuQixRQUFRLENBK0g1QjtJQUFELGVBQUM7Q0EvSEQsQUErSEMsQ0EvSHFDLGdCQUFNLENBQUMsTUFBTSxHQStIbEQ7a0JBL0hvQixRQUFRIiwiZmlsZSI6IlNjcmlwdHMvY29tcG9uZW50cy9kM1BsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlbmdpbmUgZnJvbSAnZW5naW5lJztcclxuaW1wb3J0IENvbGxpZGVyIGZyb20gJy4uL2NvbW1vbnMvY29sbGlkZXIuanMnO1xyXG5pbXBvcnQgRGF0YUNlbnRlciBmcm9tICcuLi9jb21tb25zL2RhdGFDZW50ZXIuanMnO1xyXG5pbXBvcnQgRXZlbnRDZW50ZXIgZnJvbSAnLi4vY29tbW9ucy9ldmVudENlbnRlci5qcyc7XHJcbmltcG9ydCBEM0J1bGxldCBmcm9tICcuL2QzQnVsbGV0LmpzJztcclxuXHJcbmNvbnN0IFBPU19MSU1JVCA9IHtcclxuICB4OiBbLTMwLCAzMF0sXHJcbiAgLy8geTogWy0xMDAsIDEwMF0sXHJcbiAgejogWy01NCwgMTQuM10sXHJcbn07XHJcblxyXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDNQbGF5ZXJcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRDNQbGF5ZXIgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuICBwdWJsaWMgYnVsbGV0UHJlZmFiID0gbnVsbDtcclxuICBwdWJsaWMgYnVsbGV0SW50ZXJ2YWwgPSAwLjM7XHJcbiAgcHVibGljIGJ1bGxldFRpbWUgPSAwO1xyXG4gIHB1YmxpYyBwbGF5ZXIgPSBudWxsO1xyXG4gIHB1YmxpYyBodXJ0UGFydGljbGUgPSBudWxsO1xyXG4gIHB1YmxpYyBzcGVlZCA9IDEwO1xyXG4gIHB1YmxpYyBkaXJlY3Rpb24gPSBlbmdpbmUuVmVjdG9yMy5aRVJPLmNsb25lKCk7XHJcbiAgcHVibGljIHJvdGF0aW9uID0gZW5naW5lLlZlY3RvcjMuWkVSTy5jbG9uZSgpO1xyXG4gIHB1YmxpYyBib3VuZCA9IGVuZ2luZS5WZWN0b3IzLmNyZWF0ZUZyb21OdW1iZXIoMi43NSAvIDIsIDAuNDYgLyAyLCAwLjUgLyAyKTtcclxuXHJcbiAgcHVibGljIG9uQXdha2UoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIm9uQXdha2UgRDNQbGF5ZXJcIik7XHJcbiAgICAvLyB0aGlzLmluaXRFbnRpdHkoKTtcclxuXHJcbiAgICB0aGlzLnBsYXllciA9IHRoaXMuZW50aXR5O1xyXG4gICAgRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHkgPSB0aGlzLnBsYXllcjtcclxuICAgIERhdGFDZW50ZXIucGxheWVyQ29tcCA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5odXJ0UGFydGljbGUgPSB0aGlzLnBsYXllci50cmFuc2Zvcm0uX2NoaWxkcmVuWzBdLmZpbmRDaGlsZEJ5TmFtZShcIkh1cnRcIikuZW50aXR5LmdldENvbXBvbmVudChlbmdpbmUuUGFydGljbGUpO1xyXG4gICAgLy8gdGhpcy5odXJ0UGFydGljbGUuZW1pdHRlci5zdGFydCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5pbml0RXZlbnQoKTtcclxuICAgIHRoaXMuaW5pdFByZWZhYigpO1xyXG4gICAgQ29sbGlkZXIud2F0Y2godGhpcywgW1wicGxheWVyXCJdKTtcclxuXHJcbiAgICBFdmVudENlbnRlci5lbWl0KEV2ZW50Q2VudGVyLkFERF9QTEFZRVIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVXBkYXRlKGR0KSB7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXIpIHtcclxuICAgICAgdGhpcy51cGRhdGVNb3ZlKGR0KTtcclxuICAgICAgdGhpcy51cGRhdGVCdWxsZXQoZHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRQcmVmYWIoKSB7XHJcbiAgICBlbmdpbmUubG9hZGVyLmxvYWQoXCJyZXNvdXJjZS9CdWxsZXQucHJlZmFiXCIpLnByb21pc2UudGhlbigocHJlZmFiKSA9PiB7XHJcbiAgICAgIHRoaXMuYnVsbGV0UHJlZmFiID0gcHJlZmFiO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdEV2ZW50KCkge1xyXG4gICAgRXZlbnRDZW50ZXIub24oRXZlbnRDZW50ZXIuVE9VQ0hfTU9WRSwgKGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnZ2V0IDJkIE9OX1RPVUNIX01PVkUnLCBkaXJlY3Rpb24ueCwgZGlyZWN0aW9uLnksIGRpcmVjdGlvbi56KTtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24ueCA9IGRpcmVjdGlvbi54O1xyXG4gICAgICB0aGlzLmRpcmVjdGlvbi55ID0gZGlyZWN0aW9uLnk7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uLnogPSBkaXJlY3Rpb24uejtcclxuXHJcbiAgICAgIGlmIChkaXJlY3Rpb24ueCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMucm90YXRpb24ueCA9IDA7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbi56ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uLnggPSAwLjAxO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24ueiA9IGRpcmVjdGlvbi54IDwgMCA/IDAuMDEgOiAtMC4wMTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgRXZlbnRDZW50ZXIub24oRXZlbnRDZW50ZXIuSFVSVF9QTEFZRVIsICgpID0+IHtcclxuICAgICAgdGhpcy5odXJ0UGFydGljbGUuZW1pdHRlci5zdGFydCA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5TVEFSVF9TSE9PVCwgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJ1bGxldEludGVydmFsID0gMC4xO1xyXG4gICAgfSk7XHJcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5FTkRfU0hPT1QsICgpID0+IHtcclxuICAgICAgdGhpcy5idWxsZXRJbnRlcnZhbCA9IDAuMztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZU1vdmUoZHQpIHtcclxuICAgIGZvciAoY29uc3QgayBpbiBQT1NfTElNSVQpIHtcclxuICAgICAgaWYgKHRoaXMucm90YXRpb25ba10gPT09IDApIHtcclxuICAgICAgICB0aGlzLnBsYXllci50cmFuc2Zvcm0uZXVsZXJba10gPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSArPSB0aGlzLnJvdGF0aW9uW2tdO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXllci50cmFuc2Zvcm0uZXVsZXJba10gPiAwLjIpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA9IDAuMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA8IC0wLjIpIHtcclxuICAgICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5ldWxlcltrXSA9IC0wLjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLmVudGl0eS50cmFuc2Zvcm0uZXVsZXIueSArPSAwLjAzO1xyXG5cclxuXHJcbiAgICBjb25zdCBtb3ZlID0ge1xyXG4gICAgICB4OiB0aGlzLnNwZWVkICogdGhpcy5kaXJlY3Rpb24ueCAqIGR0LFxyXG4gICAgICB5OiB0aGlzLnNwZWVkICogdGhpcy5kaXJlY3Rpb24ueSAqIGR0LFxyXG4gICAgICB6OiB0aGlzLnNwZWVkICogdGhpcy5kaXJlY3Rpb24ueiAqIGR0LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBvcyA9IHRoaXMucGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgIGZvciAoY29uc3QgayBpbiBQT1NfTElNSVQpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHBvc1trXSArIG1vdmVba10gPCBQT1NfTElNSVRba11bMF1cclxuICAgICAgICB8fFxyXG4gICAgICAgIHBvc1trXSArIG1vdmVba10gPiBQT1NfTElNSVRba11bMV1cclxuICAgICAgKSB7XHJcbiAgICAgICAgbW92ZVtrXSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wbGF5ZXIudHJhbnNmb3JtLnBvc2l0aW9uW2tdICs9IG1vdmVba107XHJcbiAgICB9XHJcbiAgICBpZiAobW92ZS54ICE9PSAwIHx8IG1vdmUueSAhPT0gMCB8fCBtb3ZlLnogIT09IDApIHtcclxuICAgICAgRXZlbnRDZW50ZXIuZW1pdChFdmVudENlbnRlci5NT1ZFX1BMQVlFUiwgbW92ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQnVsbGV0KGR0KSB7XHJcbiAgICBpZiAoIXRoaXMuYnVsbGV0UHJlZmFiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuYnVsbGV0VGltZSArPSBkdDtcclxuICAgIGlmICh0aGlzLmJ1bGxldFRpbWUgPj0gdGhpcy5idWxsZXRJbnRlcnZhbCkge1xyXG4gICAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmJ1bGxldFByZWZhYi5pbnN0YW50aWF0ZSgpO1xyXG4gICAgICBjb25zdCBzY3JpcHQgPSBlbnRpdHkuYWRkQ29tcG9uZW50KEQzQnVsbGV0KTtcclxuICAgICAgZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbiA9IHRoaXMucGxheWVyLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAvLyBzY3JpcHQuZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb24uY2xvbmUoKTtcclxuICAgICAgLy8gaWYgKHRoaXMuZGlyZWN0aW9uLmlzWmVybygpKSB7XHJcbiAgICAgIC8vICAgc2NyaXB0LmRpcmVjdGlvbi56ID0gLTE7XHJcbiAgICAgIC8vIH1cclxuICAgICAgc2NyaXB0LmRpcmVjdGlvbi56ID0gLTE7XHJcblxyXG4gICAgICBEYXRhQ2VudGVyLndvcmxkRW50aXR5LnRyYW5zZm9ybS5hZGRDaGlsZChlbnRpdHkudHJhbnNmb3JtKTtcclxuXHJcbiAgICAgIHRoaXMuYnVsbGV0VGltZSAtPSB0aGlzLmJ1bGxldEludGVydmFsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=
