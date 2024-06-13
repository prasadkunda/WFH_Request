import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  // to get card icons,names and No of requests
    getCardsDetails(){
      return this.http.get('https://mocki.io/v1/1591059e-7844-4a71-b526-d98a34c00058')
    }
  //to get All the requests details
    getAllRequest(){
      return this.http.get('https://mocki.io/v1/4b512c53-a6d2-42e0-b959-0419c9c5b451');
    }
  //to get All the Approved requests details
  getApprovedRequest(){
    return this.http.get('https://mocki.io/v1/971b74b6-8d01-416f-aec4-604992f411a4');
  }
  //to get All the Rejected requests details
  getRejectedRequest(){
    return this.http.get('https://mocki.io/v1/0e43f6ba-aca1-4dba-8e25-64deec3189b3');
  }
  //to get All the New requests details
  getNewRequest(){
    return this.http.get('https://mocki.io/v1/45ff2bf5-5220-46a0-9a25-464c5552647c');
  }
}
