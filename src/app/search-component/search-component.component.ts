import {Component, OnInit} from '@angular/core';
import {EventEmitterService} from '../service/event-emitter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})

export class SearchComponentComponent implements OnInit {
  private isAdvancedSearchOn;

  private inputValue;
  private inputValueTemp;

  constructor(
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdvancedSearchOn = false;
  }

  switchAdvancedSearchState() {
    this.isAdvancedSearchOn = !this.isAdvancedSearchOn;

    if (this.isAdvancedSearchOn) { // advanced searched turned on
      this.inputValueTemp = this.inputValue;
      this.inputValue = '';
    } else { // advanced search turned off
      this.inputValue = this.inputValueTemp || '';
    }
  }

  getCurrentTable() {
    const splitUrl = this.router.url.split('/');
    return splitUrl[splitUrl.length - 1];
  }

  executeSearch() {
    if (this.isAdvancedSearchOn) {
      this.executeAdvancedSearch();
    } else {
      this.executeLiveSearch();
    }
  }

  executeAdvancedSearch() {
    console.log('in executeAdvancedSearch(): TODO');
  }

  executeLiveSearch() {
    console.log(' ~~~ Live search for table: ' + this.getCurrentTable() + '; inputValue: ' + this.inputValue);
    this.eventEmitterService.executeLiveSearch(this.getCurrentTable(), this.inputValue);
  }
}
