import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';
import { MainLayout, MasterLayout } from 'layouts';
import { NoContentRoute } from 'routes';

export const ROUTES: Routes = [
  { path: '', component: MainLayout },
  { path: '', component: MasterLayout },
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail').then((comp: any) => {
  //     return comp.default;
  //   })
  //   ,
  // },
  { path: '**', component: NoContentRoute },
];
