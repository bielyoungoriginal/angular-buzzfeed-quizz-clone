import { Component, OnInit } from '@angular/core';
import quizes from ".app/component/quizes/quizes.json"

@Component({
  selector: 'app-quizes',
  standalone: true,
  imports: [],
  templateUrl: './quizes.component.html',
  styleUrl: './quizes.component.css'
})

export class QuizesComponent implements OnInit {
  title:string = ""
  questions:any
  questionSelect:any
  answers:string[] = []
  answerSelect:string = ""
  questionIndex:number = 0
  questionMaxIndex:number = 0
  finished:boolean = false

  constructor() { }

  ngOnInit(): void{
    if(quizes){
      this.finished = false
      this.title = quizes.title

      this.questions = quizes.questions
      this.questionSelect = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelect = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelect = quizes.results[finalAnswer as keyof typeof quizes.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}