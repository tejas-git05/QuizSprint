import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/NotFound/not-found/not-found.component';
import { Signup } from './pages/SignUpPage/signup';
import { Home } from './pages/Home/home';
import { Login } from './pages/login/login';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';
import { AuthGuard } from './services/guards/auth-guard';
import { AdminGuard } from './services/guards/admin-guard';
import { Profile } from './pages/profile/profile';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { Welcome } from './pages/admin/welcome/welcome';
import { ViewCategory } from './pages/admin/view-category/view-category';
import { AddCategory } from './pages/admin/add-category/add-category';
import { ViewQuiz } from './pages/admin/view-quiz/view-quiz';
import { AddQuiz } from './pages/admin/add-quiz/add-quiz';
import { UpdateQuiz } from './pages/admin/update-quiz/update-quiz';
import { ViewQuizQuestions } from './pages/admin/view-quiz-questions/view-quiz-questions';
import { AddQuestions } from './pages/admin/add-questions/add-questions';
import { LoadQuiz } from './pages/user/load-quiz/load-quiz';
import { Instructions } from './pages/user/instructions/instructions';


export const routes: Routes = [

  {path:'',component:Home},
  { path: 'signup', component:Signup  },
  { path: 'login', component:Login},

  // admin
  { path: 'admin', component:AdminDashboard,
    children:[
      {path:'',component:Welcome},
      {path:'adminprofile',component:Profile},
      {path:'viewCategory',component:ViewCategory},
      {path:'addCategory',component:AddCategory},
      {path:'viewQuiz',component:ViewQuiz},
      {path:'addQuiz',component:AddQuiz},
      {path:'updateQuiz/:qid',component:UpdateQuiz},
      {path:'viewQuestions/:qid/:title',component:ViewQuizQuestions},
      {path:'addQuestions/:qid/:title',component:AddQuestions},
    ] 
    ,canActivate:[AdminGuard]},

    // user
  { path: 'user', component:UserDashboard,
    children: [
      {path: ':catId', component: LoadQuiz},
      {path: 'instructions/:qid', component: Instructions},
    ]
    , canActivate:[AuthGuard] },


  // NO FOUND COMPONENT
  { path: '**', component: NotFoundComponent }

];

export class AppRoutingModule {}