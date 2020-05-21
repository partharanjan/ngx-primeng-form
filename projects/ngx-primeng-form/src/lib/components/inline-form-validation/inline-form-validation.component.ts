import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-inline-form-validation',
  templateUrl: './inline-form-validation.component.html',
  styleUrls: []
})
export class InlineFormValidationComponent implements OnInit, OnDestroy {

  // store all subscriptions
  private subscription = new Subscription();

  // formgroup instance
  @Input() form: FormGroup;
  // control name
  @Input() control: string;
  // display name
  @Input() displayName: string;
  // error 
  error = { generic: false, required: false, message: '' };

  constructor() { }

  ngOnInit() {
    // register validation event
    this.registerValidationEvent();
  }

  private registerValidationEvent() {
    if (this.isValidInput) {
      const control = this.form.controls[this.control];
      if (control) {
        const ref = control.statusChanges.subscribe(value => {
          // reset
          this.error = { generic: false, message: '', required: false };
          // check for invalid
          if (value === 'INVALID') {
            // set the message
            this.error = {
              generic: true,
              message: this.getMessage(control),
              required: false
            };
          }
        });
        this.subscription.add(ref);
      }
    }
  }

  private getMessage(control: AbstractControl): string {
    if (control.errors) {
      const errorIds: string[] = Object.keys(control.errors);
      // handle only one error at a time
      switch (errorIds[0]) {
        case 'required': {
          // without touch or dirty we can fire required validator
          if (control.touched || control.dirty) {
            return `${this.displayName} is required`;
          }
          return null;
        }
        case 'minlength': {
          return `Minimum length is ${control.errors.minlength.requiredLength}`;
        }
        case 'maxlength': {
          return `Maximum length is ${control.errors.maxlength.requiredLength}`;
        }
        case 'min': {
          return `Minimum ${this.displayName} is ${control.errors.min.min}`;
        }
        case 'max': {
          return `Maximum ${this.displayName} is ${control.errors.max.max}`;
        }
        case 'pattern': {
          return `Invalid ${this.displayName} format`;
        }
        default: {
          if (control.errors.hasOwnProperty(errorIds[0])) {
            return control.errors[errorIds[0]];
          }
          return 'Validation error';
        }
      }
    }
    return null;
  }

  get hasRequiredError() {
    if (this.isValidInput) {
      // check for is required already fired or not
      if (this.error.required) {
        return true;
      }
      const control = this.form.controls[this.control];
      if (control) {
        if (control.invalid && control.touched && control.errors.required) {
          this.error = {
            generic: false,
            message: this.getMessage(control),
            required: true
          };
          return true;
        }
      }
    }
    return false;
  }

  get isValidInput() {
    return this.form && this.control ? true : false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
