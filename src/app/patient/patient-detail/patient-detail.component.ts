import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {PatientService} from '../service/patient.service';
import {Patient} from './../model/patient';
import {Subscription} from 'rxjs/Subscription';
import {MessageService} from '../../shared/message/message.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  private infoMsg = {body: '', type: 'info'};
  subscription: Subscription;

  @Input()
  patient: Patient;

  constructor(private patientService: PatientService, private messageService: MessageService) {
    this.subscription = messageService.Patientselected$.subscribe(
      patient => {
        this.patient = patient;
      });
  }

  ngOnInit() {
  }

  savePatient(patient) {
    console.log('Patient wird gespeichert', patient);
    if (typeof(patient._id) === 'undefined' ) {
      // Neuen Patienten anlegen
      this.patientService.addPatient(patient).subscribe(
        res => {
          this.actualizeCache();
          this.sendInfoMsg('Patient erfolgreich hinzugefügt.', 'success');
        },
        error => console.log(error)
      );
    } else {
      // Patientendaten ändern mit bestehender _id
      this.patientService.editPatient(patient).subscribe(
        res => {
          this.actualizeCache();
          this.sendInfoMsg('Patient erfolgreich geändert.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  onCancel() {
  console.log ('Dialog Abbrechen');
  this.patient = undefined;
  }

  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

  private actualizeCache() {
     // ToDo: Fehler von this.patient klären
    // this.patientService.getCache().writeCache(this.patient);
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}

