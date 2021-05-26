import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[formTemplate]',
    host: {}
})
export class NgxFormTemplate {

    @Input('formTemplate') name: string;

    constructor(public template: TemplateRef<any>) { }

    getType(): string {
        return this.name;
    }
}