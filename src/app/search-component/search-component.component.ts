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

  constructor(
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdvancedSearchOn = false;
  }

  switchAdvancedSearchState() {
    this.isAdvancedSearchOn = !this.isAdvancedSearchOn;
  }

  getCurrentTable() {
    const splitUrl = this.router.url.split('/');
    return splitUrl[splitUrl.length - 1];
  }

  executeSearch() {
    if (!this.isAdvancedSearchOn) {
      this.executeLiveSearch();
    } else {
      this.executeAdvancedSearch();
    }
  }

  executeAdvancedSearch() {
    console.log('in executeAdvancedSearch(): TODO');
  }

  executeLiveSearch() {
    this.eventEmitterService.executeLiveSearch({
      isAdvanced: this.isAdvancedSearchOn,
      input: this.inputValue,
      table: this.getCurrentTable()
    });
  }
}
