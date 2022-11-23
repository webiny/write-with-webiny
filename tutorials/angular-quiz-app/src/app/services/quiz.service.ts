import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'

const GET_QUIZZES = gql`{
    listQuizzes {
      data {
        id
        name
        description
      }
    }
  }
`

const GET_QUESTIONS = gql`
  query GetQuestions($where:QuestionListWhereInput){
    listQuestions(where: $where) {
      data {
        title
        option1
        option2
        option3
        option4
        answer
      }
    }
  }
`

const GET_QUIZ = gql`
  query GetQuiz($where:QuizGetWhereInput!){
    getQuiz(where: $where) {
      data {
       name
       description
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  answers: any[] = []
  attempts = 0
  wrongAnswers = 0
  correctAnswers = 0
  quizLength = 0

  constructor(private apollo: Apollo) { }

  getQuizzes() {
    return this.apollo.watchQuery<any>({
      query: GET_QUIZZES
    })
  }

  getQuestions(id:string) {
    return this.apollo.watchQuery<any>({
      query: GET_QUESTIONS,
      variables: {
        where: {ref: {id}}
      }
    })
  }

  getQuiz(id:string) {
    return this.apollo.watchQuery<any>({
      query: GET_QUIZ,
      variables: {
        where: {id}
      }
    })
  }

  pickedAnswer(selectedOption:string, correctAnswer:string, questionNumber:number) {
    let alreadyAnswered = this.answers.filter(answer => (
      Object.values(answer).includes(questionNumber)
    )).length
    if(alreadyAnswered === 0){
      this.answers = [...this.answers, {questionNumber, selectedOption, correctAnswer}]
    }else {
      let answerIndex = this.answers.findIndex(answer => (
        questionNumber === answer.questionNumber
      ))
      this.answers[answerIndex].selectedOption = selectedOption
    }
  }

  score(quizLength:number) {
    this.quizLength = quizLength
    this.attempts = this.answers.length
    this.wrongAnswers = 0
    this.answers.forEach((answer) => {
      if(answer.selectedOption.trim() !== answer.correctAnswer.trim()) {
        this.wrongAnswers++
      }else{
        this.correctAnswers++
      }
    })
  }
  
  getScore() {
    return {
      quizLength: this.quizLength,
      attempts: this.attempts,
      wrongAnswers: this.wrongAnswers,
      correctAnswers: this.correctAnswers
    }
  }
}
