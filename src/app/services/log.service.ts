import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logSource = new BehaviorSubject<Log>({ id: null, date: null, text: null });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  logs: Log[];

  constructor() {
    this.logs = [
      {
        id: '1',
        date: new Date(),
        text: 'Added Bootstrap'
      }
    ];
    this.addToLocalStorage();
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => {
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    this.addToLocalStorage();
  }

  addToLocalStorage() {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((element, index) => {
      if (element.id === log.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    this.addToLocalStorage();
  }

  deleteLog(log: Log) {
    this.logs.forEach((element, index) => {
      if (element.id === log.id) {
        this.logs.splice(index, 1);
      }
    });
    this.addToLocalStorage();
  }

  clearState() {
    this.stateSource.next(true);
  }
}
