# Rental Payments

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#Application Release Notes: 

###Overview:
This Rental Payment solution is offered by Different Technologies. Application fetch the list of all leases from web server and displays on the simple web page. Use can view the details of each lease which include its start date, end date, frequency of payment (weekly, fortnightly, monthly), payment day(Friday or Monday etc.), rent amount. Payment schedule between the start and end date is generated and displayed on the detail page. This includes the previous and future payment history, due date and amount paid. 

##Test Plan:

####Rental Payments – Instructions for Setup
1.	Source code for the solution described above.
https://github.com/nisarzahid/weather-widget-angular6.git
2.	Setup/installation instructions
This application is build using angular 7. You need to have following installations:
•	Node.js and npm
•	Angular-cli (latest)
•	After cloning the source code from git. Move inside the root directory (where package.json exist) and run npm install.
•	Run ng serve inside the root folder where package,json resides.
•	Open the browser http://localhost:4200/ 
•	You will see the following default page, auto redirected to /leases


 


•	Click on the Details of any Lease will isplay its details and payment schedule at the following url http://localhost:4200/leases/lease-a
 

##Application Architecture

Application is build using Angular 7
	Application source code consist of following parts:

###1.	AppModule 
This consist of root component app.component which is bootstrap by default in browser when application runs.


###2.	Environment variables
These are inside the environments folder at the root. It contains environment flags for dev and production for following variable values
•	production: sets to true when build using –prod command
•	leaseUrl: https://hiring-task-api.herokuapp.com/v1/leases/ 


###3.	CoreModule 

CoreModule contains application wide feature that needs to be singleton in nature. Features like singleton services (UserService, HelperService) that should remain the same all throughout application is created here. 
This module contains:

1.	HelperService – to provide utility functions
2.	RouteGuard – provide guard feature for valid/invalid routes.
3.	PageNotFound – display page/record not found message for invalid routes.

###4.	SharedModule 

SharedModule contains module specific features that needs to be used and imported only by modules that needs them. It can contains services, components, directives, pipes. 
Currently it have

•	LeaseService – Service that retervie lease information from http server 	and also generates payment schedule based on lease dates and 	frequency. 
	

###5.	LeaseModule 

This is the application main area. It handles the Lease list and details. 
It contains.

1.	LeaseListComponent – Displays list of all leases from web server.
2.	LeaseComponent – Display detail of a particular lease. (start date, end date, frequency, rent).
3.	PaymentComponent – Child component of LeaseComponent, display the list of payments.

3.	A list of assumptions context of those assumptions.
•	Application assume you have setup for Angular 7 and Node.js on you machine.


##Automated Tests 
I used Angular Jasmine and Karma test runner to create automate test. To check the code of these test you can check the *.spec.ts.files related to each component and service.

You can run the test by running “ng test” command at the root of the folder.

Automated Tests will test the LeaseService http methods and generate payments. It will also test the components and its DOM to some extent. 
Here is the screenshot of tests that I run.
 

