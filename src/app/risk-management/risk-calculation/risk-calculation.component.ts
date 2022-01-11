import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-risk-calculation',
  templateUrl: './risk-calculation.component.html',
  styleUrls: ['./risk-calculation.component.scss'],
})
export class RiskCalculationComponent implements OnInit {
  form: FormGroup;



  inputValue?: string;
  options: string[] = [];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }



  constructor(private fb: FormBuilder) {}

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
      awayScore1H: ['', Validators.required],
      awayScore2H: ['', Validators.required],
      homeScore1H: ['', Validators.required],
      homeScore2H: ['', Validators.required],
      awayTeam: ['', Validators.required],
      homeTeam: ['', Validators.required],
      eventId: ['', Validators.required],
    });
    this.events.push(eventForm);
  }

  deleteEvent(eventIndex: number) {
    this.events.removeAt(eventIndex);
  }

  test() {
    console.log(this.form.getRawValue().events)
  }



}
