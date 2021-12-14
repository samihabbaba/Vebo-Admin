import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  selectedIndex: any;
  userId: string;
  SubAccountsDetails: any;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getUserByID(this.userId);
      console.log(this.userId);
    });
  }

  async getUserByID(userId) {
    return new Promise((resolve, reject) => {
      this.dataService.getUserById(userId).subscribe(
        (resp) => {
          this.currentUser = resp.body;
          console.log(this.currentUser);
          if (
            this.currentUser.role !== 'Promoter' &&
            this.currentUser.role !== 'Shop'
          ) {
            resolve(true);
          } else {
            this.getSubAccounts(this.currentUser.id);

            resolve(true);
          }
        },
        (error) => {
          this.router.navigate(['/home']);
          reject(false);
        }
      );
    });
  }

  getSubAccounts(userId: string) {
    this.dataService.getSubAccounts(userId).subscribe(
      (resp) => {
        this.SubAccountsDetails = resp.body;
        console.log(this.SubAccountsDetails);
      },
      (error) => {
        this.router.navigate(['/home']);
      }
    );
  }
}
