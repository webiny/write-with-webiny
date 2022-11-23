import { Component, OnInit} from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: any;
  @Input() questionNumber!:number;
  @Input() quiz: any;
  @Input() quizLength!:number;
  selectedOption = ''
  @Output() nextQuestion: EventEmitter<any> = new EventEmitter();
  @Output() prevQuestion: EventEmitter<any> = new EventEmitter();

  constructor(private quizService: QuizService, private router: Router) { }

  selectOption(selectedOption:string, correctAnswer:string, questionNumber:number) {
    this.selectedOption = selectedOption
    this.quizService.pickedAnswer(selectedOption, correctAnswer, questionNumber)
  }

  score() {
    this.quizService.score(this.quizLength)
    this.router.navigate(['/score']);
  }

  ngOnChanges() {
    let answer = this.quizService.answers.filter((answer) => (
      this.questionNumber === answer.questionNumber
    ))
    this.selectedOption = answer[0]?.selectedOption
  }

  ngOnInit(): void {
  }

}
