"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var _window = window;
exports.E = engine_1.default;
exports.Loader = exports.E.loader;
exports.TouchManager = engine_1.default.game.rootUICamera.touchManager;
var Ett = (function (_super) {
    tslib_1.__extends(Ett, _super);
    function Ett() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Ett;
}(engine_1.default.Entity));
exports.Ett = Ett;
var Prefab = (function (_super) {
    tslib_1.__extends(Prefab, _super);
    function Prefab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Prefab;
}(engine_1.default.Prefab));
exports.Prefab = Prefab;
var v2 = (function (_super) {
    tslib_1.__extends(v2, _super);
    function v2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    v2.UP = v2.createFromNumber(0, 1);
    v2.DOWN = v2.createFromNumber(0, -1);
    v2.LEFT = v2.createFromNumber(-1, 0);
    v2.RIGHT = v2.createFromNumber(1, 0);
    return v2;
}(engine_1.default.Vector2));
exports.v2 = v2;
var v3 = (function (_super) {
    tslib_1.__extends(v3, _super);
    function v3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return v3;
}(engine_1.default.Vector3));
exports.v3 = v3;
var v4 = (function (_super) {
    tslib_1.__extends(v4, _super);
    function v4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return v4;
}(engine_1.default.Vector4));
exports.v4 = v4;
var Point = (function (_super) {
    tslib_1.__extends(Point, _super);
    function Point() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Point;
}(v2));
exports.Point = Point;
var Quat = (function (_super) {
    tslib_1.__extends(Quat, _super);
    function Quat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Quat;
}(engine_1.default.Quaternion));
exports.Quat = Quat;
var M4 = (function (_super) {
    tslib_1.__extends(M4, _super);
    function M4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return M4;
}(engine_1.default.Matrix4));
exports.M4 = M4;
var SP3D = (function (_super) {
    tslib_1.__extends(SP3D, _super);
    function SP3D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SP3D;
}(engine_1.default.Entity));
exports.SP3D = SP3D;
var Tf2D = (function (_super) {
    tslib_1.__extends(Tf2D, _super);
    function Tf2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tf2D;
}(engine_1.default.Transform2D));
exports.Tf2D = Tf2D;
var Tf3D = (function (_super) {
    tslib_1.__extends(Tf3D, _super);
    function Tf3D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tf3D;
}(engine_1.default.Transform3D));
exports.Tf3D = Tf3D;
var Mask = (function (_super) {
    tslib_1.__extends(Mask, _super);
    function Mask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Mask;
}(engine_1.default.UIMask));
exports.Mask = Mask;
var Button = (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Button;
}(engine_1.default.UIButton));
exports.Button = Button;
var Toggle = (function (_super) {
    tslib_1.__extends(Toggle, _super);
    function Toggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Toggle;
}(engine_1.default.UIToggle));
exports.Toggle = Toggle;
var ToggleGroup = (function (_super) {
    tslib_1.__extends(ToggleGroup, _super);
    function ToggleGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ToggleGroup;
}(engine_1.default.UIToggleGroup));
exports.ToggleGroup = ToggleGroup;
var Input = (function (_super) {
    tslib_1.__extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Input;
}(engine_1.default.UITextInput));
exports.Input = Input;
var RichText = (function (_super) {
    tslib_1.__extends(RichText, _super);
    function RichText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RichText;
}(engine_1.default.UIRichText));
exports.RichText = RichText;
var Game = (function (_super) {
    tslib_1.__extends(Game, _super);
    function Game() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Game;
}(engine_1.default.Game));
exports.Game = Game;
var MeshRenderer = (function (_super) {
    tslib_1.__extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MeshRenderer;
}(engine_1.default.MeshRenderer));
exports.MeshRenderer = MeshRenderer;
var SkinnedMeshRenderer = (function (_super) {
    tslib_1.__extends(SkinnedMeshRenderer, _super);
    function SkinnedMeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SkinnedMeshRenderer;
}(engine_1.default.SkinnedMeshRenderer));
exports.SkinnedMeshRenderer = SkinnedMeshRenderer;
var LineRenderer = (function (_super) {
    tslib_1.__extends(LineRenderer, _super);
    function LineRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LineRenderer;
}(engine_1.default.LineRenderer));
exports.LineRenderer = LineRenderer;
var Particle = (function (_super) {
    tslib_1.__extends(Particle, _super);
    function Particle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Particle;
}(engine_1.default.Particle));
exports.Particle = Particle;
var SpFrame = (function (_super) {
    tslib_1.__extends(SpFrame, _super);
    function SpFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SpFrame;
}(engine_1.default.SpriteFrame));
exports.SpFrame = SpFrame;
var Tex2D = (function (_super) {
    tslib_1.__extends(Tex2D, _super);
    function Tex2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tex2D;
}(engine_1.default.Texture2D));
exports.Tex2D = Tex2D;
var Rect = (function (_super) {
    tslib_1.__extends(Rect, _super);
    function Rect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Rect;
}(engine_1.default.Rect));
exports.Rect = Rect;
var Animator = (function (_super) {
    tslib_1.__extends(Animator, _super);
    function Animator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Animator;
}(engine_1.default.Animator));
exports.Animator = Animator;
var AnimationClip = (function (_super) {
    tslib_1.__extends(AnimationClip, _super);
    function AnimationClip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AnimationClip;
}(engine_1.default.AnimationClip));
exports.AnimationClip = AnimationClip;
var Animation = (function (_super) {
    tslib_1.__extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Animation;
}(engine_1.default.Animation));
exports.Animation = Animation;
var AnimatorController = (function (_super) {
    tslib_1.__extends(AnimatorController, _super);
    function AnimatorController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AnimatorController;
}(engine_1.default.AnimatorController));
exports.AnimatorController = AnimatorController;
var Material = (function (_super) {
    tslib_1.__extends(Material, _super);
    function Material() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Material;
}(engine_1.default.Material));
exports.Material = Material;
var Effect = (function (_super) {
    tslib_1.__extends(Effect, _super);
    function Effect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Effect;
}(engine_1.default.Effect));
exports.Effect = Effect;
var Anchor = (function (_super) {
    tslib_1.__extends(Anchor, _super);
    function Anchor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Anchor;
}(engine_1.default.UIAnchor));
exports.Anchor = Anchor;
var PostProcessComponent = (function (_super) {
    tslib_1.__extends(PostProcessComponent, _super);
    function PostProcessComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PostProcessComponent;
}(engine_1.default.PostProcessComponent));
exports.PostProcessComponent = PostProcessComponent;
var Color = (function (_super) {
    tslib_1.__extends(Color, _super);
    function Color() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Color.RED = new Color(255, 0, 0, 255);
    Color.GREEN = new Color(0, 255, 0, 255);
    Color.BLUE = new Color(0, 0, 255, 255);
    Color.YELLOW = new Color(255, 235, 4, 255);
    Color.CYAN = new Color(0, 255, 255, 255);
    Color.MAGENTA = new Color(255, 0, 255, 255);
    Color.PURPLE = new Color(255, 192, 203, 255);
    Color.ORANGE = new Color(255, 97, 0, 255);
    Color.GRAY = new Color(128, 128, 128, 255);
    Color.GREY = new Color(128, 128, 128, 255);
    Color.CLEAR = new Color(0, 0, 0, 0);
    Color.QUALITY_COLOR = [
        Color.WHITE,
        new Color(19, 232, 50, 255),
        new Color(15, 174, 255, 255),
        new Color(204, 59, 239, 255),
        new Color(255, 129, 0, 255),
        new Color(255, 255, 2, 255)
    ];
    return Color;
}(engine_1.default.Color));
exports.Color = Color;
var UISpriteFlipType;
(function (UISpriteFlipType) {
    UISpriteFlipType[UISpriteFlipType["Nothing"] = 0] = "Nothing";
    UISpriteFlipType[UISpriteFlipType["Horizontally"] = 1] = "Horizontally";
    UISpriteFlipType[UISpriteFlipType["Vertically"] = 2] = "Vertically";
    UISpriteFlipType[UISpriteFlipType["Both"] = 3] = "Both";
})(UISpriteFlipType = exports.UISpriteFlipType || (exports.UISpriteFlipType = {}));
var Script = (function (_super) {
    tslib_1.__extends(Script, _super);
    function Script() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Script.prototype, "owner", {
        get: function () {
            return this.entity;
        },
        enumerable: true,
        configurable: true
    });
    return Script;
}(engine_1.default.Script));
exports.Script = Script;
var Wgt = (function (_super) {
    tslib_1.__extends(Wgt, _super);
    function Wgt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Wgt;
}(engine_1.default.UIWidget));
exports.Wgt = Wgt;
var Sp = (function (_super) {
    tslib_1.__extends(Sp, _super);
    function Sp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sp;
}(engine_1.default.UISprite));
exports.Sp = Sp;
var Font = (function (_super) {
    tslib_1.__extends(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Font;
}(engine_1.default.Font));
exports.Font = Font;
var Label = (function (_super) {
    tslib_1.__extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Label;
}(engine_1.default.UILabel));
exports.Label = Label;
var ScrollView = (function (_super) {
    tslib_1.__extends(ScrollView, _super);
    function ScrollView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ScrollView;
}(engine_1.default.UIScrollView));
exports.ScrollView = ScrollView;
var Grid = (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Grid;
}(engine_1.default.UIGrid));
exports.Grid = Grid;
var RenderTexture = (function (_super) {
    tslib_1.__extends(RenderTexture, _super);
    function RenderTexture() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RenderTexture;
}(engine_1.default.RenderTexture));
exports.RenderTexture = RenderTexture;
var Graphic = (function (_super) {
    tslib_1.__extends(Graphic, _super);
    function Graphic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Graphic;
}(engine_1.default.UIGraphic));
exports.Graphic = Graphic;
var Cam = (function (_super) {
    tslib_1.__extends(Cam, _super);
    function Cam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cam;
}(engine_1.default.Camera));
exports.Cam = Cam;
var Dl = (function (_super) {
    tslib_1.__extends(Dl, _super);
    function Dl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dl;
}(engine_1.default.DirectionalLight));
exports.Dl = Dl;
var Touchable = (function (_super) {
    tslib_1.__extends(Touchable, _super);
    function Touchable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Touchable;
}(engine_1.default.Touchable));
exports.Touchable = Touchable;
var TouchInputComponent = (function (_super) {
    tslib_1.__extends(TouchInputComponent, _super);
    function TouchInputComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TouchInputComponent;
}(engine_1.default.TouchInputComponent));
exports.TouchInputComponent = TouchInputComponent;
var KeyboardInputComponent = (function (_super) {
    tslib_1.__extends(KeyboardInputComponent, _super);
    function KeyboardInputComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return KeyboardInputComponent;
}(engine_1.default.KeyboardInputComponent));
exports.KeyboardInputComponent = KeyboardInputComponent;
var RayCaster = (function (_super) {
    tslib_1.__extends(RayCaster, _super);
    function RayCaster() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RayCaster;
}(engine_1.default.Raycaster));
exports.RayCaster = RayCaster;
var ColorUtils = (function () {
    function ColorUtils() {
    }
    ColorUtils.rgbToHex = function (r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    ColorUtils.HexToColor = function (hex) {
        var hexStr = hex.slice(1);
        var red = hexStr.slice(0, 2);
        var green = hexStr.slice(2, 4);
        var blue = hexStr.slice(4, 6);
        var alpha = "FF";
        if (hexStr.length > 6) {
            alpha = hexStr.slice(6, 8);
        }
        var hexNum = parseInt(alpha + blue + green + red, 16);
        return engine_1.default.Color.fromHex(hexNum);
    };
    ColorUtils.Grayscale = function (color) {
        if (color) {
            return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
        }
        return 0;
    };
    return ColorUtils;
}());
exports.ColorUtils = ColorUtils;
function ScreenPosToGlob(screenPos, createNewPoint) {
    var stageX = screenPos.x;
    var stageY = screenPos.y;
    var result = screenPos;
    if (createNewPoint) {
        result = new Point();
    }
    result.x = stageX;
    result.y = stageY;
    return result;
}
exports.ScreenPosToGlob = ScreenPosToGlob;
function getComponentsIncludeChild(node, clas) {
    if (!node)
        return;
    var result = [];
    var components = node.getComponents(clas);
    if (components) {
        components.forEach(function (component) {
            result.push(component);
        });
    }
    if (node.transform && node.transform.childrenCount > 0) {
        node.transform.travelChild(function (child) {
            if (child !== node.transform) {
                var childComponents = getComponentsIncludeChild(child.entity, clas);
                if (childComponents && childComponents.length) {
                    childComponents.forEach(function (component) {
                        result.push(component);
                    });
                }
            }
        });
    }
    return result;
}
exports.getComponentsIncludeChild = getComponentsIncludeChild;
function getComponentsIncludeChild2D(node, clas) {
    var result = [];
    if (!node)
        return result;
    var components = node.getComponents(clas);
    if (components) {
        components.forEach(function (component) {
            result.push(component);
        });
    }
    if (node.transform2D && node.transform2D.childrenCount > 0) {
        node.transform2D.travelChild(function (child) {
            if (child !== node.transform2D) {
                var childComponents = getComponentsIncludeChild2D(child.entity, clas);
                if (childComponents && childComponents.length) {
                    childComponents.forEach(function (component) {
                        result.push(component);
                    });
                }
            }
        });
    }
    return result;
}
exports.getComponentsIncludeChild2D = getComponentsIncludeChild2D;
function getComponentInParent(node, clas) {
    var component = node.getComponent(clas);
    if (component) {
        return component;
    }
    else {
        var parent = node.transform.parent;
        if (parent) {
            return getComponentInParent(parent.entity, clas);
        }
        else {
            return null;
        }
    }
}
exports.getComponentInParent = getComponentInParent;
var LoopIndicator = (function () {
    function LoopIndicator() {
    }
    return LoopIndicator;
}());
exports.LoopIndicator = LoopIndicator;
function StartLoop(caller, method) {
    var localCaller = caller;
    var indicator = new LoopIndicator();
    var loopFunc = function () {
        var inkey = window.requestAnimationFrame(loopFunc);
        indicator.t = inkey;
        method.apply(localCaller);
    };
    var outKey = window.requestAnimationFrame(loopFunc);
    indicator.t = outKey;
    return indicator;
}
exports.StartLoop = StartLoop;
function EndLoop(loopIndicator) {
    if (loopIndicator) {
        window.cancelAnimationFrame(loopIndicator.t);
        loopIndicator = null;
    }
}
exports.EndLoop = EndLoop;
var BaseUrl;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgc3BhY2VkLWNvbW1lbnQgKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10cmlwbGUtc2xhc2gtcmVmZXJlbmNlXHJcbmltcG9ydCBlbmdpbmUgZnJvbSBcImVuZ2luZVwiO1xyXG5cclxuY29uc3QgX3dpbmRvdzogYW55ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGNvbnN0IEUgPSBlbmdpbmU7XHJcbmV4cG9ydCBjb25zdCBMb2FkZXIgPSBFLmxvYWRlcjtcclxuLy8gZXhwb3J0IGNvbnN0IGxvYWRlciA9IEVuZ2luZW5naW5lLmVuZ2luZUluc3RhbmNlbmdpbmUubG9hZGVyO1xyXG5leHBvcnQgY29uc3QgVG91Y2hNYW5hZ2VyID0gZW5naW5lLmdhbWUucm9vdFVJQ2FtZXJhLnRvdWNoTWFuYWdlcjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdHQgZXh0ZW5kcyBlbmdpbmUuRW50aXR5IHsgfVxyXG5leHBvcnQgY2xhc3MgUHJlZmFiIGV4dGVuZHMgZW5naW5lLlByZWZhYiB7IH1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jbGFzcy1uYW1lLWNhc2luZ1xyXG5leHBvcnQgY2xhc3MgdjIgZXh0ZW5kcyBlbmdpbmUuVmVjdG9yMiB7XHJcbiAgICAvLyBzdGF0aWMgcmVhZG9ubHkgT05FID0gdjIuY3JlYXRlRnJvbU51bWJlcigxLCAxKTtcclxuICAgIHN0YXRpYyByZWFkb25seSBVUCA9IHYyLmNyZWF0ZUZyb21OdW1iZXIoMCwgMSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRE9XTiA9IHYyLmNyZWF0ZUZyb21OdW1iZXIoMCwgLTEpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IExFRlQgPSB2Mi5jcmVhdGVGcm9tTnVtYmVyKC0xLCAwKTtcclxuICAgIHN0YXRpYyByZWFkb25seSBSSUdIVCA9IHYyLmNyZWF0ZUZyb21OdW1iZXIoMSwgMCk7XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jbGFzcy1uYW1lLWNhc2luZ1xyXG5leHBvcnQgY2xhc3MgdjMgZXh0ZW5kcyBlbmdpbmUuVmVjdG9yMyB7XHJcbiAgICAvKlxyXG4gICAgc3RhdGljIHJlYWRvbmx5IE9ORSA9IHYzLmNyZWF0ZUZyb21OdW1iZXIoMSwgMSwgMSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRk9SV0FSRCA9IHYzLmNyZWF0ZUZyb21OdW1iZXIoMCwgMCwgLTEpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEJBQ0sgPSB2My5jcmVhdGVGcm9tTnVtYmVyKDAsIDAsIDEpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFVQID0gdjMuY3JlYXRlRnJvbU51bWJlcigwLCAxLCAwKTtcclxuICAgIHN0YXRpYyByZWFkb25seSBET1dOID0gdjMuY3JlYXRlRnJvbU51bWJlcigwLCAtMSwgMCk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgTEVGVCA9IHYzLmNyZWF0ZUZyb21OdW1iZXIoLTEsIDAsIDApO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJJR0hUID0gdjMuY3JlYXRlRnJvbU51bWJlcigxLCAwLCAwKTtcclxuICAgICovXHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jbGFzcy1uYW1lLWNhc2luZ1xyXG5leHBvcnQgY2xhc3MgdjQgZXh0ZW5kcyBlbmdpbmUuVmVjdG9yNCB7XHJcbiAgICAvKlxyXG4gICAgc3RhdGljIHJlYWRvbmx5IE9ORSA9IHY0LmNyZWF0ZUZyb21OdW1iZXIoMSwgMSwgMSwgMSk7XHJcbiAgICAqL1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBEZWxlZ2F0ZUhhbmRsZXI8UywgRT4gPSAoc2VuZGVyOiBTLCBldmVudEFyZ3M6IEUpID0+IGFueTtcclxuZXhwb3J0IGludGVyZmFjZSBJS2V5Ym9hcmRFdmVudFJlcyB7IHZhbHVlOiBzdHJpbmc7IH1cclxuXHJcbmV4cG9ydCB0eXBlIENvbXBvbmVudCA9IGVuZ2luZS5Db21wb25lbnQ7XHJcbmV4cG9ydCBjbGFzcyBQb2ludCBleHRlbmRzIHYyIHsgfVxyXG5leHBvcnQgY2xhc3MgUXVhdCBleHRlbmRzIGVuZ2luZS5RdWF0ZXJuaW9uIHsgfVxyXG5leHBvcnQgY2xhc3MgTTQgZXh0ZW5kcyBlbmdpbmUuTWF0cml4NCB7IH1cclxuZXhwb3J0IGNsYXNzIFNQM0QgZXh0ZW5kcyBlbmdpbmUuRW50aXR5IHsgfVxyXG4vLyBleHBvcnQgY2xhc3MgVGIgZXh0ZW5kcyBlbmdpbmUuVHJhbnNmb3JtQmFzZSB7IH1cclxuZXhwb3J0IGNsYXNzIFRmMkQgZXh0ZW5kcyBlbmdpbmUuVHJhbnNmb3JtMkQgeyB9XHJcbmV4cG9ydCBjbGFzcyBUZjNEIGV4dGVuZHMgZW5naW5lLlRyYW5zZm9ybTNEIHsgfVxyXG5leHBvcnQgY2xhc3MgTWFzayBleHRlbmRzIGVuZ2luZS5VSU1hc2sgeyB9XHJcbmV4cG9ydCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBlbmdpbmUuVUlCdXR0b24geyB9XHJcbmV4cG9ydCBjbGFzcyBUb2dnbGUgZXh0ZW5kcyBlbmdpbmUuVUlUb2dnbGUgeyB9XHJcbmV4cG9ydCBjbGFzcyBUb2dnbGVHcm91cCBleHRlbmRzIGVuZ2luZS5VSVRvZ2dsZUdyb3VwIHsgfVxyXG5leHBvcnQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBlbmdpbmUuVUlUZXh0SW5wdXQgeyB9XHJcbmV4cG9ydCBjbGFzcyBSaWNoVGV4dCBleHRlbmRzIGVuZ2luZS5VSVJpY2hUZXh0IHsgfVxyXG5leHBvcnQgY2xhc3MgR2FtZSBleHRlbmRzIGVuZ2luZS5HYW1lIHsgfVxyXG5leHBvcnQgY2xhc3MgTWVzaFJlbmRlcmVyIGV4dGVuZHMgZW5naW5lLk1lc2hSZW5kZXJlciB7IH1cclxuZXhwb3J0IGNsYXNzIFNraW5uZWRNZXNoUmVuZGVyZXIgZXh0ZW5kcyBlbmdpbmUuU2tpbm5lZE1lc2hSZW5kZXJlciB7IH1cclxuZXhwb3J0IGNsYXNzIExpbmVSZW5kZXJlciBleHRlbmRzIGVuZ2luZS5MaW5lUmVuZGVyZXIgeyB9XHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWNsZSBleHRlbmRzIGVuZ2luZS5QYXJ0aWNsZSB7IH1cclxuZXhwb3J0IGNsYXNzIFNwRnJhbWUgZXh0ZW5kcyBlbmdpbmUuU3ByaXRlRnJhbWUgeyB9XHJcbmV4cG9ydCBjbGFzcyBUZXgyRCBleHRlbmRzIGVuZ2luZS5UZXh0dXJlMkQgeyB9XHJcbmV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgZW5naW5lLlJlY3QgeyB9XHJcbmV4cG9ydCBjbGFzcyBBbmltYXRvciBleHRlbmRzIGVuZ2luZS5BbmltYXRvciB7IH1cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkNsaXAgZXh0ZW5kcyBlbmdpbmUuQW5pbWF0aW9uQ2xpcCB7IH1cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbiBleHRlbmRzIGVuZ2luZS5BbmltYXRpb24ge31cclxuZXhwb3J0IGNsYXNzIEFuaW1hdG9yQ29udHJvbGxlciBleHRlbmRzIGVuZ2luZS5BbmltYXRvckNvbnRyb2xsZXIgeyB9XHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbCBleHRlbmRzIGVuZ2luZS5NYXRlcmlhbCB7IH1cclxuZXhwb3J0IGNsYXNzIEVmZmVjdCBleHRlbmRzIGVuZ2luZS5FZmZlY3QgeyB9XHJcbmV4cG9ydCBjbGFzcyBBbmNob3IgZXh0ZW5kcyBlbmdpbmUuVUlBbmNob3IgeyB9XHJcbmV4cG9ydCBjbGFzcyBQb3N0UHJvY2Vzc0NvbXBvbmVudCBleHRlbmRzIGVuZ2luZS5Qb3N0UHJvY2Vzc0NvbXBvbmVudCB7IH1cclxuLy8gZXhwb3J0IGNsYXNzIFNjZW5lIGV4dGVuZHMgZW5naW5lLlNjZW5lIHt9XHJcbmV4cG9ydCBjbGFzcyBDb2xvciBleHRlbmRzIGVuZ2luZS5Db2xvciB7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUkVEID0gbmV3IENvbG9yKDI1NSwgMCwgMCwgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBHUkVFTjogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMjU1LCAwLCAyNTUpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEJMVUU6IENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDI1NSwgMjU1KTtcclxuICAgIC8vc3RhdGljIHJlYWRvbmx5IFdISVRFOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgLy9zdGF0aWMgcmVhZG9ubHkgQkxBQ0s6IENvbG9yID0gbmV3IENvbG9yKDAsIDAsIDAsIDI1NSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgWUVMTE9XOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDIzNSwgNCwgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBDWUFOOiBDb2xvciA9IG5ldyBDb2xvcigwLCAyNTUsIDI1NSwgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBNQUdFTlRBOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDAsIDI1NSwgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBQVVJQTEU6IENvbG9yID0gbmV3IENvbG9yKDI1NSwgMTkyLCAyMDMsIDI1NSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgT1JBTkdFOiBDb2xvciA9IG5ldyBDb2xvcigyNTUsIDk3LCAwLCAyNTUpO1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IEdSQVk6IENvbG9yID0gbmV3IENvbG9yKDEyOCwgMTI4LCAxMjgsIDI1NSk7XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgR1JFWTogQ29sb3IgPSBuZXcgQ29sb3IoMTI4LCAxMjgsIDEyOCwgMjU1KTtcclxuICAgIHN0YXRpYyByZWFkb25seSBDTEVBUjogQ29sb3IgPSBuZXcgQ29sb3IoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFFVQUxJVFlfQ09MT1I6IENvbG9yW10gPVxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgQ29sb3IuV0hJVEUsXHJcbiAgICAgICAgICAgIG5ldyBDb2xvcigxOSwgMjMyLCA1MCwgMjU1KSxcclxuICAgICAgICAgICAgbmV3IENvbG9yKDE1LCAxNzQsIDI1NSwgMjU1KSxcclxuICAgICAgICAgICAgbmV3IENvbG9yKDIwNCwgNTksIDIzOSwgMjU1KSxcclxuICAgICAgICAgICAgbmV3IENvbG9yKDI1NSwgMTI5LCAwLCAyNTUpLFxyXG4gICAgICAgICAgICBuZXcgQ29sb3IoMjU1LCAyNTUsIDIsIDI1NSlcclxuICAgICAgICBdO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBVSVNwcml0ZUZsaXBUeXBlIHtcclxuICAgIE5vdGhpbmcsXHJcbiAgICBIb3Jpem9udGFsbHksXHJcbiAgICBWZXJ0aWNhbGx5LFxyXG4gICAgQm90aCxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmlwdCBleHRlbmRzIGVuZ2luZS5TY3JpcHQge1xyXG4gICAgcHVibGljIGdldCBvd25lcigpOiBFdHQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgV2d0IGV4dGVuZHMgZW5naW5lLlVJV2lkZ2V0IHsgfVxyXG5leHBvcnQgY2xhc3MgU3AgZXh0ZW5kcyBlbmdpbmUuVUlTcHJpdGUge1xyXG4gICAgcHVibGljIGF0bGFzTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNwcml0ZU5hbWU6IHN0cmluZztcclxufVxyXG5leHBvcnQgY2xhc3MgRm9udCBleHRlbmRzIGVuZ2luZS5Gb250IHt9XHJcbmV4cG9ydCBjbGFzcyBMYWJlbCBleHRlbmRzIGVuZ2luZS5VSUxhYmVsIHsgfVxyXG5leHBvcnQgY2xhc3MgU2Nyb2xsVmlldyBleHRlbmRzIGVuZ2luZS5VSVNjcm9sbFZpZXcgeyB9XHJcbmV4cG9ydCBjbGFzcyBHcmlkIGV4dGVuZHMgZW5naW5lLlVJR3JpZCB7IH1cclxuZXhwb3J0IGNsYXNzIFJlbmRlclRleHR1cmUgZXh0ZW5kcyBlbmdpbmUuUmVuZGVyVGV4dHVyZSB7IH1cclxuZXhwb3J0IGNsYXNzIEdyYXBoaWMgZXh0ZW5kcyBlbmdpbmUuVUlHcmFwaGljIHsgfVxyXG5cclxuLy8gZXhwb3J0IGNsYXNzIENhbnZhcyBleHRlbmRzIGVuZ2luZS5VSUNhbnZhcyB7fVxyXG5leHBvcnQgY2xhc3MgQ2FtIGV4dGVuZHMgZW5naW5lLkNhbWVyYSB7IH1cclxuZXhwb3J0IGNsYXNzIERsIGV4dGVuZHMgZW5naW5lLkRpcmVjdGlvbmFsTGlnaHQgeyB9XHJcbmV4cG9ydCBjbGFzcyBUb3VjaGFibGUgZXh0ZW5kcyBlbmdpbmUuVG91Y2hhYmxlIHsgfVxyXG5leHBvcnQgY2xhc3MgVG91Y2hJbnB1dENvbXBvbmVudCBleHRlbmRzIGVuZ2luZS5Ub3VjaElucHV0Q29tcG9uZW50IHsgfVxyXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRJbnB1dENvbXBvbmVudCBleHRlbmRzIGVuZ2luZS5LZXlib2FyZElucHV0Q29tcG9uZW50IHsgfVxyXG5leHBvcnQgY2xhc3MgUmF5Q2FzdGVyIGV4dGVuZHMgZW5naW5lLlJheWNhc3RlciB7IH1cclxuZXhwb3J0IGNsYXNzIENvbG9yVXRpbHMge1xyXG4gICAgcHVibGljIHN0YXRpYyByZ2JUb0hleChyLCBnLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgKCgxIDw8IDI0KSArIChyIDw8IDE2KSArIChnIDw8IDgpICsgYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE8gaW1wcm92ZSAuLi5cclxuICAgIHB1YmxpYyBzdGF0aWMgSGV4VG9Db2xvcihoZXg6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGhleCBzaG91bGQgYmVnaW4gd2l0aCBcIiNcIlxyXG4gICAgICAgIGNvbnN0IGhleFN0ciA9IGhleC5zbGljZSgxKTtcclxuICAgICAgICBjb25zdCByZWQgPSBoZXhTdHIuc2xpY2UoMCwgMik7XHJcbiAgICAgICAgY29uc3QgZ3JlZW4gPSBoZXhTdHIuc2xpY2UoMiwgNCk7XHJcbiAgICAgICAgY29uc3QgYmx1ZSA9IGhleFN0ci5zbGljZSg0LCA2KTtcclxuICAgICAgICBsZXQgYWxwaGEgPSBcIkZGXCI7XHJcbiAgICAgICAgaWYgKGhleFN0ci5sZW5ndGggPiA2KSB7XHJcbiAgICAgICAgICAgIGFscGhhID0gaGV4U3RyLnNsaWNlKDYsIDgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQUJHUiBmb3JtYXRcclxuICAgICAgICBjb25zdCBoZXhOdW0gPSBwYXJzZUludChhbHBoYSArIGJsdWUgKyBncmVlbiArIHJlZCwgMTYpO1xyXG4gICAgICAgIHJldHVybiBlbmdpbmUuQ29sb3IuZnJvbUhleChoZXhOdW0pO1xyXG5cclxuICAgICAgICAvLyBOT1RFIFJHQkEgZm9ybWF0XHJcbiAgICAgICAgLy8gbGV0IGhleFN0ciA9IGhleC5zbGljZSgxKTtcclxuICAgICAgICAvLyBpZiAoaGV4U3RyLmxlbmd0aCA+IDYpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGhleE51bSA9IHBhcnNlSW50KGhleFN0ciwgMTYpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZW5naW5lLkNvbG9yLmZyb21IZXgoaGV4TnVtKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBsZXQgaGV4TnVtID0gcGFyc2VJbnQoaGV4U3RyICsgXCJGRlwiLCAxNik7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBlbmdpbmUuQ29sb3IuZnJvbUhleChoZXhOdW0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdyYXlzY2FsZShjb2xvcjogQ29sb3IpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChjb2xvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gMC4yOTkgKiBjb2xvci5yICsgMC41ODcgKiBjb2xvci5nICsgMC4xMTQgKiBjb2xvci5iO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTY3JlZW5Qb3NUb0dsb2Ioc2NyZWVuUG9zOiBQb2ludCwgY3JlYXRlTmV3UG9pbnQ/OiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBzdGFnZVggPSBzY3JlZW5Qb3MueDtcclxuICAgIGNvbnN0IHN0YWdlWSA9IHNjcmVlblBvcy55O1xyXG5cclxuICAgIGxldCByZXN1bHQgPSBzY3JlZW5Qb3M7XHJcbiAgICBpZiAoY3JlYXRlTmV3UG9pbnQpIHtcclxuICAgICAgICByZXN1bHQgPSBuZXcgUG9pbnQoKTtcclxuICAgIH1cclxuICAgIHJlc3VsdC54ID0gc3RhZ2VYO1xyXG4gICAgcmVzdWx0LnkgPSBzdGFnZVk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gRmluZENoaWxkQnlQYXRoKHJvb3Q6VGIsIHBhdGg6c3RyaW5nKTpUYntcclxuLy8gICAgIGlmKHBhdGggPT0gXCIuXCIpIHJldHVybiByb290O1xyXG5cclxuLy8gICAgIGxldCBuYW1lcyA9IHBhdGguc3BsaXQoXCIvXCIpO1xyXG4vLyAgICAgbGV0IG5vZGUgPSByb290O1xyXG4vLyAgICAgbmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuLy8gICAgICAgICBpZighbm9kZSkgcmV0dXJuO1xyXG5cclxuLy8gICAgICAgICBub2RlID0gbm9kZW5naW5lLmZpbmRDaGlsZEJ5TmFtZShuYW1lKTtcclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIHJldHVybiBub2RlO1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50c0luY2x1ZGVDaGlsZChub2RlOiBFdHQsIGNsYXM6IGFueSk6IEFycmF5PGFueT4ge1xyXG4gICAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICBjb25zdCBjb21wb25lbnRzID0gbm9kZS5nZXRDb21wb25lbnRzKGNsYXMpO1xyXG5cclxuICAgIGlmIChjb21wb25lbnRzKSB7XHJcbiAgICAgICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29tcG9uZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9kZS50cmFuc2Zvcm0gJiYgbm9kZS50cmFuc2Zvcm0uY2hpbGRyZW5Db3VudCA+IDApIHtcclxuICAgICAgICBub2RlLnRyYW5zZm9ybS50cmF2ZWxDaGlsZCgoY2hpbGQ6IFRmM0QpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkICE9PSBub2RlLnRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb21wb25lbnRzID0gZ2V0Q29tcG9uZW50c0luY2x1ZGVDaGlsZChjaGlsZC5lbnRpdHksIGNsYXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkQ29tcG9uZW50cyAmJiBjaGlsZENvbXBvbmVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjb21wb25lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudHNJbmNsdWRlQ2hpbGQyRChub2RlOiBFdHQsIGNsYXM6IGFueSk6IEFycmF5PGFueT4ge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gW107XHJcbiAgICBpZiAoIW5vZGUpIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IG5vZGUuZ2V0Q29tcG9uZW50cyhjbGFzKTtcclxuXHJcbiAgICBpZiAoY29tcG9uZW50cykge1xyXG4gICAgICAgIGNvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vZGUudHJhbnNmb3JtMkQgJiYgbm9kZS50cmFuc2Zvcm0yRC5jaGlsZHJlbkNvdW50ID4gMCkge1xyXG4gICAgICAgIG5vZGUudHJhbnNmb3JtMkQudHJhdmVsQ2hpbGQoKGNoaWxkOiBUZjJEKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPT0gbm9kZS50cmFuc2Zvcm0yRCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRDb21wb25lbnRzID0gZ2V0Q29tcG9uZW50c0luY2x1ZGVDaGlsZDJEKGNoaWxkLmVudGl0eSwgY2xhcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRDb21wb25lbnRzICYmIGNoaWxkQ29tcG9uZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbXBvbmVudHMuZm9yRWFjaCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50SW5QYXJlbnQobm9kZTogRXR0LCBjbGFzOiBhbnkpIHtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNsYXMpO1xyXG5cclxuICAgIGlmIChjb21wb25lbnQpIHtcclxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBwYXJlbnQgPSBub2RlLnRyYW5zZm9ybS5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50SW5QYXJlbnQocGFyZW50LmVudGl0eSwgY2xhcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9vcEluZGljYXRvciB7XHJcbiAgICBwdWJsaWMgdDogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICog5byA5ZCv5LiA5Liq5b6q546vXHJcbiAqIEBwYXJhbSBjYWxsZXIg6LCD55So6ICFXHJcbiAqIEBwYXJhbSBtZXRob2Qg5omn6KGM5pa55rOVXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gU3RhcnRMb29wKGNhbGxlcjogYW55LCBtZXRob2Q6IEZ1bmN0aW9uKTogTG9vcEluZGljYXRvciB7XHJcbiAgICBjb25zdCBsb2NhbENhbGxlciA9IGNhbGxlcjtcclxuICAgIGNvbnN0IGluZGljYXRvcjogTG9vcEluZGljYXRvciA9IG5ldyBMb29wSW5kaWNhdG9yKCk7XHJcbiAgICBjb25zdCBsb29wRnVuYyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBpbmtleSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcEZ1bmMpOyAvLyAg6L+Z5LiA5Y+l6KaB5pS+5Zyo5Zue6LCD5LmL5YmN77yM5ZCm5YiZ5LiN6IO95Y+W5raI5b6q546vXHJcbiAgICAgICAgaW5kaWNhdG9yLnQgPSBpbmtleTtcclxuICAgICAgICBtZXRob2QuYXBwbHkobG9jYWxDYWxsZXIpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG91dEtleSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcEZ1bmMpO1xyXG4gICAgaW5kaWNhdG9yLnQgPSBvdXRLZXk7XHJcbiAgICByZXR1cm4gaW5kaWNhdG9yO1xyXG59XHJcblxyXG4vKipcclxuICog57uT5p2f5LiA5Liq5b6q546vXHJcbiAqIEBwYXJhbSBsb29wSW5kaWNhdG9yIOeUsVN0YXJ0TG9vcOaWueazlei/lOWbnueahOW+queOr+WPpeafhFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEVuZExvb3AobG9vcEluZGljYXRvcjogTG9vcEluZGljYXRvcikge1xyXG4gICAgaWYgKGxvb3BJbmRpY2F0b3IpIHtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUobG9vcEluZGljYXRvci50KTtcclxuICAgICAgICBsb29wSW5kaWNhdG9yID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxubGV0IEJhc2VVcmw6IHN0cmluZztcclxuIl19
