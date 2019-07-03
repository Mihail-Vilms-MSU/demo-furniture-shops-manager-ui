import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/employee";
import {Shop} from "../model/shop";
import {ShopService} from "../service/shop.service";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  shops: Shop[];

  private fieldsConfig = [
    { field: 'employeeId',
      caption: 'Employee ID',
      type: 'input',
      required: false,
      readonly: true,
      placeholder: 'Employee ID',
      class: 'col-md-6 mb-3',
      update: false
    },
    { field: 'role',
      caption: 'Role',
      type: 'input',
      required: true,
      placeholder: 'Role',
      class: 'col-md-6 mb-3',
      update: true
    },
    {
      field: 'shop',
      caption: 'Shop',
      type: 'select',
      required: true,
      placeholder: 'Shop',
      class: 'col-md-12 mb-3',
      update: true
    },
    { field: 'firstName',
      caption: 'First Name',
      type: 'input',
      required: true,
      placeholder: 'First Name',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'lastName',
      caption: 'Last Name',
      type: 'input',
      required: true,
      placeholder: 'Last Name',
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
    { field: 'email',
      caption: 'Email',
      type: 'input',
      required: true,
      placeholder: 'Email',
      class: 'col-md-6 mb-3',
      update: true
    },
    { field: 'createdAt',
      caption: 'Created at',
      type: 'input',
      required: false,
      readonly: true,
      placeholder: 'Created at',
      class: 'col-md-6 mb-3',
      update: false
    },
    { field: 'updatedAt',
      caption: 'Updated at',
      type: 'input',
      required: false,
      readonly: true,
      placeholder: 'Updated at',
      class: 'col-md-6 mb-3',
      update: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.getShops();
    this.getEmployee();
  }

  getShops(): void {
    this.shopService.getShops()
      .subscribe(shopsResponse => {
        this.shops = shopsResponse['_embedded'].shops;
      });
  }

  getEmployee() {
    const employeeId = this.route.snapshot.paramMap.get('id');

    const employee = this.employeeService.getEmployee(employeeId);

    this.employeeService.getEmployee(employeeId)
      .subscribe(employee => {
        this.employee = employee;
        this.fieldsConfig = this.fieldsConfig
          .map(fieldInfo => {
            const field = fieldInfo['field'];

            if (field === 'shop') {
              fieldInfo['value'] = this.employee[fieldInfo['field']]['shopId'];
              return fieldInfo;
            }

            fieldInfo['value'] = this.employee[fieldInfo['field']];
            return fieldInfo;
          });
      });
  }

  save(): void {
    let jsonEmployee = {};
    let shopId;

    this.fieldsConfig.forEach(fieldInfo => {
      if (!fieldInfo['update']) return false;

      if (fieldInfo.field === 'shop') {
        shopId = fieldInfo['value'];
        return false;
      }

      jsonEmployee[fieldInfo.field] = fieldInfo['value'];
    });

    this.employeeService.saveEmployee(jsonEmployee as Employee, this.employee.employeeId, shopId).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }
}
