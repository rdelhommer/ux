var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { computedFrom, bindingMode } from 'aurelia-binding';
// TODO: unit tests
// TODO: implement hover, focus, etc styles
// TODO: animations
// TODO: ios styles
var UxSlider = /** @class */ (function () {
    function UxSlider(element, styleEngine) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.onMouseMove = function (e) { return _this.updateValue(e.clientX); };
        this.onMouseUp = this.handleMouseUp.bind(this);
    }
    Object.defineProperty(UxSlider.prototype, "sliderBeforeWidth", {
        get: function () {
            return this.percentValue * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UxSlider.prototype, "sliderAfterWidth", {
        get: function () {
            return (1 - this.percentValue) * 100;
        },
        enumerable: true,
        configurable: true
    });
    UxSlider.prototype.bind = function () {
        this.themeChanged(this.theme);
        this.minChanged();
        this.maxChanged();
        this.valueChanged();
        this.disabledChanged();
        this.stepChanged();
    };
    UxSlider.prototype.detached = function () {
        window.removeEventListener('mouseup', this.onMouseUp);
    };
    UxSlider.prototype.disabledChanged = function () {
        if (this.disabled) {
            window.removeEventListener('mouseup', this.onMouseUp);
        }
        else {
            window.addEventListener('mouseup', this.onMouseUp);
        }
    };
    UxSlider.prototype.stepChanged = function () {
        if (this.step === undefined || this.step === null) {
            this.step = 1;
            return;
        }
        this.step = Number(this.step);
    };
    UxSlider.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'slider';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxSlider.prototype.minChanged = function () {
        if (this.min === undefined || this.min === null) {
            this.min = 0;
            return;
        }
        this.min = Number(this.min);
    };
    UxSlider.prototype.maxChanged = function () {
        if (this.max === undefined || this.max === null) {
            this.max = 100;
            return;
        }
        this.max = Number(this.max);
    };
    UxSlider.prototype.valueChanged = function () {
        if (this.value === undefined || this.value === null) {
            this.value = this.min;
            this.percentValue = 0;
            return;
        }
        var percentValue = (this.value - this.min) / (this.max - this.min);
        this.percentValue = percentValue > 1
            ? 1
            : percentValue < 0
                ? 0
                : percentValue;
    };
    UxSlider.prototype.updateValue = function (currentMouseX) {
        var normalizedMouseX = currentMouseX - this.element.offsetLeft;
        var percentValue = normalizedMouseX / this.element.clientWidth;
        var rawValue = ((this.max - this.min) * percentValue) + this.min;
        var numSteps = Math.round((rawValue - this.min) / this.step);
        var steppedValue = this.min + (this.step * numSteps);
        this.value = this.boundValue(steppedValue);
    };
    UxSlider.prototype.onTrackMouseDown = function () {
        if (this.disabled) {
            return;
        }
        this.isActive = true;
        window.addEventListener('mousemove', this.onMouseMove);
    };
    UxSlider.prototype.onKeyDown = function (e) {
        var steppedValue = e.keyCode === 37 || e.keyCode === 40
            ? this.value - this.step
            : e.keyCode === 38 || e.keyCode === 39
                ? this.value + this.step
                : this.value;
        this.value = this.boundValue(steppedValue);
        return true;
    };
    UxSlider.prototype.handleMouseUp = function (e) {
        if (!this.isActive) {
            return;
        }
        this.updateValue(e.clientX);
        window.removeEventListener('mousemove', this.onMouseMove);
        this.isActive = false;
    };
    UxSlider.prototype.boundValue = function (potentialValue) {
        return potentialValue > this.max
            ? this.max
            : potentialValue < this.min
                ? this.min
                : potentialValue;
    };
    __decorate([
        bindable
    ], UxSlider.prototype, "theme", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], UxSlider.prototype, "value", void 0);
    __decorate([
        bindable
    ], UxSlider.prototype, "min", void 0);
    __decorate([
        bindable
    ], UxSlider.prototype, "max", void 0);
    __decorate([
        bindable
    ], UxSlider.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxSlider.prototype, "step", void 0);
    __decorate([
        computedFrom('percentValue')
    ], UxSlider.prototype, "sliderBeforeWidth", null);
    __decorate([
        computedFrom('percentValue')
    ], UxSlider.prototype, "sliderAfterWidth", null);
    UxSlider = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-slider')
    ], UxSlider);
    return UxSlider;
}());
export { UxSlider };
