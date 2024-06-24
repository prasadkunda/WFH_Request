import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotifications } from '../../components/notifications/notifications.component';
import { debug } from 'console';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) { }

  // get the notifications based on the employee id
  getNotifications(userId:string): Observable<INotifications[]> {
    return this.http.get<INotifications[]>(`${this.apiUrl}?emp_id=${userId}`)
  }

   // get the notifications based on the Manager id
   getNotificationsManager(userId:string): Observable<INotifications[]> {
    return this.http.get<INotifications[]>(`${this.apiUrl}?approver=${userId}`)
  }

  createNotification(notifiction: INotifications): Observable<INotifications[]> {
    return this.http.post<INotifications[]>(this.apiUrl, notifiction);
  }

   // get the All notifications
   getAllNotifications(): Observable<INotifications[]> {
    return this.http.get<INotifications[]>(`${this.apiUrl}`)
  }
}
