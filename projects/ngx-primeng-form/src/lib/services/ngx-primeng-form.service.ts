import { Injectable } from '@angular/core';
import {
  NgxPrimengFormType,
  INgxPrimengForm,
  NgxPrimengFormProperty,
  NgxPrimengFormSelectProperty,
  NgxPrimengFormRadioProperty,
  NgxPrimengFormDateProperty,
  NgxPrimengFormCheckboxProperty,
  NgxPrimengFormAutoCompleteProperty,
  INgxPrimengFormValidation,
  NgxPrimengFormTextProperty,
  INgxPrimengFormResult,
  NgxPrimengFormCustomProperty,
  NgxPrimengFormNumericProperty,
  NgxPrimengFormEditorProperty
} from '../interfaces/ngx-primeng-form';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, FormArray } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NgxPrimengFormService {

  constructor() { }

  // this will create internally control
  private create(controlName: string, label: string, id: string, type: NgxPrimengFormType, value: any, placeholder: string, controlCssClass: string, layoutCssClass: string, validation: INgxPrimengFormValidation, defProperty: any): INgxPrimengForm {
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
      case NgxPrimengFormType.custom: { return this.getCustomProperty(property); }
      case NgxPrimengFormType.editor: { return this.getEditorProperty(property); }
      default: { return new NgxPrimengFormProperty() }
    }
  }

  // set property and value if any
  private setProperty(model: any, key: string, property: any, checkValue: boolean = true) {
    if (checkValue) {
      // for value
      if (this.hasPropertyValue(property, key)) {
        model[key] = property[key];
      }
    }
    else {
      // only property
      if (this.hasProperty(property, key)) {
        model[key] = property[key];
      }
    }
  }

  // this is for shared property
  private setSharedProperty<T extends NgxPrimengFormProperty>(model: T, property: any) {
    // append to
    this.setProperty(model, 'appendTo', property);
    // addOptionLabel
    this.setProperty(model, 'addOptionLabel', property);
    // helpText
    this.setProperty(model, 'helpText', property);
  }

  // get textbox property
  private getTextProperty(property: any): NgxPrimengFormTextProperty {
    // create model
    const model = new NgxPrimengFormTextProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for type
      this.setProperty(model, 'type', property);
      // for readonly
      this.setProperty(model, 'readonly', property, false);
    }
    return model;
  }

  private getNumericProperty(property: any): NgxPrimengFormNumericProperty {
    // create model
    const model = new NgxPrimengFormNumericProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for currency
      this.setProperty(model, 'currency', property);
    }
    return model;
  }

  // get select property
  private getSelectProperty(property: any): NgxPrimengFormSelectProperty {
    // create model
    const model = new NgxPrimengFormSelectProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for options
      this.setProperty(model, 'options', property);
      // for filter
      this.setProperty(model, 'filter', property, false);
      // set maxSelectedLabels
      this.setProperty(model, 'maxSelectedLabels', property);
      // show clear
      this.setProperty(model, 'showClear', property, false);
    }
    return model;
  }

  // get autocomplete property
  private getAutoCompleteProperty(property: any): NgxPrimengFormAutoCompleteProperty {
    // create model
    const model = new NgxPrimengFormAutoCompleteProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for options
      this.setProperty(model, 'minLength', property);
      // for options
      this.setProperty(model, 'forceSelection', property, false);
    }
    return model;
  }

  // get calender property
  private getCalenderProperty(property: any): NgxPrimengFormDateProperty {
    // create model
    const model = new NgxPrimengFormDateProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for format
      this.setProperty(model, 'format', property);
      // for type
      this.setProperty(model, 'type', property);
      // for view
      this.setProperty(model, 'view', property);
    }
    return model;
  }

  // get checkbox property
  private getCheckboxProperty(property: any): NgxPrimengFormCheckboxProperty {
    // create model
    const model = new NgxPrimengFormCheckboxProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for format
      this.setProperty(model, 'label', property);
      // for format
      this.setProperty(model, 'containerStyleClass', property);
    }
    return model;
  }

  // get radio property
  private getRadioProperty(property: any): NgxPrimengFormRadioProperty {
    // create model
    const model = new NgxPrimengFormRadioProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for format
      this.setProperty(model, 'items', property);
      // for format
      this.setProperty(model, 'containerStyleClass', property);
    }
    return model;
  }

  // get custom property
  private getCustomProperty(property: any): NgxPrimengFormCustomProperty {
    // create model
    const model = new NgxPrimengFormCustomProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for format
      this.setProperty(model, 'type', property);
    }
    return model;
  }

  // get editor property
  private getEditorProperty(property: any): NgxPrimengFormEditorProperty {
    // create model
    const model = new NgxPrimengFormEditorProperty();
    // NULL check
    if (property) {
      // shared property
      this.setSharedProperty(model, property);
      // for style
      this.setProperty(model, 'style', property);
      // for formats
      this.setProperty(model, 'formats', property);
      // for modules
      this.setProperty(model, 'modules', property);
      // for readonly
      this.setProperty(model, 'readonly', property, false);
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
  getProperty<T extends NgxPrimengFormProperty>(controlName: string, forms: INgxPrimengForm[]): T {
    if (forms && forms.length > 0) {
      const item = forms.find(m => m.controlName.toLowerCase() == controlName.toLowerCase());
      if (item != null) {
        return item.property as T;
      }
    }
    return null
  }

  // json object to form object
  jsonToForm(jsonForms: INgxPrimengForm[]): INgxPrimengForm[] {
    const results: INgxPrimengForm[] = []
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
  prepareControl(formGroup: FormGroup, forms: INgxPrimengForm[]) {
    // clear the form gropup
    Object.keys(formGroup.controls).forEach(controlName => {
      formGroup.removeControl(controlName);
    });
    // add controls
    this.addControl(formGroup, forms);
  }

  // prepare form
  prepareForm(formBuilder: FormBuilder, formJson: INgxPrimengForm[]): INgxPrimengFormResult {
    // NULL and Length check
    if (formJson && formJson.length > 0) {
      // reset the form
      const formGroup = formBuilder.group({});
      // prepare the items
      const items = this.jsonToForm(formJson);
      // prepare the forms
      this.prepareControl(formGroup, items);
      // call back
      return {
        formGroup: formGroup,
        forms: items
      }
    }
    return null;
  }

  //create control
  createControls(formBuilder: FormBuilder, forms: INgxPrimengForm[]): FormGroup {
    // clear the form gropup
    const formGroup = formBuilder.group({});
    // add controls
    this.addControl(formGroup, forms);
    // return
    return formGroup;
  }

  // add controls from forms
  private addControl(formGroup: FormGroup, forms: INgxPrimengForm[]) {
    if (forms && forms.length > 0) {
      forms.forEach(form => {
        const validations = this.getValidations(form.validation);
        // check for both custom and custom control
        if (form.type == NgxPrimengFormType.custom) {
          // for custom control
          const property = form.property as NgxPrimengFormCustomProperty;
          if (property) {
            switch (property.type) {
              case 'array': {
                formGroup.addControl(form.controlName, new FormArray([], validations));
              } break;
              case 'group': {
                formGroup.addControl(form.controlName, new FormGroup({}, validations));
              } break;
              default: {
                formGroup.addControl(form.controlName, new FormControl(form.value, validations));
              } break;
            }
          }
        } else {
          // for normal control
          formGroup.addControl(form.controlName, new FormControl(form.value, validations));
        }
      });
    }
  }

  // get validations
  getValidations(validation: INgxPrimengFormValidation): ValidatorFn[] {
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
  setSelectItems(forms: INgxPrimengForm[], controlName: string, items: SelectItem[]) {
    const property = this.getProperty(controlName, forms) as NgxPrimengFormSelectProperty;
    if (property) {
      property.options = items;
    }
  }

}
