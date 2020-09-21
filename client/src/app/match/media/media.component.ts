import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Teams } from '../../countries/country.model';
import { MediaModel } from '../match.model';
import { MatchService } from '../match.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent implements OnInit, OnDestroy {
  @Input() teams: Teams;
  searchQuery: string;
  subs: Subscription;
  twits: MediaModel;

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.searchQuery = `#SofaScore #${this.teams.home.name
      .substring(0, 3)
      .toUpperCase()} #${this.teams.away.name.substring(0, 3).toUpperCase()}`;
    this.subs = this.matchService.getTwitterMedia(this.searchQuery).subscribe(
      (rsp: MediaModel) => {
        this.twits = rsp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
