import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryService } from './country.service';
import {
  CountriesResponse,
  LeaguesByIdRequest,
  LeaguesResponse,
} from './country.model';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries: CountriesResponse[];
  leagues: LeaguesResponse[];
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  dateSubsc = new Subscription();
  leaguesSubsc = new Subscription();

  constructor(
    private countryService: CountryService,
    private dataStorageService: DataStorageService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnDestroy(): void {
    this.dateSubsc.unsubscribe();
    this.leaguesSubsc.unsubscribe();
  }

  ngOnInit(): void {
    this.countries = this.countryService.getCountries();

    this.dateSubsc = this.countryService.dateChanged.subscribe((date) => {
      this.spinner.show();
      this.dataStorageService.fetchCountries().subscribe((c) => {
        this.countries = c;
        this.spinner.hide();
      });
    });
  }

  toggle = (countryCode: string) => {
    this.countries.forEach((element) => {
      if (element.code === countryCode) {
        if (!element.isExpand) {
          element.isLoading = true;
          const req = this.createLeagueByIdRequest(element);
          this.leaguesSubsc = this.countryService
            .getLeaguesById(req)
            .subscribe((rsp) => {
              this.leagues = rsp;
              element.isLoading = false;
              element.isExpand = !element.isExpand;
            }, err => {
              element.isLoading = false;
              console.log(err);
            });
        } else {
          element.isExpand = !element.isExpand;
        }
      }
    });
  }

  createLeagueByIdRequest = (
    element: CountriesResponse
  ): LeaguesByIdRequest => {
    const req = new LeaguesByIdRequest();
    req.date = this.countryService.getDate();
    req.leagueIds = element.leagues
      .map((league) => {
        return league.leagueId;
      })
      .join(',');

    return req;
  };
}
