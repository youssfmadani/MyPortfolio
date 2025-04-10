import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  ngOnInit() {
  console.info('%cSTOP', 'color: red; font-size: 40px;');
  console.info("%cThis is a browser feature intended for Developers.", 'font-size: 20px;');
  console.info("%cIf You are really interested in how it works, Visit the below Link", 'font-size: 20px;');
  console.info("https://github.com/sanjaykrishna1203/Angular-Portfolio.git")
  }
}
