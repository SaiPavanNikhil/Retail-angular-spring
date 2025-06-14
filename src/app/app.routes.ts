import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from "./auth.guard";

import { VendorComponent } from './pages/dashboard/vendor/vendor.component';
import { ProductComponent } from './pages/dashboard/product/product.component';
import { OrderComponent } from './pages/dashboard/order/order.component';
import { ReportComponent } from './pages/dashboard/report/report.component';
import { UploadComponent } from './pages/dashboard/upload/upload.component';
import { ViewComponent } from './pages/dashboard/view/view.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'signin', component: SigninComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
      { path: 'vendor', component: VendorComponent },
      { path: 'product', component: ProductComponent },
      { path: 'order', component: OrderComponent },
      { path: 'report', component: ReportComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'view', component: ViewComponent }
    ]},
    { path: '**', redirectTo: '' }
]; 
