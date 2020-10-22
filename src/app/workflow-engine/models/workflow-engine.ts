export interface IFormField {
    key: string;
    name: string;
    property: IFormFieldProperty;
}

export interface IFormFieldProperty {
    type: string;
    attributes?: any;
}
