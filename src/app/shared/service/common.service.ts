import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UserData, cardData } from '../../Employee/employee.component';
import { RouterModule ,Router} from '@angular/router';
import {
  IUserDetails,
  IUsesrAllDetals,
  IUsesrRequestsDetails,
} from './interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userDetails!: IUserDetails[];
  userId!: string;
  public userRole!:string;
  private apiUrl = 'http://localhost:3000/AllRequests';
  // [
  //   'http://localhost:3000/Created',
  //   'http://localhost:3000/AllRequests',
  // ]; // JSON server URL
  filteredData: any[] = [];
  uesrRole!: string;

  constructor(private http: HttpClient,private router:Router) {
    this.getUserID();
  }

  // to get card icons,names and No of requests
  public getCardsDetails(): Observable<cardData[]> {
    // mock API
    // return this.http.get<cardData[]>('https://mocki.io/v1/9b15e17b-f681-4516-9dd4-77454a84cd93')
    // Json server API
    return this.http.get<cardData[]>('http://localhost:3000/cards')
    // return this.http.get<cardData[]>('https://localhost:7236/api/Users/getCardsByEmployeeId?employeeId='+userId)
    .pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }
  //to get All the requests details
  public getAllRequest(): Observable<UserData> {
    //Mock API
    // return this.http.get<UserData>('https://mocki.io/v1/4b512c53-a6d2-42e0-b959-0419c9c5b451')
    // Json server API
    return (this.http.get<UserData>('http://localhost:3000/AllRequests'))
    // return this.http.get<UserData>('https://localhost:7236/api/Users/getAllRequestsByEmployeeId?employeeId='+userId)
        .pipe(
          catchError((err) => {
            throw new Error(err);
          })
        )
    // );
  }
  //to get All the Approved requests details
  public getApprovedRequest() {
    // Mock API
    // return this.http.get('https://mocki.io/v1/b41048c4-6c51-4b62-9d49-56656527690c')
    // Json server API
    return (
      this.http
        .get('http://localhost:3000/Approved')
        //DB call
        // return this.http.get("https://localhost:7236/api/Users/getAllRequests")
        .pipe(
          catchError((err) => {
            throw new Error(err);
          })
        )
    );
  }
  //to get All the Rejected requests details
  public getRejectedRequest() {
    // Mock API
    // return this.http.get('https://mocki.io/v1/0e43f6ba-aca1-4dba-8e25-64deec3189b3')
    // Json server API
    return this.http.get('http://localhost:3000/Rejected').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }
  //to get All the New requests details
  public getNewRequest() {
    // Mock API
    // return this.http.get('https://mocki.io/v1/45ff2bf5-5220-46a0-9a25-464c5552647c')
    // Json Server API
    return this.http.get('http://localhost:3000/Created').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }
  //to get user details after login. based on the employee id need to fetch the data from DB.
  public getUserdetails(): Observable<IUserDetails[]> {
    // team member API
    this.userRole = '';
    // return (this.http.get<IUserDetails>('https://mocki.io/v1/3d7f801d-9093-4f64-a459-12ae677cbe78')
    //  return this.http.get<IUserDetails[]>('http://localhost:3000/User_detial')
    //Manager API
    // return (this.http.get<IUserDetails>('https://mocki.io/v1/86756d55-a72f-4ab6-8009-6fc173361532')
    return this.http.get<IUserDetails[]>('http://localhost:3000/Manager_details')
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
  }
  // to get list of employees and projects under the manager. based on the manager employee id need to fetch the data from DB.
  public getEmployeesandProjects(): Observable<IUsesrAllDetals[]> {
    // Mock API
    // return this.http.get<IUsesrAllDetals[]>('https://mocki.io/v1/d88227f3-acf7-4eb2-b7e6-fc8a7a849d5b')
    // Json Server
    return this.http
      .get<IUsesrAllDetals[]>('http://localhost:3000/Employees_Projects')
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
  // to get list of requests to manager.
  public getRequests(): Observable<UserData[]> {
    // Mock API
    // return this.http.get<IUsesrRequestsDetails[]>('https://mocki.io/v1/4e527a0b-9a27-4f02-88b0-34d46de0b26e')
    // Json Server API
    return this.http
      .get<UserData[]>('http://localhost:3000/AllRequests')
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  public addItem(item: any): any {
    console.log(item);
    return this.http.post('http://localhost:3000/AllRequests', item)
    .pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
    // this.apiUrl.forEach((url) => {
    //   return this.http.post(url, item);
    // });
  }

  // to update the existing request details
  public updateRequest(request: UserData): Observable<UserData> {
    console.log(request);
    console.log(`${this.apiUrl}/${request.emp_id}`);
    return this.http
      .put<UserData>(`${this.apiUrl}/${request.id}`, request)
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  public getUserID(): any {
    this.getUserdetails().subscribe((res) => {
      if (res && Array.isArray(res)) {
        this.userDetails = res;
        // console.log('this.userDetails', this.userDetails);
        this.userId = this.userDetails[0].emp_id;
        this.uesrRole = this.userDetails[0].desiganation;
        if(this.userRole === 'manager'){
          this.router.navigate(['manager']);
        }
      }
    });
  }

  // to get projects under the manager, need to pass manager Emp_id here
  public getProjects_Manager(): Observable<any> {
    // return this.http.get(`${'http://localhost:3000/Projects_Manager'}?emp_id=${manager_Id}`)
    return this.http.get<any>('http://localhost:3000/Projects_Manager').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  public getSidenav_Options_Employee(): Observable<any> {
    // return this.http.get(`${'http://localhost:3000/Projects_Manager'}?emp_id=${manager_Id}`)
    return this.http
      .get<any>('http://localhost:3000/sidenav_options_employee')
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  // to add innovations in DB 
  public addInnovationItem(item: any): any {
    console.log(item);
    return this.http.post('http://localhost:3000/innovations', item)
    .pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  // Generate a random number between min (inclusive) and max (exclusive)
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
