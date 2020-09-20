import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryService } from './country.service';
import {
  CountriesResponse,
  LeaguesByIdRequest,
  LeaguesResponse,
} from './country.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { LeaguesService } from './leagues/leagues.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries: CountriesResponse[];
  leagues: LeaguesResponse[];
  isShowError: boolean;
  dateSubsc = new Subscription();
  leaguesSubsc = new Subscription();
  errorSubsc = new Subscription();

  constructor(
    private countryService: CountryService,
    private dataStorageService: DataStorageService,
    private spinner: NgxSpinnerService,
    private leaguesService: LeaguesService
  ) {}
  ngOnDestroy(): void {
    this.dateSubsc.unsubscribe();
    this.leaguesSubsc.unsubscribe();
    this.errorSubsc.unsubscribe();
  }

  ngOnInit(): void {
    this.countries = this.countryService.getCountries();

    this.leaguesSubsc = this.leaguesService.leagueLoaded.subscribe(
      (countryCode) => {
        this.countries.forEach((element) => {
          if (element.code === countryCode) {
            element.isLoading = false;
          }
        });
      }
    );

    this.dateSubsc = this.countryService.dateChanged.subscribe((date) => {
      this.spinner.show();
      this.dataStorageService.fetchCountries().subscribe(
        (c) => {
          this.countries = c;
          this.countryService.setError(false);
          this.spinner.hide();
        },
        (err) => {
          console.log(err);
          this.countries = [];
          this.countryService.setError(true);
          this.spinner.hide();
        }
      );
    });

    this.errorSubsc = this.countryService.errorChanged.subscribe((error) => {
      this.isShowError = error;
    });

    this.isShowError = this.countryService.getError();
  }

  toggle = (countryCode: string) => {
    this.countries.forEach((element) => {
      if (element.country === countryCode) {
        if (!element.isExpand) {
          element.isLoading = true;
          const req = this.createLeagueByIdRequest(element);
          this.leaguesService.setLeaguesByIdRequest(req);
          element.isExpand = !element.isExpand;
        } else {
          element.isExpand = !element.isExpand;
        }
      }
    });
  };

  createLeagueByIdRequest = (
    element: CountriesResponse
  ): LeaguesByIdRequest => {
    const req = new LeaguesByIdRequest();
    req.date = this.countryService.getDate();
    req.countryCode = element.code;
    req.leagueIds = element.leagues
      .map((league) => {
        return league.leagueId;
      })
      .join(',');

    return req;
  };
}
