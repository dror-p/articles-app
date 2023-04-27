import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';
import { AngularWeatherWidgetModule } from 'angular2-weather-widget';
import { AppRoutingModule } from './app-routing.module';
import { DemoMaterialModule } from './material-module';
import { AvatarModule } from 'ngx-avatar';
import { GoogleMapsModule } from '@angular/google-maps'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderComponent } from './header/header.component';
import { FieldsComponent } from './fields/fields.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NewArticlePageComponent } from './new-article-page/new-article-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { MapComponent } from './admin-page/map/map.component';
import { BreakingNewsPageComponent } from './breaking-news-page/breaking-news-page.component';
import { ArticleTableComponent } from './admin-page/article-table/article-table.component';

const config: SocketIoConfig = { url: 'http://localhost:14001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    FieldsComponent,
    NewsComponent,
    ArticleComponent,
    HomepageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminPageComponent,
    NewArticlePageComponent,
    ArticlePageComponent,
    LogoutPageComponent,
    MapComponent,
    BreakingNewsPageComponent,
    ArticleTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    AngularWeatherWidgetModule,
    CommonModule,
    HttpModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    SocketIoModule.forRoot(config)
    ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }