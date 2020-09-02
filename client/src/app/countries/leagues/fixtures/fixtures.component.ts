import { Component, OnInit, Input } from '@angular/core';
import { FixturesResponse } from '../../country.model';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css'],
})
export class FixturesComponent implements OnInit {
  @Input() fixtures: FixturesResponse[];

  constructor() {}

  ngOnInit() {}
}
