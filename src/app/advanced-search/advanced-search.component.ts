import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AdvancedSearchService} from '../service/advanced-search.service';
import {EventEmitterService} from "../service/event-emitter.service";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  private currentConfig;
  private searchParams;

  constructor(
    private router: Router,
    private advancedSearchService: AdvancedSearchService,
    private eventEmitterService: EventEmitterService,
  ) {}

  ngOnInit() {
    this.searchParams = {};
    this.refreshConfig();
  }

  getCurrentTable() {
    const splitUrl = this.router.url.split('/');
    return splitUrl[splitUrl.length - 1];
  }

  refreshConfig() {
    this.currentConfig = this.getConfig(this.getCurrentTable());
  }

  executeAdvancedSearch() {
    this.eventEmitterService.executeAdvancedSearch(this.getCurrentTable(), this.searchParams);
    this.refreshConfig();
  }

  cleanInput() {
    this.searchParams = {};
    this.eventEmitterService.executeAdvancedSearch(this.getCurrentTable(), this.searchParams);
    this.refreshConfig();
  }

  getConfig(table) {
    const searchConfig = {
      products: [
        { name: 'name',
          caption: 'Product Title',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        },
        { name: 'type',
          caption: 'Category',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        },
        {
          name: 'minPrice',
          caption: 'Minimal price',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        },
        { name: 'maxPrice',
          caption: 'Maximal price',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        }
      ],
      shops: [
        { name: 'name',
          caption: 'Shop Title',
          tag: 'input',
          type: 'text',
          class: 'form-control',
        },
        { name: 'state',
          caption: 'State',
          tag: 'select',
          class: 'form-control',
        },
        { name: 'city',
          caption: 'City',
          tag: 'select',
          class: 'form-control',
        }
      ],

      employees: [
        // { name: 'shop',
        //   caption: 'Shop Id',
        //   tag: 'select',
        //   class: 'form-control',
        // },
        { name: 'role',
          caption: 'Role',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        },
        { name: 'firstName',
          caption: 'First Name',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        },
        { name: 'lastName',
          caption: 'Last Name',
          tag: 'input',
          type: 'text',
          class: 'form-control'
        }
      ]
    };

    return searchConfig[table].map((field) => {
      if (field['tag'] === 'select') {
        this.advancedSearchService.getValuesForDropdown(table, field['name'], this.searchParams)
          .subscribe(optionsResponse => {
            field['options'] = optionsResponse;
          });
      }
      return field;
    });
  }
}
