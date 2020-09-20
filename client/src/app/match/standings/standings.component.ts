import { Component, Input, OnInit } from '@angular/core';
import { Teams } from '../../countries/country.model';
import { StandingsResponse } from '../match.model';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {
  @Input() standings: StandingsResponse;
  @Input() teams: Teams;
  selectedFilter: string;
  isFormSelected: boolean;

  constructor() {}

  ngOnInit(): void {
    this.selectedFilter = 'all';
    this.isFormSelected = false;
  }

  onFormToggle = () => {
    this.isFormSelected = !this.isFormSelected;
  }

  splitStr = (form: string) => {
    if(form === null) {
      return [];
    }
    return [...form];
  }
}
