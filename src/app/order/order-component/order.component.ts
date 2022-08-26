import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../services/order.service";
import {objValues, Purchase} from "../../shared/types/purchase.interface";
import {FormValidator} from "../../shared/validators/form.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderComponent implements OnInit {
  form: FormGroup;
  mobileExp = (/^5\d{2}(-\d{2}){3}$/);
  addressExp = (/^[a-z]*\sN\d{2}$/);

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: [undefined, [
        FormValidator.required,
        FormValidator.minLength(2),
        FormValidator.maxLength(30)]],
      surname: [undefined, [
        FormValidator.required,
        FormValidator.minLength(2),
        FormValidator.maxLength(30)]],
      mobile: [undefined, [
        FormValidator.required,
        FormValidator.pattern(this.mobileExp)]],
      city: [undefined, [
        FormValidator.required,
        FormValidator.minLength(2),
        FormValidator.maxLength(30),
      ]],
      address: [undefined, [
        FormValidator.required,
        FormValidator.maxLength(30),
        FormValidator.pattern(this.addressExp)]],
    })
  }

  ngOnInit(): void {

  }

  get(control: string): any {
    return this.form.get(control)
  }

  errors(control: string): string[] | null {
    const errors: any = this.form.get(control)?.errors;
    if (this.get(control)?.touched && this.get(control)?.invalid) {
      return Object.values(errors);
    }
    return null
  }

  confirm(): void {
    if (this.form.valid) {
      const controls = this.form.controls;
      const [name, surname, mobile, city, address] = objValues<string>(controls);
      this.orderService.purchaseInfo.next({
        name: name,
        surname: surname,
        mobile: mobile,
        city: city,
        address: address,
      });
      this.router.navigate(['/order/payment'])
    }
  }
}
