import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-risk-calculation',
  templateUrl: './risk-calculation.component.html',
  styleUrls: ['./risk-calculation.component.scss'],
})
export class RiskCalculationComponent implements OnInit {
  form: FormGroup;

  debounceSubject = new Subject<any>();

  // inputValue?: string;
  options: any[] = [];

  calculatedRisk = 0;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private message: NzMessageService
  ) {
    this.debounceSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((event) => {
        this.onInput(event);
      });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      events: this.fb.array([]),
    });
    this.addEvent();
  }

  get events() {
    return this.form.controls['events'] as FormArray;
  }

  addEvent() {
    const eventForm = this.fb.group({
      awayScore1H: [0, Validators.required],
      awayScore2H: [0, Validators.required],
      homeScore1H: [0, Validators.required],
      homeScore2H: [0, Validators.required],
      awayTeam: ['', Validators.required],
      homeTeam: ['', Validators.required],
      eventId: ['', Validators.required],
    });
    this.events.push(eventForm);
  }

  deleteEvent(eventIndex: number) {
    this.events.removeAt(eventIndex);
  }

  submit() {
    const obj = this.form.getRawValue().events;
    console.log(obj);
    this.dataService.riskCalculation(obj).subscribe((resp) => {
      this.calculatedRisk = resp;
      this.message.create('success', `Risk Calculated`);
    });
  }

  onInput(event: any, index?: number): void {
    // console.log(event.target.value)
    this.dataService.autoCompleteEvent(event.target.value).subscribe((resp) => {
      this.options = [];

      resp.events.forEach((x) => {
        this.options.push({
          name: x.homeTeam + ' vs ' + x.awayTeam,
          id: x.id,
          homeTeam: x.homeTeam,
          awayTeam: x.awayTeam,
        });
      });
    });
  }

  onSelect(event: any, index: number) {
    if (event.isUserInput) {
      console.log(event);
      const game = event.source.nzValue;
      this.events.at(index).patchValue({
        awayTeam: game.awayTeam,
        homeTeam: game.homeTeam,
        eventId: parseInt(game.id),
      });
    }
  }
}
