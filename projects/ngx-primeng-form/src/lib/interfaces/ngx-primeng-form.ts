import { SelectItem } from 'primeng/api/selectitem';

export enum NgxPrimengFormType {
    text = 'text',
    select = 'select',
    multiselect = 'multiselect',
    date = 'date',
    autocomplete = 'autocomplete',
    checkbox = 'checkbox',
    radio = "radio",
    textarea = 'textarea'
}

// primeng form model
export interface NgxPrimengForm {
    // form label
    label: string;
    // control name
    controlName: string;
    // control Id
    id: string;
    // control type
    type: NgxPrimengFormType;
    // control css
    controlStyleClass: string;
    // layout css
    layoutStyleClass: string;
    // placeholder
    placeholder: string;
    // default value
    value: any;
    // validations
    validation: NgxPrimengFormValidation;
    // property
    property: NgxPrimengFormProperty;
}

export interface NgxPrimengFormValidation {
    displayName: string;
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
    format: string = 'mm-dd-yy';
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
    containerCssClass: string = 'mt-1';
}

//radio property
export class NgxPrimengFormRadioProperty extends NgxPrimengFormProperty {
    items: SelectItem[] = [];
    containerCssClass: string;
}