import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Lease } from "../../models/index";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

/**
 * Lease Service - Provide Lease data from http server
 * Provide Payment Details for a given Lease.
 * 
 * Dependends On (DI) : HttpClient 
 */
@Injectable()
export class LeaseService {
  private leaseUrl =  environment.leaseUrl;
  private  daysInWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  private monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
  constructor(private http: HttpClient) {}

  
 public getLeases() {
    return this.http.get(this.leaseUrl);
  }

 public getLease(id: string) {
    return this.http.get(this.leaseUrl + id);
  }

  /** Main method to generate Lease Payment Details*/
  generatePayments(lease: Lease) {

    let payments = [];
   
    switch (lease.frequency) {
      case 'weekly':
        return this.generateWeeklyPayments(lease)
        break;
      case 'fortnightly':
        return this.generateFornightlyPayments(lease)
        break;
      case 'monthly':
         return this.generateMonthlyPayments(lease)
        break;
      default:
        break;
    }
  }

  generateWeeklyPayments(lease:Lease){
    let payments = [];
    let weekNumber, fromDate, toDate,amount, diffDays;
    let daysToAdd=7;// weekly

    let currentDate = new Date(lease.start_date);
    let endDate = new Date(lease.end_date);
    let paymentDay = this.daysInWeek.findIndex(item => item == lease.payment_day);//get the payment_date weekday number (0-6 means Sunday-Saturday)


    //add starting date to payments array
    if(currentDate <= endDate){
      fromDate = currentDate;
      weekNumber = Math.ceil(currentDate.getDate()/7)+1;//starting date week number in a month (1-5)
      currentDate = this.nthWeekdayOfMonth(paymentDay, weekNumber ,currentDate); //get the next occurence of payment day
      toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1);
      
      //amount calculation
      diffDays = this.getDateDifference(fromDate, currentDate);
      amount =  this.calculateAmount(diffDays, lease.rent);
      
      payments.push({'from':fromDate, 'to': toDate, 'days':diffDays, 'amount': amount});
    }

    while (currentDate <= endDate) { //keep calculating next payment date     
      if(currentDate){
        fromDate = currentDate;
        
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+daysToAdd);
        toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1);
        diffDays = daysToAdd;
        amount =  lease.rent;
   
        if(toDate > endDate){
          toDate = endDate;
          diffDays = this.getDateDifference(fromDate, toDate);
          amount =  +this.calculateAmount(diffDays, lease.rent);
        }
        payments.push({'from':fromDate, 'to': toDate, 'days':diffDays, 'amount': amount});
      }
    }//end while

    return payments;
  }

  generateFornightlyPayments(lease:Lease){
    let payments = [];
    let weekNumber, fromDate, toDate,amount, diffDays;
    let daysToAdd=14;// fortnightly

    let currentDate = new Date(lease.start_date);
    let endDate = new Date(lease.end_date);
    let paymentDay = this.daysInWeek.findIndex(item => item == lease.payment_day);//get the payment_date weekday number (0-6 means Sunday-Saturday)


    //add starting date to payments array
    if(currentDate <= endDate){
      fromDate = currentDate;
      weekNumber = Math.ceil(currentDate.getDate()/7);//starting date week number in a month (1-5)
      currentDate = this.nthWeekdayOfMonth(paymentDay, weekNumber ,currentDate); //get the next occurence of payment day
      toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1);
      
      //amount calculation
      diffDays = this.getDateDifference(fromDate, currentDate);
      amount =  this.calculateAmount(diffDays, lease.rent);
      
      payments.push({'from':fromDate, 'to': toDate, 'days':diffDays, 'amount': amount});
    }

    while (currentDate <= endDate) { //keep calculating next payment date     
      if(currentDate){
        fromDate = currentDate;
        
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+daysToAdd);
        toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1);
        diffDays = daysToAdd;
        amount =  lease.rent*2;
   
        if(toDate > endDate){
          toDate = endDate;
          diffDays = this.getDateDifference(fromDate, toDate)+1;
          amount =  +this.calculateAmount(diffDays, lease.rent);
        }
        payments.push({'from':fromDate, 'to': toDate, 'days':diffDays, 'amount': amount});
      }
    }//end while

    return payments;
  }

  generateMonthlyPayments(lease:Lease){
    let weekNumber, fromDate, toDate,amount, diffDays;
    let currentDate = new Date(lease.start_date);
    let endDate = new Date(lease.end_date);
    let payments = [];
    let day = this.daysInWeek.findIndex(item => item == lease.payment_day);
    
    
    while (currentDate <= endDate) {  //Continue to generate payment schedule
      fromDate = currentDate;
      
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, currentDate.getDate());
      
      currentDate = this.nthWeekdayOfMonth(day, 1 ,currentDate); //get first weekday of current month (e.g 1st Friday)
      toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1);
      diffDays = this.getDateDifference(fromDate, toDate)+1;
      amount =  +this.calculateAmount(diffDays, lease.rent);

      if(toDate > endDate){
        toDate = endDate;
        diffDays = this.getDateDifference(fromDate, toDate);
        amount =  +this.calculateAmount(diffDays, lease.rent);
      }
      
      payments.push({'from':fromDate, 'to': toDate, 'days':diffDays, 'amount': amount});
    }

    return payments;
  }

  //Get the difference between two dates
  getDateDifference(fromDate, toDate){
    let timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  calculateAmount(days, amount){
   return ((amount/7)*days).toFixed(1);
  }

  /** This method will return nth Weekday of a month 
   * For example n=2, weekday=Friday will return 2nd Friday of the month
  */
  nthWeekdayOfMonth(weekday, n, date) {
    date = new Date(date.getFullYear(), date.getMonth(), 1);
    let  add = (weekday - date.getDay() + 7) % 7 + (n - 1) * 7;
    date.setDate(1 + add);
    return date;
  }

}
