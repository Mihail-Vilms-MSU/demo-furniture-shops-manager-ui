import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';
import {Shop} from '../model/shop';
import {ShopService} from '../service/shop.service';
import {Employee} from "../model/employee";

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {
  shops: Shop[];

  private fieldsConfig = [
    { field: 'firstName',
      caption: 'First name',
      type: 'input',
      required: true,
      placeholder: 'First name',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'lastName',
      caption: 'Last name',
      type: 'input',
      required: true,
      placeholder: 'Last name',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'email',
      caption: 'Email',
      type: 'input',
      required: true,
      placeholder: 'Email',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'phone',
      caption: 'Phone',
      type: 'input',
      required: true,
      placeholder: 'Phone',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'shop',
      caption: 'Shop',
      type: 'select',
      required: true,
      placeholder: 'Shop',
      class: 'col-md-6 mb-3',
      update: true
    },
    {
      field: 'role',
      caption: 'Role',
      type: 'input',
      required: true,
      placeholder: 'Role',
      class: 'col-md-6 mb-3',
      update: true
    }
  ];

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private shopService: ShopService
  ) { }

  ngOnInit() {
    this.getShops();
  }

  getShops(): void {
    this.shopService.getShops()
      .subscribe(shopsResponse => {
        this.shops = shopsResponse['_embedded'].shops;
      });
  }

  add(): void {
    let jsonEmployee = {};
    let shopId;

    this.fieldsConfig.forEach(fieldInfo => {
      if (!fieldInfo['update']) return false;

      if (fieldInfo.field === 'shop') {
        console.log('fieldInfo 111 : ' + fieldInfo['value']);

        shopId = fieldInfo['value'];
        return false;
      }

      jsonEmployee[fieldInfo.field] = fieldInfo['value'];
    });

    this.employeeService.addEmployee(jsonEmployee as Employee, shopId).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
