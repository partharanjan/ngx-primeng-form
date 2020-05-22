import { SelectItem } from 'primeng/api';

export enum NgxPrimengFormType {
    text = 'text',
    select = 'select',
    multiselect = 'multiselect',
    date = 'date',
    time = 'time',
    autocomplete = 'autocomplete',
    checkbox = 'checkbox',
    radio = "radio",
    textarea = 'textarea'
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
}

export interface INgxPrimengFormValidation {
    required: boolean;
    email: boolean;
    minLength: number;
    maxLength: number;
    min: number;
    max: number;
    regex: string;
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
    // append to
    appendTo: string = null;
    // add option label
    addOptionLabel: string = null;
    // help text
    helpText: string = null;
}

// for text box
export class NgxPrimengFormTextProperty extends NgxPrimengFormProperty {
    // text type defualt is text
    type: string = 'text';
}

// select property
export class NgxPrimengFormSelectProperty extends NgxPrimengFormProperty {
    filter: boolean = true;
    options: SelectItem[] = [];
}

// date property
export class NgxPrimengFormDateProperty extends NgxPrimengFormProperty {
    defaultDate: Date = null;
    minDate: Date = null;
    maxDate: Date = null;
    format: string = 'dd-mm-yy';
    type: string = 'date';
}

export class NgxPrimengFormTimeProperty extends NgxPrimengFormProperty {
    gap: number = 5;
    format: string = '12';
    appendToInput: boolean = false;
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