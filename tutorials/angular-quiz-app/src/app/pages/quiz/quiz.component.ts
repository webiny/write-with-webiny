import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz = [];
  quizLength = 0
  questions = [];
  questionNumber = 0;
  id!:string;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) { }

  goToNext() {
    this.questionNumber++
  }
  goToPrevious() {
    this.questionNumber--
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.quizService.getQuestions(this.id)
    .valueChanges
    .subscribe(({data}) => {
      this.questions = data.listQuestions.data
      this.quizLength = data.listQuestions.data.length
    })

    this.quizService.getQuiz(this.id)
    .valueChanges
    .subscribe(({data}) => {
      this.quiz = data.getQuiz.data
    })
  }
}