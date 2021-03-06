"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var D2Shoot = (function (_super) {
    tslib_1.__extends(D2Shoot, _super);
    function D2Shoot(entity) {
        var _this = _super.call(this, entity) || this;
        _this.entity = entity;
        _this.uisprite = null;
        _this.uiInput = null;
        _this.onTouchStart = _this.onTouchStart.bind(_this);
        _this.onTouchEnter = _this.onTouchEnter.bind(_this);
        _this.onTouchEnd = _this.onTouchEnd.bind(_this);
        _this.onTouchLeave = _this.onTouchLeave.bind(_this);
        return _this;
    }
    D2Shoot.prototype.onAwake = function () {
        this.uisprite = this.entity.getComponent(engine_1.default.UISprite);
    };
    D2Shoot.prototype.onEnable = function () {
        this.uiInput = this.getComponent(engine_1.default.TouchInputComponent);
        if (this.uiInput) {
            this.uiInput.onTouchStart.add(this.onTouchStart);
            this.uiInput.onTouchEnter.add(this.onTouchEnter);
            this.uiInput.onTouchEnd.add(this.onTouchEnd);
            this.uiInput.onTouchLeave.add(this.onTouchLeave);
        }
    };
    D2Shoot.prototype.onDisable = function () {
        if (this.uiInput) {
            this.uiInput.onTouchStart.remove(this.onTouchStart);
            this.uiInput.onTouchEnter.remove(this.onTouchEnter);
            this.uiInput.onTouchEnd.remove(this.onTouchEnd);
            this.uiInput.onTouchLeave.remove(this.onTouchLeave);
        }
    };
    D2Shoot.prototype.onTouchStart = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 200;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.START_SHOOT);
    };
    D2Shoot.prototype.onTouchEnter = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 200;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.START_SHOOT);
    };
    D2Shoot.prototype.onTouchEnd = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 255;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.END_SHOOT);
    };
    D2Shoot.prototype.onTouchLeave = function (s, e) {
        var c = this.uisprite.color.clone();
        c.a = 255;
        this.uisprite.color = c;
        eventCenter_js_1.default.emit(eventCenter_js_1.default.END_SHOOT);
    };
    D2Shoot = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D2Shoot")
    ], D2Shoot);
    return D2Shoot;
}(engine_1.default.Script));
exports.default = D2Shoot;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kMlNob290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE0QjtBQUc1Qiw0REFBMkM7QUFHM0M7SUFBcUMsbUNBQWE7SUFJaEQsaUJBQTRCLE1BQWdCO1FBQTVDLFlBQ0Usa0JBQU0sTUFBTSxDQUFDLFNBS2Q7UUFOMkIsWUFBTSxHQUFOLE1BQU0sQ0FBVTtRQUhyQyxjQUFRLEdBQTJCLElBQUksQ0FBQztRQUN4QyxhQUFPLEdBQXNDLElBQUksQ0FBQztRQUl2RCxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ2pELEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDakQsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDOztJQUNuRCxDQUFDO0lBRU0seUJBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQWtCLGdCQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVNLDBCQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQTZCLGdCQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6RixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFTSwyQkFBUyxHQUFoQjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUVNLDhCQUFZLEdBQW5CLFVBQW9CLENBQTZCLEVBQUUsQ0FBa0I7UUFFbkUsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDeEIsd0JBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sOEJBQVksR0FBbkIsVUFBb0IsQ0FBNkIsRUFBRSxDQUFrQjtRQUNuRSxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN4Qix3QkFBRSxDQUFDLElBQUksQ0FBQyx3QkFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSw0QkFBVSxHQUFqQixVQUFrQixDQUE2QixFQUFFLENBQWtCO1FBRWpFLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLHdCQUFFLENBQUMsSUFBSSxDQUFDLHdCQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLDhCQUFZLEdBQW5CLFVBQW9CLENBQTZCLEVBQUUsQ0FBa0I7UUFDbkUsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDeEIsd0JBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBL0RrQixPQUFPO1FBRDNCLGdCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7T0FDbEIsT0FBTyxDQWdFM0I7SUFBRCxjQUFDO0NBaEVELEFBZ0VDLENBaEVvQyxnQkFBTSxDQUFDLE1BQU0sR0FnRWpEO2tCQWhFb0IsT0FBTyIsImZpbGUiOiJTY3JpcHRzL2NvbXBvbmVudHMvZDJTaG9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xyXG5kZWNsYXJlIHR5cGUgVG91Y2hJbnB1dEV2ZW50ID0gaW1wb3J0KFwiZW5naW5lL2lucHV0L3RvdWNoXCIpLlRvdWNoSW5wdXRFdmVudDtcclxuZGVjbGFyZSB0eXBlIEVudGl0eTJEID0gaW1wb3J0KFwiZW5naW5lL3NjZW5lL3NjZW5lXCIpLkVudGl0eTJEO1xyXG5pbXBvcnQgRUMgZnJvbSBcIi4uL2NvbW1vbnMvZXZlbnRDZW50ZXIuanNcIjtcclxuXHJcbkBlbmdpbmUuZGVjb3JhdG9ycy5zZXJpYWxpemUoXCJEMlNob290XCIpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEQyU2hvb3QgZXh0ZW5kcyBlbmdpbmUuU2NyaXB0IHtcclxuICBwdWJsaWMgdWlzcHJpdGU6IGVuZ2luZS5VSVNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyB1aUlucHV0OiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZW50aXR5OiBFbnRpdHkyRCkge1xyXG4gICAgc3VwZXIoZW50aXR5KTtcclxuICAgIHRoaXMub25Ub3VjaFN0YXJ0ID0gdGhpcy5vblRvdWNoU3RhcnQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Ub3VjaEVudGVyID0gdGhpcy5vblRvdWNoRW50ZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMub25Ub3VjaEVuZCA9IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5vblRvdWNoTGVhdmUgPSB0aGlzLm9uVG91Y2hMZWF2ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQXdha2UoKSB7XHJcbiAgICB0aGlzLnVpc3ByaXRlID0gdGhpcy5lbnRpdHkuZ2V0Q29tcG9uZW50PGVuZ2luZS5VSVNwcml0ZT4oZW5naW5lLlVJU3ByaXRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudWlJbnB1dCA9IHRoaXMuZ2V0Q29tcG9uZW50PGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50PihlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCk7XHJcbiAgICBpZiAodGhpcy51aUlucHV0KSB7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoU3RhcnQuYWRkKHRoaXMub25Ub3VjaFN0YXJ0KTtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hFbnRlci5hZGQodGhpcy5vblRvdWNoRW50ZXIpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVuZC5hZGQodGhpcy5vblRvdWNoRW5kKTtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hMZWF2ZS5hZGQodGhpcy5vblRvdWNoTGVhdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnVpSW5wdXQpIHtcclxuICAgICAgdGhpcy51aUlucHV0Lm9uVG91Y2hTdGFydC5yZW1vdmUodGhpcy5vblRvdWNoU3RhcnQpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaEVudGVyLnJlbW92ZSh0aGlzLm9uVG91Y2hFbnRlcik7XHJcbiAgICAgIHRoaXMudWlJbnB1dC5vblRvdWNoRW5kLnJlbW92ZSh0aGlzLm9uVG91Y2hFbmQpO1xyXG4gICAgICB0aGlzLnVpSW5wdXQub25Ub3VjaExlYXZlLnJlbW92ZSh0aGlzLm9uVG91Y2hMZWF2ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Ub3VjaFN0YXJ0KHM6IGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50LCBlOiBUb3VjaElucHV0RXZlbnQpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvblRvdWNoU3RhcnQgRDJTaG9vdCcpO1xyXG4gICAgY29uc3QgYyA9IHRoaXMudWlzcHJpdGUuY29sb3IuY2xvbmUoKTtcclxuICAgIGMuYSA9IDIwMDtcclxuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xyXG4gICAgRUMuZW1pdChFQy5TVEFSVF9TSE9PVCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Ub3VjaEVudGVyKHM6IGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50LCBlOiBUb3VjaElucHV0RXZlbnQpIHtcclxuICAgIGNvbnN0IGMgPSB0aGlzLnVpc3ByaXRlLmNvbG9yLmNsb25lKCk7XHJcbiAgICBjLmEgPSAyMDA7XHJcbiAgICB0aGlzLnVpc3ByaXRlLmNvbG9yID0gYztcclxuICAgIEVDLmVtaXQoRUMuU1RBUlRfU0hPT1QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVG91Y2hFbmQoczogZW5naW5lLlRvdWNoSW5wdXRDb21wb25lbnQsIGU6IFRvdWNoSW5wdXRFdmVudCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ29uVG91Y2hFbmQgRDJTaG9vdCcpO1xyXG4gICAgY29uc3QgYyA9IHRoaXMudWlzcHJpdGUuY29sb3IuY2xvbmUoKTtcclxuICAgIGMuYSA9IDI1NTtcclxuICAgIHRoaXMudWlzcHJpdGUuY29sb3IgPSBjO1xyXG4gICAgRUMuZW1pdChFQy5FTkRfU0hPT1QpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVG91Y2hMZWF2ZShzOiBlbmdpbmUuVG91Y2hJbnB1dENvbXBvbmVudCwgZTogVG91Y2hJbnB1dEV2ZW50KSB7XHJcbiAgICBjb25zdCBjID0gdGhpcy51aXNwcml0ZS5jb2xvci5jbG9uZSgpO1xyXG4gICAgYy5hID0gMjU1O1xyXG4gICAgdGhpcy51aXNwcml0ZS5jb2xvciA9IGM7XHJcbiAgICBFQy5lbWl0KEVDLkVORF9TSE9PVCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
