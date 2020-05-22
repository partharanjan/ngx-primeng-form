import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  // add option
  @Input() addOptionLabel: string = null;
  // on add option
  @Output() onAddOption = new EventEmitter<void>();
  // hints text
  @Input() helpText: string = null;

  constructor() { }

  ngOnInit(): void {
  }

  handleOnAdd() {
    this.onAddOption.emit();
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
