var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import * as moment from 'moment';
let UxPickerDialog = class UxPickerDialog {
    constructor(resources) {
        this.resources = resources;
        this.theme = null;
        this.type = 'datetime';
        this.display = 'month';
    }
    bind() {
        if (this.value != null) {
            this.selectedDate = moment(this.value);
        }
        else {
            this.selectedDate = this.initialDate;
            if (this.minDate != null && this.selectedDate.isBefore(this.minDate)) {
                this.selectedDate = moment(this.minDate).clone();
            }
            if (this.maxDate != null && this.selectedDate.isBefore(this.maxDate)) {
                this.selectedDate = moment(this.minDate).clone();
            }
        }
    }
    valueChanged(newDate) {
        this.selectedDate = moment(newDate);
    }
    selectDate() {
        if (this.selectedDate != null) {
            this.value = this.selectedDate.toDate();
        }
    }
    changeView(view) {
        this.display = view;
    }
};
__decorate([
    bindable
], UxPickerDialog.prototype, "theme", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "type", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "display", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "weekdays", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "config", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "initialDate", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "minDate", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "maxDate", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "value", void 0);
__decorate([
    bindable
], UxPickerDialog.prototype, "closeDialog", void 0);
UxPickerDialog = __decorate([
    inject(ViewResources),
    customElement('ux-picker-dialog')
], UxPickerDialog);
export { UxPickerDialog };
