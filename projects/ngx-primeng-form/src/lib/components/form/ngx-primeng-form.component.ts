import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { INgxPrimengForm, NgxPrimengFormProperty, NgxPrimengFormType } from '../../interfaces/ngx-primeng-form';
import { SelectItem } from 'primeng/api';
import { NgxPrimengFormService } from '../../services/ngx-primeng-form.service';

@Component({
  selector: 'ngx-primeng-form',
  templateUrl: './ngx-primeng-form.component.html',
  styles: []
})
export class NgxPrimengFormComponent implements OnInit {

  _forms: INgxPrimengForm[] = []
  // instance of the froms
  @Input() form: FormGroup;
  // items of control
  @Input()
  set items(values: INgxPrimengForm[]) {
    if (values && Array.isArray(values)) {
      // no need to render custom control
      this._forms = values.filter(m => m.type != NgxPrimengFormType.custom);
    }
  }

  get items(): INgxPrimengForm[] {
    return this._forms;
  }

  constructor(private service: NgxPrimengFormService) { }

  ngOnInit(): void { }

  trackByControlName(index: number, el: INgxPrimengForm): string {
    return el.controlName;
  }

  getControl(controlName: string): INgxPrimengForm {
    return this.items.find(m => m.controlName.toLowerCase() == controlName.toLowerCase());
  }

  getValidations(controlName: string): ValidatorFn[] {
    const control = this.getControl(controlName);
    if (control && control.validation) {
      return this.service.getValidations(control.validation);
    }
    return [];

  }

  setSelectItems(controlName: string, items: SelectItem[]) {
    this.service.setSelectItems(this.items, controlName, items);
  }

  getProperty<T extends NgxPrimengFormProperty>(controlName: string): T {
    return this.service.getProperty(controlName, this.items);
  }

}
