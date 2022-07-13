import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() table = '';
  @Input() label = '';
  @Input() fields = [];
  @Input() data = [];

  loading: boolean = true;
  isShowing: boolean = false;
  protectedData: any;
  filterBy: any;
  public dtOptions: DataTables.Settings = {};

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      lengthMenu: [15, 50, 100],
      processing: true
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.protectedData = changes['data'].currentValue;
    this.loading = false;
  }

  navigate(id:string) {
    this._router.navigate([this.table + '/' + id]);
  }

  toggleShowing() {
    this.isShowing = !this.isShowing;
  }

}
