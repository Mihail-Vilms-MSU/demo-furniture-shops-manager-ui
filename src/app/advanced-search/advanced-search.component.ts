import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AdvancedSearchService} from '../service/advanced-search.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  private isAdvancedSearchActive;
  private currentConfig;
  private stringInput;
  private searchInput;

  constructor(
    private router: Router,
    private advancedSearchService: AdvancedSearchService
  ) {}

  ngOnInit() {
    this.isAdvancedSearchActive = false;
    this.stringInput = '';
    this.searchInput = {};

    this.refreshConfig();
  }

  switchAdvancedSearchActive() {
    this.isAdvancedSearchActive = !this.isAdvancedSearchActive;
  }

  getCurrentTable() {
    const splitUrl = this.router.url.split('/');
    return splitUrl[splitUrl.length - 1];
  }

  refreshConfig() {
    this.currentConfig = this.getConfig(this.getCurrentTable());
  }

  executeSearch() {
    if (this.isAdvancedSearchActive) {
      this.executeAdvancedSearch();
    } else {
      this.executeLiveSearch();
    }
  }

  executeAdvancedSearch() {
    console.log('~~~ executeAdvancedSearch() ~~~');
    this.refreshConfig();
  }

  executeLiveSearch() {
    console.log('~~~ executeLiveSearch() ~~~');
  }

  cleanInput() {
    this.stringInput = '';
    this.searchInput = {};

    this.refreshConfig();
  }

  getConfig(table) {
    const searchConfig = {
      shops: [
        {
          name: 'name',
          caption: 'Shop Title',
          tag: 'input',
          type: 'text',
          class: 'form-control',
        },
        {
          name: 'state',
          caption: 'State',
          tag: 'select',
          class: 'form-control',
        },
        {
          name: 'city',
          caption: 'City',
          tag: 'select',
          class: 'form-control',
        }
      ],

      employees: [
        {
          name: 'shop',
          caption: 'Shop Id',
          tag: 'select',
          class: 'form-control',
        },
        { name: 'role',
          caption: 'Role',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        },
        {
          name: 'firstName',
          caption: 'First Name',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        },
        {
          name: 'lastName',
          caption: 'Last Name',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        }
      ]
    };

    return searchConfig[table].map((field) => {
      if (field['tag'] === 'select') {
        this.advancedSearchService.getValuesForDropdown(table, field['name'], this.searchInput)
          .subscribe(optionsResponse => {
            field['options'] = optionsResponse;
          });
      }
      return field;
    });
  }


}
