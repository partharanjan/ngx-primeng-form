import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {

  @Input() form: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  handleAdd() {
    this.form.push(this.getForm());
  }

  handleDelete(index: number) {
    this.form.removeAt(index);
  }

  getForm(): FormGroup {
    const formGroup = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.required])
    });
    return formGroup;
  }

}
