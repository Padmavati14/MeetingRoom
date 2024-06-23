import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MeetingDashboardComponent } from './meeting-dashboard/meeting-dashboard.component';


export const routes: Routes = [
    {path : 'login',component:LoginPageComponent},
    {path : 'dashboard',component:MeetingDashboardComponent}
];
