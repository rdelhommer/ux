import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSliderTheme } from './ux-slider-theme';
import { computedFrom, bindingMode } from 'aurelia-binding';

@inject(Element, StyleEngine)
@customElement('ux-slider')
export class UxSlider implements UxComponent {
  private isActive: boolean;
  private percentValue: number;
  private onMouseMove: (e: MouseEvent) => void = (e) => this.updateValue(e.clientX);
  private onMouseUp: (e: MouseEvent) => void = this.handleMouseUp.bind(this);

  @bindable public theme: UxSliderTheme;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: number;
  @bindable public min: number;
  @bindable public max: number;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

  @computedFrom('percentValue')
  get sliderBeforeWidth(): number {
    return this.percentValue * 100;
  }

  @computedFrom('percentValue')
  get sliderAfterWidth(): number {
    return (1 - this.percentValue) * 100;
  }

  public bind() {
    this.themeChanged(this.theme);

    this.minChanged();
    this.maxChanged();
    this.valueChanged();
  }

  public attached() {
    window.addEventListener('mouseup', this.onMouseUp);
  }

  public detached() {
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'slider';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public minChanged() {
    if (this.min === undefined || this.min === null) {
      this.min = 0;
      return;
    }

    this.min = Number(this.min);
  }

  public maxChanged() {
    if (this.max === undefined || this.max === null) {
      this.max = 100;
      return;
    }

    this.max = Number(this.max);
  }

  public valueChanged() {
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

  public updateValue(currentMouseX: number) {
    const normalizedMouseX = currentMouseX - this.element.offsetLeft;
    const percentValue = normalizedMouseX / this.element.clientWidth;
    const value = Math.round(((this.max - this.min) * percentValue) + this.min);

    this.value = value > this.max
      ? this.max
      : value < this.min
        ? this.min
        : value;
  }

  public onTrackMouseDown(e: MouseEvent) {
    this.isActive = true;

    this.updateValue(e.clientX);

    window.addEventListener('mousemove', this.onMouseMove);
  }

  private handleMouseUp() {
    if (!this.isActive) {
      return;
    }

    window.removeEventListener('mousemove', this.onMouseMove);
    this.isActive = false;
  }
}
