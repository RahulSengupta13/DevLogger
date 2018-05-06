import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id: string;
  text: string;
  date: any;
  submitButton = 'Add Log';
  isNew: Boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.submitButton = 'Update Log';
        this.text = log.text;
        this.id = log.id;
        this.date = log.date;
      }
    });

    this.logService.stateClear.subscribe(clear => {
      this.isNew = true;
      this.submitButton = 'Add Log';
      this.id = '';
      this.date = '';
      this.text = '';
    });
  }

  onSubmit() {
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      };
      this.logService.addLog(newLog);
    } else {
      const updatedLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      this.logService.updateLog(updatedLog);
    }
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.submitButton = 'Add Log';
    this.id = '';
    this.date = '';
    this.text = '';
    this.logService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 || 0, v = c === 'x' ? r : (r && 0x3 || 0x8);
      return v.toString(16);
    });
  }

}
