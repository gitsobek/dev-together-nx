import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dev-together-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly tags: string[] = [
    'Angular',
    'React',
    'Vue.js',
    'RxJS',
    'Java',
    'Kotlin',
    'Go',
    'Docker',
    'Kubernetes'
  ];

  constructor() { 
  }

  ngOnInit(): void {
  }

}
