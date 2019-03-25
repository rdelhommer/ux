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
let UxSlider = class UxSlider {
    constructor(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.onMouseMove = (e) => this.updateValue(e.clientX);
        this.onMouseUp = this.handleMouseUp.bind(this);
    }
    get sliderBeforeWidth() {
        return this.percentValue * 100;
    }
    get sliderAfterWidth() {
        return (1 - this.percentValue) * 100;
    }
    bind() {
        this.themeChanged(this.theme);
        this.minChanged();
        this.maxChanged();
        this.valueChanged();
    }
    attached() {
        window.addEventListener('mouseup', this.onMouseUp);
    }
    detached() {
        window.removeEventListener('mouseup', this.onMouseUp);
    }
    themeChanged(newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'slider';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    }
    minChanged() {
        if (this.min === undefined || this.min === null) {
            this.min = 0;
            return;
        }
        this.min = Number(this.min);
    }
    maxChanged() {
        if (this.max === undefined || this.max === null) {
            this.max = 100;
            return;
        }
        this.max = Number(this.max);
    }
    valueChanged() {
        if (this.value === undefined || this.value === null) {
            this.value = this.min;
            this.percentValue = 0;
            return;
        }
        const percentValue = (this.value - this.min) / (this.max - this.min);
        this.percentValue = percentValue > 1
            ? 1
            : percentValue < 0
                ? 0
                : percentValue;
    }
    updateValue(currentMouseX) {
        const normalizedMouseX = currentMouseX - this.element.offsetLeft;
        const percentValue = normalizedMouseX / this.element.clientWidth;
        const value = Math.round(((this.max - this.min) * percentValue) + this.min);
        this.value = value > this.max
            ? this.max
            : value < this.min
                ? this.min
                : value;
    }
    onTrackMouseDown(e) {
        this.isActive = true;
        this.updateValue(e.clientX);
        window.addEventListener('mousemove', this.onMouseMove);
    }
    handleMouseUp() {
        if (!this.isActive) {
            return;
        }
        window.removeEventListener('mousemove', this.onMouseMove);
        this.isActive = false;
    }
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
    computedFrom('percentValue')
], UxSlider.prototype, "sliderBeforeWidth", null);
__decorate([
    computedFrom('percentValue')
], UxSlider.prototype, "sliderAfterWidth", null);
UxSlider = __decorate([
    inject(Element, StyleEngine),
    customElement('ux-slider')
], UxSlider);
export { UxSlider };
