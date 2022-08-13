import {Injectable} from '@angular/core';
import {Purchase} from "../../shared/types/purchase.interface";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class OrderService {
  purchaseInfo = new BehaviorSubject<Purchase>(
    {
      name: '',
      surname: '',
      mobile: '',
      address: '',
      city: ''
    });

  constructor() { }
}
