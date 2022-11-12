import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  score: any;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.score = this.quizService.getScore()
  }

}
