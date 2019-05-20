import {Shop} from './shop';
import {Employee} from './employee';

export class Purchase {
  purchaseId: number;
  shop: Shop;
  employee: Employee;
  totalPrice: string; // BigDecimal in java
  registeredAt: Date; // Date in java
}
