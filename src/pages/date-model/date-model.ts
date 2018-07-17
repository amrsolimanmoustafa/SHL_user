import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
    import { DatePickerDirective } from 'ion-datepicker';

/**
 * Generated class for the DateModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-date-model',
  templateUrl: 'date-model.html',
})
export class DateModelPage {
public myDate;
 @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
 @ViewChild(DatePickerDirective) private datepickerDirective:DatePickerDirective;

 public localDate: Date = new Date();
  public initDate: Date = new Date();
  public initDate2: Date = new Date(2015, 1, 1);
  public minDate: Date = new Date(2018, 2, 31);
  public maxDate: Date = new Date(2018, 11, 10);
  public disabledDates: Date[] = [new Date(2017, 7, 14)];
  public localeString = {
    monday: true,
    weekdays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  };
  public min: Date = new Date();
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  	    this.myDate = new Date().toISOString();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateModelPage');
  }

    closeDatepicker(){
    	console.log("close");
        this.datepickerDirective.modal.dismiss();
    }
      public Log(stuff): void {
    this.datepicker.open();
    this.datepicker.changed.subscribe(() => console.log('test'));
    console.log(stuff);
  }

  public event(data: Date): void {
    this.localDate = data;
  }
  setDate(date: Date) {
    console.log(date);
    this.initDate = date;
  }
  public start_date;
 dismiss() {
   let data = { 'foo': this.start_date };
   this.viewCtrl.dismiss(data);
 }
}
