import { Component, OnInit } from '@angular/core';
import { CountryService } from '../countries/country.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent implements OnInit {
  bsValue = new Date();
  constructor(private countryService: CountryService) {}

  ngOnInit() {}

  onValueChange(value: Date): void {
    this.bsValue = value;
    this.countryService.setDate(this.bsValue);
  }
}
