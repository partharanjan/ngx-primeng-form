import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';

// form type
export enum NgxPrimengFormType {
    text = 'text',
    number = 'number',
    select = 'select',
    multiselect = 'multiselect',
    date = 'date',
    time = 'time',
    dateTime = 'dateTime',
    autocomplete = 'autocomplete',
    checkbox = 'checkbox',
    radio = "radio",
    textarea = 'textarea',
    custom = 'custom',
    placeholder = 'placeholder',
    editor = 'editor'
}

// primeng form model
export interface INgxPrimengForm {
    // form label
    label: string;
    // control name
    controlName: string;
    // control Id
    id?: string;
    // control type
    type: NgxPrimengFormType;
    // control css
    controlStyle: string;
    // layout css
    layoutStyle: string;
    // placeholder
    placeholder?: string;
    // default value
    value?: any;
    // validations
    validation: INgxPrimengFormValidation;
    // property
    property?: NgxPrimengFormProperty;
}

export interface INgxPrimengFormValidation {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    regex?: string;
}

// form property
export class NgxPrimengFormProperty {
    // on select or value changed
    onChange($event: any) { }
    // on focus out
    onBlur($event: any) { }
    // on focus in
    onFocus($event: any) { }
    // on option clicked
    onAddOption() { };
    // append to default is body
    appendTo: string = 'body';
    // add option label
    addOptionLabel: string = null;
    // help text
    helpText: string = null;
}

// for text box
export class NgxPrimengFormTextProperty extends NgxPrimengFormProperty {
    // text type defualt is text
    type: string = 'text';
    readonly: boolean = false;
}

// for number box
export class NgxPrimengFormNumberProperty extends NgxPrimengFormProperty {
    // text type defualt is text
    mode: string = 'decimal';
    currency: string;
    locale: string;
    grouping: boolean = true;
    fraction: number = 2;
    min: number = null;
    max: number = null;
    prefix: string = null;
    suffix: string = null;
}

// select property
export class NgxPrimengFormSelectProperty extends NgxPrimengFormProperty {
    filter: boolean = true;
    options: SelectItem[] = [];
    maxSelectedLabels: number = 3;
    showClear: boolean = true;
}

// date property
export class NgxPrimengFormDateProperty extends NgxPrimengFormProperty {
    defaultDate: Date = null;
    minDate: Date = null;
    maxDate: Date = null;
    format: string = 'dd-mm-yy';
    type: string = 'string';
    view: string = 'date';
    timeFormat: string = "12";
}

// autocomplete property
export class NgxPrimengFormAutoCompleteProperty extends NgxPrimengFormProperty {
    suggestions: any[] = [];
    minLength: number = 1;
    forceSelection: boolean = false;
    onSearch($event: any) { };
}

// checkbox property
export class NgxPrimengFormCheckboxProperty extends NgxPrimengFormProperty {
    containerStyle: string;
}

//radio property
export class NgxPrimengFormRadioProperty extends NgxPrimengFormProperty {
    options: SelectItem[] = [];
    containerStyle: string;
}

// for editor
export class NgxPrimengFormEditorProperty extends NgxPrimengFormProperty {
    // text type defualt is text
    style: any = { 'height': '100px' }
    modules: any = null;
    onInit(event: any) { }
}

// for custom property
export class NgxPrimengFormCustomProperty extends NgxPrimengFormProperty {
    controlType: string = 'control';
    fieldType?: string;
}

// form result
export interface INgxPrimengFormResult {
    formGroup: FormGroup;
    forms: INgxPrimengForm[];
}