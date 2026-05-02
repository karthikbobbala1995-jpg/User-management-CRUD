import { Routes } from '@angular/router';
import { Dashboard } from '../Components/dashboard/dashboard';

export const routes: Routes = [
    {
        path:'',
        component:Dashboard
    },
    {
        path:'add',
        loadComponent:() => import('../Components/add/add').then((m)=>m.Add)
    }
];
