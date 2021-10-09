import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-form-help-text',
  templateUrl: './form-help-text.component.html',
  styleUrls: ['./form-help-text.component.css']
})
export class FormHelpTextComponent implements OnInit {

  // help text
  @Input() text:string;

  constructor() { }

  ngOnInit(): void {
  }

}
