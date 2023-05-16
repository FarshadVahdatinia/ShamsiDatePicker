import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { DatePickerOptionsEnum } from '../Helper/date-picker-options-enum';
import moment from 'jalali-moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() twoDaysAgoFlag: boolean = true;
  @Input() todayFlag: boolean = true;
  @Input() yesterdayFlag: boolean = true;
  @Input() thisWeekFlag: boolean = true;
  @Input() lastWeekFlag: boolean = true;
  @Input() thisMonthFlag: boolean = true;
  @Input() lastMonthFlag: boolean = true;
  @Input() thisSeasonFlag: boolean = true;
  @Input() lastSeasonFlag: boolean = true;
  @Input() thisYearFlag: boolean = true;
  @Input() lastYearFlag: boolean = true;
  @Input() displayDate: boolean = true;
  fromDate: string;
  toDate: string;
  date: Date;
  day: number;
  month: number;
  year: number;
  justifyOptions: any[];
  reportName: string;
  myDate: string;
  value1: string;
  value2: string;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  defaultDatePickerForm = this.fb.group({
    value: null,
    fromDate: null,
    toDate: null
  });
  constructor(
    private translate: TranslateService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.justifyOptions = [
      { label: this.translate.instant('app.grid.buttons.today'), value: DatePickerOptionsEnum.Today, display: this.todayFlag },
      { label: this.translate.instant('app.grid.buttons.yesterday'), value: DatePickerOptionsEnum.Yesterday, display: this.yesterdayFlag },
      { label: this.translate.instant('app.grid.buttons.twoDayAgo'), value: DatePickerOptionsEnum.TwoDaysAgo, display: this.twoDaysAgoFlag },
      { label: this.translate.instant('app.grid.buttons.thisWeek'), value: DatePickerOptionsEnum.ThisWeek, display: this.thisWeekFlag },
      { label: this.translate.instant('app.grid.buttons.lastWeek'), value: DatePickerOptionsEnum.LastWeek, display: this.lastWeekFlag },
      { label: this.translate.instant('app.grid.buttons.thisMonth'), value: DatePickerOptionsEnum.ThisMonth, display: this.thisMonthFlag },
      { label: this.translate.instant('app.grid.buttons.lastMonth'), value: DatePickerOptionsEnum.LastMonth, display: this.lastMonthFlag },
      { label: this.translate.instant('app.grid.buttons.thisSeason'), value: DatePickerOptionsEnum.ThisSeason, display: this.thisSeasonFlag },
      { label: this.translate.instant('app.grid.buttons.lastSeason'), value: DatePickerOptionsEnum.LastSeason, display: this.lastSeasonFlag },
      { label: this.translate.instant('app.grid.buttons.thisYear'), value: DatePickerOptionsEnum.ThisYear, display: this.thisYearFlag },
      { label: this.translate.instant('app.grid.buttons.lastYear'), value: DatePickerOptionsEnum.LastYear, display: this.lastYearFlag }
    ];
    this.justifyOptions = this.justifyOptions.filter(c => c.display);
    this.defaultDatePickerForm.patchValue({ value: this.justifyOptions[0] })
  }

  setSeasons(month: number, text: string): number {
    let seasonNumber: number;
    if (text.toLowerCase() == "lastseason") {

      switch (true) {
        case month >= 1 && month < 4:
          seasonNumber = 10;
          break;
        case month >= 4 && month < 7:
          seasonNumber = 1;
          break;
        case month >= 7 && month < 10:
          seasonNumber = 4;
          break;
        default:
          seasonNumber = 7;
          break;
      }
    }
    else {
      switch (true) {
        case month >= 1 && month < 4:
          seasonNumber = 1;
          break;
        case month >= 4 && month < 7:
          seasonNumber = 4;
          break;
        case month >= 7 && month < 10:
          seasonNumber = 7;
          break;
        default:
          seasonNumber = 10;
          break;
      }
    }
    return seasonNumber;
  }
  submitDate(event) {
    this.reportName = event.option.value;

    switch (this.reportName) {
      case (DatePickerOptionsEnum.Today): {

        this.fromDate = moment().format('jYYYY-jMM-jDD');
        this.toDate = moment().format('jYYYY-jMM-jDD');
        break
      }
      case (DatePickerOptionsEnum.Yesterday): {

        this.fromDate = moment().subtract(1, 'days').format('jYYYY-jMM-jDD');
        this.toDate = moment().subtract(1, 'days').format('jYYYY-jMM-jDD');
        break
      }
      case (DatePickerOptionsEnum.TwoDaysAgo): {

        this.fromDate = moment().subtract(2, 'days').format('jYYYY-jMM-jDD');
        this.toDate = moment().subtract(2, 'days').format('jYYYY-jMM-jDD');
        break;
      }
      case (DatePickerOptionsEnum.ThisWeek): {
        var dayOfWeek = moment().day();
        this.fromDate = (dayOfWeek == 6) ? moment().format('jYYYY-jMM-jDD') : moment().startOf('week').subtract(1, 'days').format('jYYYY-jMM-jDD');
        this.toDate = moment().format('jYYYY-jMM-jDD');
        break;
      }
      case (DatePickerOptionsEnum.LastWeek): {

        this.fromDate = moment(moment().subtract(6, 'days')).startOf('week').subtract(1, 'days').format('jYYYY-jMM-jDD');
        this.toDate = moment(moment().subtract(6, 'days')).endOf('week').subtract(1, 'days').format('jYYYY-jMM-jDD');
        break;
      }
      case (DatePickerOptionsEnum.ThisMonth): {

        this.fromDate = moment().jDate(1).format('jYYYY-jMM-jDD');
        this.toDate = moment().format('jYYYY-jMM-jDD');
        break;
      }
      case (DatePickerOptionsEnum.LastMonth): {
        var month1 = moment().jMonth();
        //For months 1 To 6
        if (month1 <= 6 && month1 >= 1) {
          this.month = month1 - 1;
          const day = 31;
          this.fromDate = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').jDate(1).jMonth(this.month).format('jYYYY-jMM-jDD');
          this.toDate = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').jMonth(this.month).jDate(day).format('jYYYY-jMM-jDD');
        }
        //For last month of year
        else if (month1 == 0) {
          this.month = 11;
          let dateF = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').subtract(1, 'years');
          let dateT = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').subtract(1, 'years');
          //Checking Last Day Of Year If it's 29 or 30 (LeapYear)
          this.day = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').subtract(1, 'years').jIsLeapYear() ? 30 : 29;
          // this.year = year1 - 1;
          this.fromDate = dateF.jDate(1).jMonth(this.month).format('jYYYY-jMM-jDD');
          this.toDate = dateT.jDate(this.day).jMonth(this.month).format('jYYYY-jMM-jDD');
        }
        //For Months 7 To 12
        else {
          // this.year = year1 - 1;
          this.month = month1 - 1;
          const day = 30;
          this.fromDate = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').jDate(1).jMonth(this.month).format('jYYYY-jMM-jDD');
          this.toDate = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').jDate(day).jMonth(this.month).format('jYYYY-jMM-jDD');
        }
        break;
      }
      case ("thisSeason"): {
        let dateF =  moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD');
        let dateT =  moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD');
        let a = this.setSeasons(dateF.jMonth()+1, "thisSeason")
        this.fromDate = dateF.jMonth(a-1).jDate(1).format('jYYYY-jMM-jDD');
        this.toDate = dateT.format('jYYYY-jMM-jDD');
        break;
      }
      case ("lastSeason"): {
        let dateF =  moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD');
        let dateT =  moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD');
        let setSeasonParam = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').jMonth();
        let a = this.setSeasons(setSeasonParam + 1, "lastSeason")
        switch (a) {
          case 10:
            var prevYear1 =  moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').subtract(1, 'years');
            var prevYear2 =  moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').subtract(1, 'years');
            this.fromDate = prevYear1.jMonth(a-1).jDate(1).format('jYYYY-jMM-jDD');
            this.toDate = prevYear2.jIsLeapYear() ? prevYear2.jMonth(a + 2).jDate(31).subtract(1, 'month').format('jYYYY-jMM-jDD') : prevYear2.jMonth(a + 2).jDate(30).subtract(1, 'month').format('jYYYY-jMM-jDD');
            break;
          case 1:
            this.fromDate = dateF.jMonth(a).jDate(1).subtract(1, 'month').format('jYYYY-jMM-jDD');
            this.toDate = dateT.jMonth(a + 1).jDate(31).format('jYYYY-jMM-jDD');
            break;
          case 7:
            this.fromDate = dateF.jMonth(a).jDate(1).subtract(1, 'month').format('jYYYY-jMM-jDD');
            this.toDate = dateT.jMonth(a).add(1, 'month').jDate(30).format('jYYYY-jMM-jDD');
            break;
          case 4:
            this.fromDate = dateF.jMonth(a).jDate(1).subtract(1, 'month').subtract(1, 'days').format('jYYYY-jMM-jDD');
            this.toDate = dateT.jMonth(a).add(1, 'month').jDate(31).format('jYYYY-jMM-jDD');
            break;
        }

        break;
      }
      case (DatePickerOptionsEnum.ThisYear): {
        this.fromDate = moment().jDate(1).jMonth(0).format('jYYYY-jMM-jDD');
        this.toDate = moment().format('jYYYY-jMM-jDD');
        break;
      }
      case (DatePickerOptionsEnum.LastYear): {
        //Last Day Of Year If it's 29 or 30 (LeapYear)
        this.day = moment(moment().format('jYYYY-jMM-jDD'), 'jYYYY-jMM-jDD').subtract(1, 'years').jIsLeapYear() ? 30 : 29;
        //Always 12
        this.month = 11;
        //last year
        this.year = moment().jYear() - 1;
        this.fromDate = moment().jDate(1).jYear(this.year).jMonth(0).format('jYYYY-jMM-jDD');
        this.toDate = moment().jYear(this.year).jDate(this.day).jMonth(this.month).format('jYYYY-jMM-jDD');

        break;
      }
    }
    this.value1 = this.fromDate;
    this.value2 = this.toDate;
    this.select();
  }

  select() {
    this.onSelect.emit({ FromDate: this.value1, ToDate: this.value2, reportName: this.reportName });
  }
}
