import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dynamic-form'
  },
  {
    path: 'dynamic-form',
    loadChildren: () => import('./dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule)
  },
  {
    path: 'workflow-engine',
    loadChildren: () => import('./workflow-engine/workflow-engine.module').then(m => m.WorkflowEngineModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
