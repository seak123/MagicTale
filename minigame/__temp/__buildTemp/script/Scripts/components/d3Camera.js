"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var dataCenter_js_1 = require("../commons/dataCenter.js");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var POS_LIMIT = {
    x: [-26, 26],
    z: [-44, 13],
};
var D3Camera = (function (_super) {
    tslib_1.__extends(D3Camera, _super);
    function D3Camera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        return _this;
    }
    D3Camera.prototype.onAwake = function () {
        var _this = this;
        this.camera = this.entity.getComponent(engine_1.default.Camera);
        dataCenter_js_1.default.cameraComp = this.camera;
        console.log("onAwake D3Camera");
        eventCenter_js_1.default.on(eventCenter_js_1.default.ADD_PLAYER, function () {
        });
        eventCenter_js_1.default.on(eventCenter_js_1.default.MOVE_PLAYER, function (move) {
            var pos = dataCenter_js_1.default.playerEntity.transform.position;
            for (var k in POS_LIMIT) {
                if (pos[k] + move[k] >= POS_LIMIT[k][0]
                    &&
                        pos[k] + move[k] <= POS_LIMIT[k][1]) {
                    _this.camera.entity.transform.position[k] += move[k];
                }
            }
        });
    };
    D3Camera.prototype.onUpdate = function (dt) {
    };
    D3Camera = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D3Camera")
    ], D3Camera);
    return D3Camera;
}(engine_1.default.Script));
exports.default = D3Camera;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kM0NhbWVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBNEI7QUFDNUIsMERBQWtEO0FBQ2xELDREQUFvRDtBQUVwRCxJQUFNLFNBQVMsR0FBRztJQUNoQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFFWixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7Q0FDYixDQUFDO0FBR0Y7SUFBc0Msb0NBQWE7SUFBbkQ7UUFBQSxxRUE4QkM7UUE1QlEsWUFBTSxHQUFHLElBQUksQ0FBQzs7SUE0QnZCLENBQUM7SUExQlEsMEJBQU8sR0FBZDtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsdUJBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFaEMsd0JBQVcsQ0FBQyxFQUFFLENBQUMsd0JBQVcsQ0FBQyxVQUFVLEVBQUU7UUFFdkMsQ0FBQyxDQUFDLENBQUM7UUFDSCx3QkFBVyxDQUFDLEVBQUUsQ0FBQyx3QkFBVyxDQUFDLFdBQVcsRUFBRSxVQUFDLElBQUk7WUFDM0MsSUFBTSxHQUFHLEdBQUcsdUJBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUN2RCxLQUFLLElBQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDekIsSUFDRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O3dCQUVuQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbkM7b0JBQ0EsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3JEO2FBQ0Y7UUFFSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLEVBQUU7SUFFbEIsQ0FBQztJQTdCa0IsUUFBUTtRQUQ1QixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO09BQ25CLFFBQVEsQ0E4QjVCO0lBQUQsZUFBQztDQTlCRCxBQThCQyxDQTlCcUMsZ0JBQU0sQ0FBQyxNQUFNLEdBOEJsRDtrQkE5Qm9CLFFBQVEiLCJmaWxlIjoiU2NyaXB0cy9jb21wb25lbnRzL2QzQ2FtZXJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVuZ2luZSBmcm9tIFwiZW5naW5lXCI7XHJcbmltcG9ydCBEYXRhQ2VudGVyIGZyb20gXCIuLi9jb21tb25zL2RhdGFDZW50ZXIuanNcIjtcclxuaW1wb3J0IEV2ZW50Q2VudGVyIGZyb20gXCIuLi9jb21tb25zL2V2ZW50Q2VudGVyLmpzXCI7XHJcblxyXG5jb25zdCBQT1NfTElNSVQgPSB7XHJcbiAgeDogWy0yNiwgMjZdLFxyXG4gIC8vIHk6IFstMTAwLCAxMDBdLFxyXG4gIHo6IFstNDQsIDEzXSxcclxufTtcclxuXHJcbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEM0NhbWVyYVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEM0NhbWVyYSBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG5cclxuICBwdWJsaWMgY2FtZXJhID0gbnVsbDtcclxuXHJcbiAgcHVibGljIG9uQXdha2UoKSB7XHJcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMuZW50aXR5LmdldENvbXBvbmVudChlbmdpbmUuQ2FtZXJhKTtcclxuICAgIERhdGFDZW50ZXIuY2FtZXJhQ29tcCA9IHRoaXMuY2FtZXJhO1xyXG4gICAgY29uc29sZS5sb2coXCJvbkF3YWtlIEQzQ2FtZXJhXCIpO1xyXG5cclxuICAgIEV2ZW50Q2VudGVyLm9uKEV2ZW50Q2VudGVyLkFERF9QTEFZRVIsICgpID0+IHtcclxuICAgICAgLy8gdGhpcy5jYW1lcmEudGFyZ2V0VHJhbnNmb3JtID0gRGF0YUNlbnRlci5wbGF5ZXIudHJhbnNmb3JtO1xyXG4gICAgfSk7XHJcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5NT1ZFX1BMQVlFUiwgKG1vdmUpID0+IHtcclxuICAgICAgY29uc3QgcG9zID0gRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICBmb3IgKGNvbnN0IGsgaW4gUE9TX0xJTUlUKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcG9zW2tdICsgbW92ZVtrXSA+PSBQT1NfTElNSVRba11bMF1cclxuICAgICAgICAgICYmXHJcbiAgICAgICAgICBwb3Nba10gKyBtb3ZlW2tdIDw9IFBPU19MSU1JVFtrXVsxXVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5jYW1lcmEuZW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbltrXSArPSBtb3ZlW2tdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhEYXRhQ2VudGVyLnBsYXllckVudGl0eS50cmFuc2Zvcm0ucG9zaXRpb24ueCwgRGF0YUNlbnRlci5wbGF5ZXJFbnRpdHkudHJhbnNmb3JtLnBvc2l0aW9uLnksIERhdGFDZW50ZXIucGxheWVyRW50aXR5LnRyYW5zZm9ybS5wb3NpdGlvbi56KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVXBkYXRlKGR0KSB7XHJcblxyXG4gIH1cclxufVxyXG4iXX0=
