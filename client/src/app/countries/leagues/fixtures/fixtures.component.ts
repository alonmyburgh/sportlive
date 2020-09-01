import { Component, OnInit, Input } from '@angular/core';
import { FixturesResponse } from '../../country.model';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  @Input() fixtures: FixturesResponse;

  constructor() {}

  ngOnInit() {}

  isToday = (date: string) => {
    const today = new Date();
    const d = new Date(date);
    return today.setHours(0, 0, 0, 0) === d.setHours(0, 0, 0, 0);
  }
}
