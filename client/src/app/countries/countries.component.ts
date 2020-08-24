import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CountryService } from './country.service';
import { CountriesResponse } from './country.model';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries: CountriesResponse[];
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  dateSubsc = new Subscription();

  constructor(
    private countryService: CountryService,
    private dataStorageService: DataStorageService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnDestroy(): void {
    this.dateSubsc.unsubscribe();
  }

  ngOnInit() {
    this.countries = this.countryService.getCountries();

    this.dateSubsc = this.countryService.dateChanged.subscribe((date) => {
      this.spinner.show();
      this.dataStorageService.fetchCountries().subscribe((c) => {
        this.countries = c;
        this.spinner.hide();
      });
    });
  }

  toggle(countryCode: string) {
    this.countries.forEach((element) => {
      if (element.code === countryCode) {
        element.isExpand = !element.isExpand;
      }
    });
  }
}
