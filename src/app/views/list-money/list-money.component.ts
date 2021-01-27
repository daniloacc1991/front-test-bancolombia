import { Component, OnInit } from '@angular/core';
import { Cryptocurrency } from 'src/app/models/crypto.interface';

@Component({
  selector: 'app-list-money',
  templateUrl: './list-money.component.html',
  styleUrls: ['./list-money.component.sass']
})
export class ListMoneyComponent implements OnInit {

  throttle = 50;
  scrollDistance = 2;

  // Borrar
  selector: string = '.main-panel'
  sum = 7;
  array: Cryptocurrency[] = [];

  constructor() { }

  ngOnInit(): void {
    this.appendItems(0, this.sum);
  }

  onScrollDown(ev) {
    console.log("scrolled down!!", ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 10;
    this.appendItems(start, this.sum);
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "push", endIndex <= 100);
  }

  addItems(startIndex, endIndex, _method, add: boolean = true) {
    if (add) {
      const max = 99, min = 10;
      this.array = [];
      for (let i = 0; i < this.sum; ++i) {
        this.array.push({
          name: `Name ${i}`,
          price: +(Math.random() * (max - min) + min).toFixed(0),
          type: +(Math.random() * (2 - 1) + 1).toFixed(0) === 1 ? 'CRYPTO' : 'USD'
        })
      }
    }
  }

}
