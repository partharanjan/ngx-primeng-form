import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { INgxPrimengForm, NgxPrimengFormProperty } from '../../interfaces/ngx-primeng-form';
import { SelectItem } from 'primeng/api';
import { NgxPrimengFormService } from '../../services/ngx-primeng-form.service';
import { NgxFormTemplate } from '../../directives/form-template';

@Component({
  selector: 'ngx-primeng-form',
  templateUrl: './ngx-primeng-form.component.html',
  styles: []
})
export class NgxPrimengFormComponent implements OnInit, AfterContentInit {

  // templates
  @ContentChildren(NgxFormTemplate) templates: QueryList<NgxFormTemplate>;
  // form
  _forms: INgxPrimengForm[] = [];
  // instance of the froms
  @Input() form: FormGroup;
  // items of control
  @Input()
  set items(values: INgxPrimengForm[]) {
    if (values && Array.isArray(values)) {
      this._forms = values;
    }
  }

  // custom template
  customControlTemplate: TemplateRef<any>;
  // placeholder template
  placeholderTemplate: TemplateRef<any>;

  constructor(private service: NgxPrimengFormService) { }

  ngOnInit(): void { }

  ngAfterContentInit() {
    if (this.templates) {
      this.templates.forEach((item) => {
        switch (item.getType()) {
          case 'custom': {
            this.customControlTemplate = item.template;
          } break;
          case 'placeholder': {
            this.placeholderTemplate = item.template;
          } break;
        }
      });
    }
  }

  trackByControlName(index: number, el: INgxPrimengForm): string {
    return el.controlName;
  }

  getControl(controlName: string): INgxPrimengForm {
    return this._forms.find(m => m.controlName.toLowerCase() === controlName.toLowerCase());
  }

  getValidations(controlName: string): ValidatorFn[] {
    const control = this.getControl(controlName);
    if (control && control.validation) {
      return this.service.getValidations(control.validation);
    }
    return [];
  }

  setSelectItems(controlName: string, items: SelectItem[]) {
    this.service.setSelectItems(this._forms, controlName, items);
  }

  getProperty<T extends NgxPrimengFormProperty>(controlName: string): T {
    return this.service.getProperty(controlName, this._forms);
  }

}
