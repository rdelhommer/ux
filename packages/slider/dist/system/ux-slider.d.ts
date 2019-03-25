import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSliderTheme } from './ux-slider-theme';
export declare class UxSlider implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    private isActive;
    private percentValue;
    private onMouseMove;
    private onMouseUp;
    theme: UxSliderTheme;
    value: number;
    min: number;
    max: number;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    readonly sliderBeforeWidth: number;
    readonly sliderAfterWidth: number;
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: any): void;
    minChanged(): void;
    maxChanged(): void;
    valueChanged(): void;
    updateValue(currentMouseX: number): void;
    onTrackMouseDown(e: MouseEvent): void;
    private handleMouseUp;
}
