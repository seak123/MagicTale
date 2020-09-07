"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var eventCenter_js_1 = require("../commons/eventCenter.js");
var D2Score = (function (_super) {
    tslib_1.__extends(D2Score, _super);
    function D2Score() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score = 0;
        _this.uilabel = null;
        return _this;
    }
    D2Score.prototype.onAwake = function () {
        var _this = this;
        this.uilabel = this.entity.getComponent(engine_1.default.UILabel);
        this.uilabel.text = "000";
        eventCenter_js_1.default.on(eventCenter_js_1.default.GET_SCORE, function (getScore) {
            _this.score += Number(getScore);
            if (_this.score < 0) {
                _this.score = 0;
            }
            var str = _this.score + "";
            if (_this.score < 10) {
                str = "0" + str;
            }
            if (_this.score < 100) {
                str = "0" + str;
            }
            _this.uilabel.text = str;
        });
    };
    D2Score = tslib_1.__decorate([
        engine_1.default.decorators.serialize("D2Score")
    ], D2Score);
    return D2Score;
}(engine_1.default.Script));
exports.default = D2Score;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHMvY29tcG9uZW50cy9kMlNjb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE0QjtBQUM1Qiw0REFBb0Q7QUFHcEQ7SUFBcUMsbUNBQWE7SUFBbEQ7UUFBQSxxRUF1QkM7UUF0QlEsV0FBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGFBQU8sR0FBRyxJQUFJLENBQUM7O0lBcUJ4QixDQUFDO0lBbkJRLHlCQUFPLEdBQWQ7UUFBQSxpQkFrQkM7UUFqQkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUUxQix3QkFBVyxDQUFDLEVBQUUsQ0FBQyx3QkFBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLFFBQVE7WUFDN0MsS0FBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IsSUFBSSxLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDaEI7WUFDRCxJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUMxQixJQUFJLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFO2dCQUNuQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQzthQUNqQjtZQUNELElBQUksS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUU7Z0JBQ3BCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQ2pCO1lBQ0QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXRCa0IsT0FBTztRQUQzQixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO09BQ2xCLE9BQU8sQ0F1QjNCO0lBQUQsY0FBQztDQXZCRCxBQXVCQyxDQXZCb0MsZ0JBQU0sQ0FBQyxNQUFNLEdBdUJqRDtrQkF2Qm9CLE9BQU8iLCJmaWxlIjoiU2NyaXB0cy9jb21wb25lbnRzL2QyU2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZW5naW5lIGZyb20gXCJlbmdpbmVcIjtcclxuaW1wb3J0IEV2ZW50Q2VudGVyIGZyb20gXCIuLi9jb21tb25zL2V2ZW50Q2VudGVyLmpzXCI7XHJcblxyXG5AZW5naW5lLmRlY29yYXRvcnMuc2VyaWFsaXplKFwiRDJTY29yZVwiKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEMlNjb3JlIGV4dGVuZHMgZW5naW5lLlNjcmlwdCB7XHJcbiAgcHVibGljIHNjb3JlID0gMDtcclxuICBwdWJsaWMgdWlsYWJlbCA9IG51bGw7XHJcblxyXG4gIHB1YmxpYyBvbkF3YWtlKCkge1xyXG4gICAgdGhpcy51aWxhYmVsID0gdGhpcy5lbnRpdHkuZ2V0Q29tcG9uZW50KGVuZ2luZS5VSUxhYmVsKTtcclxuICAgIHRoaXMudWlsYWJlbC50ZXh0ID0gXCIwMDBcIjtcclxuXHJcbiAgICBFdmVudENlbnRlci5vbihFdmVudENlbnRlci5HRVRfU0NPUkUsIChnZXRTY29yZSkgPT4ge1xyXG4gICAgICB0aGlzLnNjb3JlICs9IE51bWJlcihnZXRTY29yZSk7XHJcbiAgICAgIGlmICh0aGlzLnNjb3JlIDwgMCkge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBzdHIgPSB0aGlzLnNjb3JlICsgXCJcIjtcclxuICAgICAgaWYgKHRoaXMuc2NvcmUgPCAxMCkge1xyXG4gICAgICAgIHN0ciA9IFwiMFwiICsgc3RyO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnNjb3JlIDwgMTAwKSB7XHJcbiAgICAgICAgc3RyID0gXCIwXCIgKyBzdHI7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy51aWxhYmVsLnRleHQgPSBzdHI7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
