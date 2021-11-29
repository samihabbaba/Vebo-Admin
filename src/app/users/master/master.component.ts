import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TableService } from 'src/app/shared/services/table.service';

interface DataItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: string;
}

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MasterComponent implements OnInit {
  expandSet = new Set<number>();

  // Modal Variables
  isVisible: boolean = false;
  isOkLoading: boolean = false;

  onExpandChange(id: number, event?: any): void {
    if (!this.expandSet.has(id)) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  dropdownOptions: any[] = [
    { label: 'In Stock', value: 'inStock' },
    { label: 'Out of Stock', value: 'outOfStock' },
  ];

  ngOnInit() {}

  selectedCategory: string;
  selectedStatus: string = '';
  searchInput: any;
  displayData = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: DataItem, b: DataItem) => a.id - b.id,
    },
    {
      title: 'Product',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      compare: (a: DataItem, b: DataItem) =>
        a.category.localeCompare(b.category),
    },
    {
      title: 'Price',
      compare: (a: DataItem, b: DataItem) => a.price - b.price,
    },
    {
      title: 'Stock',
      compare: (a: DataItem, b: DataItem) => a.quantity - b.quantity,
    },
    {
      title: 'Status',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
    },
    {
      title: '',
    },
  ];

  productsList = [
    {
      id: 31,
      name: 'Gray Sofa',
      avatar: 'assets/images/others/thumb-9.jpg',
      category: 'Home Decoration',
      price: 912,
      quantity: 23,
      status: 'in stock',
      checked: false,
    },
    {
      id: 32,
      name: 'Beat Headphone',
      avatar: 'assets/images/others/thumb-10.jpg',
      category: 'Eletronic',
      price: 137,
      quantity: 56,
      status: 'in stock',
      checked: false,
    },
    {
      id: 33,
      name: 'Wooden Rhino',
      avatar: 'assets/images/others/thumb-11.jpg',
      category: 'Home Decoration',
      price: 912,
      quantity: 12,
      status: 'in stock',
      checked: false,
    },
    {
      id: 34,
      name: 'Red Chair',
      avatar: 'assets/images/others/thumb-12.jpg',
      category: 'Home Decoration',
      price: 128,
      quantity: 0,
      status: 'out of stock',
      checked: false,
    },
    {
      id: 35,
      name: 'Wristband',
      avatar: 'assets/images/others/thumb-13.jpg',
      category: 'Eletronic',
      price: 776,
      quantity: 0,
      status: 'out of stock',
      checked: false,
    },
    {
      id: 36,
      name: 'Charging Cable',
      avatar: 'assets/images/others/thumb-14.jpg',
      category: 'Eletronic',
      price: 119,
      quantity: 37,
      status: 'in stock',
      checked: false,
    },
    {
      id: 37,
      name: 'Three Legs',
      avatar: 'assets/images/others/thumb-15.jpg',
      category: 'Home Decoration',
      price: 199,
      quantity: 17,
      status: 'in stock',
      checked: false,
    },

    {
      id: 35,
      name: 'Wristband',
      avatar: 'assets/images/others/thumb-13.jpg',
      category: 'Eletronic',
      price: 776,
      quantity: 0,
      status: 'out of stock',
      checked: false,
    },
    {
      id: 36,
      name: 'Charging Cable',
      avatar: 'assets/images/others/thumb-14.jpg',
      category: 'Eletronic',
      price: 119,
      quantity: 37,
      status: 'in stock',
      checked: false,
    },
    {
      id: 37,
      name: 'Three Legs',
      avatar: 'assets/images/others/thumb-15.jpg',
      category: 'Home Decoration',
      price: 199,
      quantity: 17,
      status: 'in stock',
      checked: false,
    },
  ];

  constructor(
    private tableSvc: TableService,
    private message: NzMessageService
  ) {
    this.displayData = this.productsList;
  }

  search(): void {
    const data = this.productsList;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }


  statusChange(value: string): void {
    const data = this.productsList;
    value !== 'All'
      ? (this.displayData = data.filter((elm) => elm.status === value))
      : (this.displayData = data);
  }

  showModal(): void {
    this.isVisible = true;
  }

  submit() {}

  modalCancel() {
    this.isVisible = false;
  }
}
