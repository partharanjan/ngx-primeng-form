import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormIndexComponent } from './components/dynamic-form-index/dynamic-form-index.component';


const routes: Routes = [{
  path: '',
  component: DynamicFormIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
