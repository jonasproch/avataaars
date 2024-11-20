"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var OptionContext_1 = require("./OptionContext");
function getComponentOptionValue(component) {
    var optionValue = component.optionValue;
    if (!optionValue) {
        throw new Error("optionValue should be provided for " + component);
    }
    return optionValue;
}
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector(props) {
        var _this = _super.call(this, props) || this;
        _this.optionContextUpdate = function () {
            _this.forceUpdate();
        };
        var _a = _this.props, option = _a.option, defaultOption = _a.defaultOption;
        var defaultValue = typeof defaultOption === 'string'
            ? defaultOption
            : getComponentOptionValue(defaultOption);
        _this.optionContext.addStateChangeListener(_this.optionContextUpdate);
        _this.optionContext.optionEnter(option.key);
        var optionState = _this.optionContext.getOptionState(option.key);
        _this.updateOptionValues();
        if (optionState) {
            _this.optionContext.setDefaultValue(option.key, defaultValue);
        }
        return _this;
    }
    Selector.prototype.UNSAFE_componentWillUpdate = function (nextProps) {
        this.updateOptionValues(nextProps);
    };
    Selector.prototype.componentWillUnmount = function () {
        this.optionContext.removeStateChangeListener(this.optionContextUpdate);
        this.optionContext.optionExit(this.props.option.key);
    };
    Selector.prototype.render = function () {
        var result = null;
        var _a = this.props, option = _a.option, children = _a.children;
        var value = this.optionContext.getValue(option.key);
        React.Children.forEach(children, function (child) {
            if (getComponentOptionValue(child.type) === value) {
                result = child;
            }
        });
        return result;
    };
    Selector.prototype.updateOptionValues = function (nextProps) {
        if (nextProps && this.props.children === nextProps.children) {
            return;
        }
        var _a = this.props, option = _a.option, children = _a.children;
        var values = React.Children.map(children, 
        // TODO: also validate and throw error if we don't see optionValue
        function (child) { return getComponentOptionValue(child.type); });
        if (new Set(values).size !== (values === null || values === void 0 ? void 0 : values.length)) {
            throw new Error('Duplicate values');
        }
        this.optionContext.setOptions(option.key, values);
    };
    Selector.contextType = OptionContext_1.OptionsContext;
    return Selector;
}(React.Component));
exports.default = Selector;
