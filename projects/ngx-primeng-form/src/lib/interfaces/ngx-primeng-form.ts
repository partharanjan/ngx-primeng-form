import { SelectItem } from 'primeng/api';
import { FormGroup } from '@angular/forms';

export enum NgxPrimengFormType {
    text = 'text',
    select = 'select',
    multiselect = 'multiselect',
    date = 'date',
    autocomplete = 'autocomplete',
    checkbox = 'checkbox',
    radio = "radio",
    textarea = 'textarea',
    custom = 'custom',
    editor = 'editor',
    placeholder = 'placeholder'
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
    controlStyleClass: string;
    // layout css
    layoutStyleClass: string;
    // placeholder
    placeholder?: string;
    // default value
    value?: any;
    // validations
    validation: INgxPrimengFormValidation;
    // property
    property?: NgxPrimengFormProperty;
    // hide control
    hide?:boolean
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

// for text box
export class NgxPrimengFormNumericProperty extends NgxPrimengFormProperty {
    // currency
    currency: string = '';
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
    type: string = 'date';
    view: string = 'date';
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
    label: string;
    containerStyleClass: string = 'mt-1';
}

//radio property
export class NgxPrimengFormRadioProperty extends NgxPrimengFormProperty {
    items: SelectItem[] = [];
    containerStyleClass: string;
}

// for custom property
export class NgxPrimengFormCustomProperty extends NgxPrimengFormProperty {
    controlType: string = 'control';
    fieldType?: string;
}

// for editor
export class NgxPrimengFormEditorProperty extends NgxPrimengFormProperty {
    // text type defualt is text
    style: any = { 'height': '100px' }
    modules: any = null;
    onInit(event: any) { }
}


export interface INgxPrimengFormResult {
    formGroup: FormGroup;
    forms: INgxPrimengForm[];
}