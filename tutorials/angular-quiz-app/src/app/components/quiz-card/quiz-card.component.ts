import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {

  @Input() quizData: any;
  questionsLength = 0

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuestions(this.quizData.id).valueChanges.subscribe(({data}) => {
      console.log(this.quizData.id)
      this.questionsLength = data.listQuestions.data.length
    })
  }

}
