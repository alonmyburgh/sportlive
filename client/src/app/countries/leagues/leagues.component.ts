import { Component, OnInit, Input } from '@angular/core';
import { LeaguesResponse } from '../country.model';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {
  @Input() leagues: LeaguesResponse[];

  constructor() {}
  
  ngOnInit() {
    
  }
}
