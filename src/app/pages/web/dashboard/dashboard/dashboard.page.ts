import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  polje = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 12, 2, 2, 2, 2, ]

}
