import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewArticlePageComponent } from './new-article-page/new-article-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

import { AdminGuard } from './auth/admin.guard';
import { WriterGuard } from './auth/writer.guard';
import { BreakingNewsPageComponent } from './breaking-news-page/breaking-news-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'breaking', component: BreakingNewsPageComponent},
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'newarticle', component: NewArticlePageComponent, canActivate: [WriterGuard]},
  { path: 'article/:_id', component:  ArticlePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
