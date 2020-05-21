import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { INgxPrimengForm, NgxPrimengFormService } from 'projects/ngx-primeng-form/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  formItems: INgxPrimengForm[] = [];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: NgxPrimengFormService) {
    // init form
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.loadForms();
  }

  private loadForms() {
    this.http.get<INgxPrimengForm[]>(`./assets/form.json`).subscribe(forms => {
      this.service.prepareControl(this.form, forms);
      this.formItems = this.service.jsonToForm(forms);
    });
  }

  submit() {
    console.log(this.form.value);
  }

}
