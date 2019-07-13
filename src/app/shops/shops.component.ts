import {Component, OnInit} from '@angular/core';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';
import {EventEmitterService} from '../service/event-emitter.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops: Shop[];

  currentPage: number;
  sizeOfPage: number;
  numberOfElements: number;
  numberOfPages: number;

  sortField: string;
  sortOrder: string;

  pages: number[]; // numbers of all pages [1;2...]

  inputSearch: string;
  searchParams;

  constructor(
    private shopService: ShopService,
    private eventEmitterService: EventEmitterService
  ) {  }


  ngOnInit() {
    this.getShops(0, 5, 'name', 'asc', null, null);

    this.eventEmitterService.invokeLiveSearchOnShops.subscribe((searchInput) => {
      this.getShops(0, this.sizeOfPage, this.sortField, this.sortOrder, searchInput, null);
    });

    this.eventEmitterService.invokeAdvancedSearchOnShops.subscribe((searchParams) => {
      this.getShops(0, this.sizeOfPage, this.sortField, this.sortOrder, null, searchParams);
    });
  }

  getShops(page, size, sortField, sortOrder, searchInput, searchParams): void {
    this.shopService.getShops(page, size, sortField, sortOrder, searchInput, searchParams)
      .subscribe(response => {
        this.shops = response['_embedded']['shops'];

        this.currentPage    = response['page']['number'];
        this.sizeOfPage     = response['page']['size'];
        this.numberOfElements  = response['page']['totalElements'];
        this.numberOfPages     = response['page']['totalPages'];

        this.sortField = sortField;
        this.sortOrder = sortOrder;

        this.pages = Array.from(Array(this.numberOfPages), (x, index) => index + 1);

        this.inputSearch = searchInput;
        this.searchParams = searchParams;
      });
  }

  getAnotherPage(page): void {
    this.getShops(page, this.sizeOfPage, this.sortField, this.sortOrder, this.inputSearch, this.searchParams);
  }

  getAnotherSortOrder(sortField): void {
    let sortOrder = 'asc';
    if (sortField === this.sortField && this.sortOrder === 'asc') {
      sortOrder = 'desc';
    }

    this.getShops(this.currentPage, this.sizeOfPage, sortField, sortOrder, this.inputSearch, this.searchParams);
  }

}
