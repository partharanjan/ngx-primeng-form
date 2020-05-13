import { Injectable } from '@angular/core';
import { NgxPrimengFormType, NgxPrimengForm, NgxPrimengFormProperty, NgxPrimengFormSelectProperty, NgxPrimengFormRadioProperty, NgxPrimengFormDateProperty, NgxPrimengFormCheckboxProperty, NgxPrimengFormAutoCompleteProperty, NgxPrimengFormValidation, NgxPrimengFormTextProperty } from '../interfaces/ngx-primeng-form';
import { FormGroup, FormControl, Validator, Validators, ValidatorFn } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NgxPrimengFormService {

  constructor() { }

  // this will create internally control
  private create(controlName: string, label: string, id: string, type: NgxPrimengFormType, value: any, placeholder: string, controlCssClass: string, layoutCssClass: string, validation: NgxPrimengFormValidation, defProperty: any): NgxPrimengForm {
    return {
      controlName,
      label,
      id,
      value,
      controlStyleClass: controlCssClass,
      layoutStyleClass: layoutCssClass,
      type,
      placeholder,
      property: this.getPropertyType(type, defProperty),
      validation
    }
  }

  private getPropertyType(type: NgxPrimengFormType, property: any): NgxPrimengFormProperty {
    switch (type) {
      case NgxPrimengFormType.autocomplete: { return this.getAutoCompleteProperty(property); }
      case NgxPrimengFormType.checkbox: { return this.getCheckboxProperty(property); }
      case NgxPrimengFormType.date: { return this.getCalenderProperty(property); }
      case NgxPrimengFormType.multiselect: { return this.getSelectProperty(property); }
      case NgxPrimengFormType.radio: { return this.getRadioProperty(property); }
      case NgxPrimengFormType.select: { return this.getSelectProperty(property); }
      case NgxPrimengFormType.text: { return this.getTextProperty(property); }
      case NgxPrimengFormType.textarea: { return this.getTextProperty(property); }
      default: { return new NgxPrimengFormProperty() }
    }
  }

  // get textbox property
  private getTextProperty(property: any): NgxPrimengFormTextProperty {
    // create model
    const model = new NgxPrimengFormTextProperty();
    // NULL check
    if (property) {
      // for date format
      if (this.hasPropertyValue(property, 'type')) {
        model.type = property['type'];
      }
    }
    return model;
  }

  // get select property
  private getSelectProperty(property: any): NgxPrimengFormSelectProperty {
    // create model
    const model = new NgxPrimengFormSelectProperty();
    // NULL check
    if (property) {
      // for Option
      if (this.hasPropertyValue(property, 'options')) {
        const options = property['options'];
        if (options && Array.isArray(options)) {
          model.options = options;
        }
      }
      // for filter
      if (this.hasProperty(property, 'filter')) {
        model.filter = property['filter'];
      }
      // for append
      if (this.hasPropertyValue(property, 'appendTo')) {
        model.appendTo = property['appendTo'];
      }
    }
    return model;
  }

  // get autocomplete property
  private getAutoCompleteProperty(property: any): NgxPrimengFormAutoCompleteProperty {
    // create model
    const model = new NgxPrimengFormAutoCompleteProperty();
    // NULL check
    if (property) {
      // for Option
      if (this.hasPropertyValue(property, 'minLength')) {
        model.minLength = parseInt(property['minLength'], 10);
      }
      // for forceSelection
      if (this.hasProperty(property, 'forceSelection')) {
        model.forceSelection = property['forceSelection'];
      }
      // for append
      if (this.hasPropertyValue(property, 'appendTo')) {
        model.appendTo = property['appendTo'];
      }
    }
    return model;
  }

  // get calender property
  private getCalenderProperty(property: any): NgxPrimengFormDateProperty {
    // create model
    const model = new NgxPrimengFormDateProperty();
    // NULL check
    if (property) {
      // for date format
      if (this.hasPropertyValue(property, 'format')) {
        model.format = property['format'];
      }
      // for append
      if (this.hasPropertyValue(property, 'appendTo')) {
        model.appendTo = property['appendTo'];
      }
      // in future add more attribute
    }
    return model;
  }

  // get checkbox property
  private getCheckboxProperty(property: any): NgxPrimengFormCheckboxProperty {
    // create model
    const model = new NgxPrimengFormCheckboxProperty();
    // NULL check
    if (property) {
      // for date format
      if (this.hasPropertyValue(property, 'label')) {
        model.label = property['label'];
      }
      // containerStyleClass
      if (this.hasPropertyValue(property, 'containerStyleClass')) {
        model.containerStyleClass = property['containerStyleClass'];
      }
    }
    return model;
  }

  // get radio property
  private getRadioProperty(property: any): NgxPrimengFormRadioProperty {
    // create model
    const model = new NgxPrimengFormRadioProperty();
    // NULL check
    if (property) {
      // for date format
      if (this.hasPropertyValue(property, 'items')) {
        const items = property['items'];
        if (items && Array.isArray(items)) {
          model.items = items;
        }
      }
      // containerStyleClass
      if (this.hasPropertyValue(property, 'containerStyleClass')) {
        model.containerStyleClass = property['containerStyleClass'];
      }
    }
    return model;
  }

  // check that objet has property or not
  private hasProperty(obj: Object, property: string) {
    return obj && obj.hasOwnProperty(property);
  }

  // check property exist with value
  private hasPropertyValue(obj: Object, property: string) {
    return obj && obj.hasOwnProperty(property) && obj[property];
  }

  // get property by control name
  getProperty<T extends NgxPrimengFormProperty>(controlName: string, forms: NgxPrimengForm[]): T {
    if (forms && forms.length > 0) {
      const item = forms.find(m => m.controlName.toLowerCase() == controlName.toLowerCase());
      if (item != null) {
        return item.property as T;
      }
    }
    return null
  }

  // json object to form object
  jsonToForm(jsonForms: NgxPrimengForm[]): NgxPrimengForm[] {
    const results: NgxPrimengForm[] = []
    if (jsonForms && jsonForms.length > 0) {
      jsonForms.forEach(form => {
        // prepare the form
        const formObj = this.create(
          form.controlName,
          this.hasPropertyValue(form, 'label') ? form.label : '',
          this.hasPropertyValue(form, 'id') ? form.id : form.controlName,
          this.hasPropertyValue(form, 'type') ? form.type : NgxPrimengFormType.text,
          this.hasProperty(form, 'value') ? form.value : null,
          this.hasPropertyValue(form, 'placeholder') ? form.placeholder : '',
          this.hasPropertyValue(form, 'controlStyleClass') ? form.controlStyleClass : '',
          this.hasPropertyValue(form, 'layoutStyleClass') ? form.layoutStyleClass : '',
          this.hasPropertyValue(form, 'validation') ? form.validation : null,
          this.hasPropertyValue(form, 'property') ? form.property : null);
        results.push(formObj);
      });
    }
    return results;
  }

  // prepare control
  prepareControl(formGroup: FormGroup, forms: NgxPrimengForm[]) {
    // clear the form gropup
    Object.keys(formGroup.controls).forEach(controlName => {
      formGroup.removeControl(controlName);
    })

    // set the form group value
    if (forms && forms.length > 0) {
      forms.forEach(form => {
        const validations = this.getValidations(form.validation);
        formGroup.addControl(form.controlName, new FormControl(form.value, validations));
      });
    }
  }

  // get validations
  getValidations(validation: NgxPrimengFormValidation): ValidatorFn[] {
    const results: ValidatorFn[] = [];
    if (validation) {
      // required
      if (validation.required) {
        results.push(Validators.required);
      }
      // email
      if (validation.email) {
        results.push(Validators.email);
      }
      // min length
      if (validation.minLength && validation.minLength > 0) {
        results.push(Validators.minLength(validation.minLength));
      }
      // max length
      if (validation.maxLength && validation.maxLength > 0) {
        results.push(Validators.maxLength(validation.maxLength));
      }
      // min
      if (validation.min && validation.min > 0) {
        results.push(Validators.min(validation.min));
      }
      // max
      if (validation.max && validation.max > 0) {
        results.push(Validators.max(validation.max));
      }
      // regex
      if (validation.regex) {
        results.push(Validators.pattern(validation.regex));
      }
    }
    return results;
  }

  // set select items
  setSelectItems(forms: NgxPrimengForm[], controlName: string, items: SelectItem[]) {
    const property = this.getProperty(controlName, forms) as NgxPrimengFormSelectProperty;
    if (property) {
      property.options = items;
    }
  }

}
