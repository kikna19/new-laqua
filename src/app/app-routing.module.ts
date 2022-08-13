import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'products',
    loadChildren: () => import('../app/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'order',
    loadChildren: () => import('../app/order/order.module').then(m => m.OrderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
