"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventEmitter = require("eventemitter3");
var EventEmitterCenter = (function (_super) {
    tslib_1.__extends(EventEmitterCenter, _super);
    function EventEmitterCenter() {
        var _this = _super.call(this) || this;
        _this.TOUCH_MOVE = 'TOUCH_MOVE';
        _this.START_SHOOT = 'START_SHOOT';
        _this.END_SHOOT = 'END_SHOOT';
        _this.ADD_PLAYER = 'ADD_PLAYER';
        _this.ADD_ENEMY = 'ADD_ENEMY';
        _this.MOVE_PLAYER = 'MOVE_PLAYER';
        _this.HURT_PLAYER = 'HURT_PLAYER';
        _this.GET_SCORE = 'GET_SCORE';
        console.log('ee');
        return _this;
    }
    return EventEmitterCenter;
}(EventEmitter));
exports.EventCenter = new EventEmitterCenter();
exports.default = exports.EventCenter;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tbW9ucy9ldmVudENlbnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBOEM7QUFFOUM7SUFBaUMsOENBQVk7SUFXM0M7UUFBQSxZQUNFLGlCQUFPLFNBRVI7UUFiTSxnQkFBVSxHQUFHLFlBQVksQ0FBQztRQUMxQixpQkFBVyxHQUFHLGFBQWEsQ0FBQztRQUM1QixlQUFTLEdBQUcsV0FBVyxDQUFDO1FBRXhCLGdCQUFVLEdBQUcsWUFBWSxDQUFDO1FBQzFCLGVBQVMsR0FBRyxXQUFXLENBQUM7UUFDeEIsaUJBQVcsR0FBRyxhQUFhLENBQUM7UUFDNUIsaUJBQVcsR0FBRyxhQUFhLENBQUM7UUFDNUIsZUFBUyxHQUFHLFdBQVcsQ0FBQztRQUk3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUNwQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQWZBLEFBZUMsQ0FmZ0MsWUFBWSxHQWU1QztBQUVZLFFBQUEsV0FBVyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztBQUNwRCxrQkFBZSxtQkFBVyxDQUFDIiwiZmlsZSI6IlNjcmlwdHMvY29tbW9ucy9ldmVudENlbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tICdldmVudGVtaXR0ZXIzJztcclxuXHJcbmNsYXNzIEV2ZW50RW1pdHRlckNlbnRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgcHVibGljIFRPVUNIX01PVkUgPSAnVE9VQ0hfTU9WRSc7XHJcbiAgcHVibGljIFNUQVJUX1NIT09UID0gJ1NUQVJUX1NIT09UJztcclxuICBwdWJsaWMgRU5EX1NIT09UID0gJ0VORF9TSE9PVCc7XHJcbiAgXHJcbiAgcHVibGljIEFERF9QTEFZRVIgPSAnQUREX1BMQVlFUic7XHJcbiAgcHVibGljIEFERF9FTkVNWSA9ICdBRERfRU5FTVknO1xyXG4gIHB1YmxpYyBNT1ZFX1BMQVlFUiA9ICdNT1ZFX1BMQVlFUic7XHJcbiAgcHVibGljIEhVUlRfUExBWUVSID0gJ0hVUlRfUExBWUVSJztcclxuICBwdWJsaWMgR0VUX1NDT1JFID0gJ0dFVF9TQ09SRSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGNvbnNvbGUubG9nKCdlZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEV2ZW50Q2VudGVyID0gbmV3IEV2ZW50RW1pdHRlckNlbnRlcigpO1xyXG5leHBvcnQgZGVmYXVsdCBFdmVudENlbnRlcjsiXX0=
