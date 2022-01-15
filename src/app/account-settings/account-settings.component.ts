import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  setting: any;

  form: FormGroup;

  maxSelection: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    public dataService: DataService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.dataService.getSettings().subscribe(
      (resp) => {
        this.setting = resp.body;
        this.initializeForm();
        console.log(this.setting);
      },
      (error) => {}
    );
  }

  initializeForm() {
    this.form = this.fb.group({
      betsNo: new FormControl(this.setting?.betsNo, [Validators.required]),
      doubleComissionRate: new FormControl(this.setting?.doubleComissionRate, [
        Validators.required,
      ]),
      doubleMinOdd: new FormControl(this.setting?.doubleMinOdd, [
        Validators.required,
      ]),
      majorMaxPayout: new FormControl(this.setting?.majorMaxPayout, [
        Validators.required,
      ]),
      majorMaxStake: new FormControl(this.setting?.majorMaxStake, [
        Validators.required,
      ]),

      majorMinPayout: new FormControl(this.setting?.majorMinPayout, [
        Validators.required,
      ]),
      majorMinStake: new FormControl(this.setting?.majorMinStake, [
        Validators.required,
      ]),
      maxPayout: new FormControl(this.setting?.maxPayout, [
        Validators.required,
      ]),
      maxSelection: new FormControl(this.setting?.maxSelection, [
        Validators.required,
      ]),
      maxStake: new FormControl(this.setting?.maxStake, [Validators.required]),
      minPayout: new FormControl(this.setting?.minPayout, [
        Validators.required,
      ]),
      minStake: new FormControl(this.setting?.minStake, [Validators.required]),
      singleComissionRate: new FormControl(this.setting?.singleComissionRate, [
        Validators.required,
      ]),
      singleMinOdd: new FormControl(this.setting?.singleMinOdd, [
        Validators.required,
      ]),
      timeOffset: new FormControl(this.setting?.timeOffset, [
        Validators.required,
      ]),
      totalStack: new FormControl(this.setting?.totalStack, [
        Validators.required,
      ]),
      tripleComissionRate: new FormControl(this.setting?.tripleComissionRate, [
        Validators.required,
      ]),
      tripleMinOdd: new FormControl(this.setting?.tripleMinOdd, [
        Validators.required,
      ]),
    });
  }

  updateSetting() {
    if (this.form.valid) {
      const obj = this.form.getRawValue();
      this.dataService.updateSettings(obj).subscribe(
        (resp) => {
          if (resp.body == true) {
            this.messageService.create(
              'success',
              'Your changes have been submitted successfully.'
            );
          } else {
            this.messageService.create(
              'error',
              'An error occured. Please try again later.'
            );
          }
          this.getSettings();
        },
        (error) => {
          this.messageService.create(
            'error',
            'An error occured. Please try again later.'
          );
        }
      );
    } else {
      this.messageService.create('error', 'Please fill the form correcly.');
    }
  }
}
