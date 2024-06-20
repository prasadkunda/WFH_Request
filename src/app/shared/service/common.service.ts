import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UserData, cardData } from '../../Employee/employee/employee.component';
import { IUserDetails, IUsesrAllDetals, IUsesrRequestsDetails } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  // to get card icons,names and No of requests
    getCardsDetails() : Observable<cardData[]>{
      return this.http.get<cardData[]>('https://mocki.io/v1/9b15e17b-f681-4516-9dd4-77454a84cd93').pipe(catchError((err) => {
          throw new Error(err);
      }))
    }
  //to get All the requests details
    getAllRequest() : Observable<UserData>{
      return this.http.get<UserData>('https://mocki.io/v1/4b512c53-a6d2-42e0-b959-0419c9c5b451').pipe(catchError((err) => {
        throw new Error(err);
    }))
    }
  //to get All the Approved requests details
  getApprovedRequest(){
    return this.http.get('https://mocki.io/v1/b41048c4-6c51-4b62-9d49-56656527690c').pipe(catchError((err) => {
      throw new Error(err);
  }))
  }
  //to get All the Rejected requests details
  getRejectedRequest(){
    return this.http.get('https://mocki.io/v1/0e43f6ba-aca1-4dba-8e25-64deec3189b3').pipe(catchError((err) => {
      throw new Error(err);
  }))
  }
  //to get All the New requests details
  getNewRequest(){
    return this.http.get('https://mocki.io/v1/45ff2bf5-5220-46a0-9a25-464c5552647c').pipe(catchError((err) => {
      throw new Error(err);
  }))
  }
  //to get user details after login. based on the employee id need to fetch the data from DB.
  getUserdetails() : Observable<IUserDetails>{
    // team member API
    // return this.http.get<IUserDetails>('https://mocki.io/v1/3d7f801d-9093-4f64-a459-12ae677cbe78')
    //Manager API
    return this.http.get<IUserDetails>('https://mocki.io/v1/86756d55-a72f-4ab6-8009-6fc173361532')
    // return this.http.get<IUserDetails>('https://mocki.io/v1/86756d55-a72f-4ab6-8009-6fc173361532')
    .pipe(catchError((err) => {
      throw new Error(err);
  }))
  }
  // to get list of employees and projects under the manager. based on the manager employee id need to fetch the data from DB.
  getEmployeesandProjects() : Observable<IUsesrAllDetals[]> {
    return this.http.get<IUsesrAllDetals[]>('https://mocki.io/v1/d88227f3-acf7-4eb2-b7e6-fc8a7a849d5b').pipe(catchError((err) => {
      throw new Error(err);
    }))
  }
  // to get list of requests to manager.
  getRequests() : Observable<IUsesrRequestsDetails[]> {
    return this.http.get<IUsesrRequestsDetails[]>('https://mocki.io/v1/4e527a0b-9a27-4f02-88b0-34d46de0b26e').pipe(catchError((err) => {
      throw new Error(err);
    }))
  }
}
