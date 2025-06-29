import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/NotFound/not-found/not-found.component';
import { Signup } from './pages/SignUpPage/signup';
import { Home } from './pages/Home/home';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { AuthGuard } from './services/guards/auth-guard';
import { AdminGuard } from './services/guards/admin-guard';
import { Profile } from './pages/profile/profile';
import { Welcome } from './pages/admin-dashboard/welcome/welcome';


export const routes: Routes = [
  
  {path:'',component:Home},
  { path: 'signup', component:Signup  },
  { path: 'login', component:Login},
  { path: 'admin', component:AdminDashboard,
    children:[
      {path:'',component:Welcome},
      {path:'adminprofile',component:Profile}
    ] 
    ,canActivate:[AdminGuard]},
  { path: 'user', component:UserDashboard , canActivate:[AuthGuard] },


  { path: '**', component: NotFoundComponent }

];

export class AppRoutingModule {}