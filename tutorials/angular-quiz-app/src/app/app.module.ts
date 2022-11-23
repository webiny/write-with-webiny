import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule } from 'apollo-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ScoreComponent } from './pages/score/score.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizzesComponent,
    QuizComponent,
    ScoreComponent,
    QuizCardComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
