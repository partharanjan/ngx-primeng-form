import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-code-view',
  templateUrl: './code-view.component.html',
  styleUrls: ['./code-view.component.css']
})
export class CodeViewComponent implements OnInit {

  code: any;
  constructor(private dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.code = this.dialogConfig.data;
  }

}
