import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'ngx-form-control-layout',
  templateUrl: './form-control-layout.component.html',
  styleUrls: []
})
export class FormControlLayoutComponent implements OnInit {

  // label name
  @Input() label: string;
  // form group instance
  @Input() form: FormGroup;
  // control name
  @Input() control: string;

  constructor() { }

  ngOnInit(): void {
  }

  get isRequired(): boolean {
    const control = this.form.controls[this.control];
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

}
