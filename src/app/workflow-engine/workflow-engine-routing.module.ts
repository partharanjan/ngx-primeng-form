import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowIndexComponent } from './components/workflow-index/workflow-index.component';


const routes: Routes = [{
  path: '',
  component: WorkflowIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowEngineRoutingModule { }
