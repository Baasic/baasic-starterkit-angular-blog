import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';
import { PublicLayout, MainLayout } from 'layouts';
import { NoContentRoute } from 'routes';

export const ROUTES: Routes = [
  { path: '', component: PublicLayout },
  { path: '', component: MainLayout },
  // {
  //   path: 'detail', loadChildren: () => System.import('./+detail').then((comp: any) => {
  //     return comp.default;
  //   })
  //   ,
  // },
  { path: '**', component: NoContentRoute },
];
