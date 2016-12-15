import {Component, OnInit} from '@angular/core';
import {Patient} from '../model/patient';
import {PatientService} from '../service/patient.service';
import {MessageService} from '../../shared/service/message/message.service';

@Component({
    selector: 'app-patient-card',
    templateUrl: './patient-card.component.html',
    styleUrls: ['./patient-card.component.scss']
})

export class PatientCardComponent implements OnInit {

    private patients: Array<Patient> = [];
    private isLoading = true;
    private isEditing = false;
    selectedPatient: Patient;

    PatientAnzeige: string = 'Patient';
    private messageService: MessageService<Patient>;

    private infoMsg = {body: '', type: 'info'};

// ToDo: @Output definieren: Output ist der ausgewählte Patient
    constructor(private patientService: PatientService) {
        this.messageService = patientService.messageService;
    }

    ngOnInit() {
        this.getPatients();
    }

    getPatients() {
        this.patientService.getAllItems().subscribe(
            data => {
              this.patients = data;
              this.isLoading = false;
            },
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    onSelect(patient: Patient): void {
        this.selectedPatient = patient;
        console.log('Component list view onSelect', patient);
        this.PatientAnzeige = this.selectedPatient.name;
        this.messageService.selectItem(patient);
    }
    // Ein neuer Patient soll im patient-Detail angelegt werden (button-click hinzufügen)
   onAddPatient(): Patient {
     let patient = new Patient();
     patient.name = 'Neuer Patient';
     this.selectedPatient = patient;
     // Patient-Detail anzeigen
     this.isEditing = true;
      return this.selectedPatient;
   }
    // Im Patient-Detail wurde ein neuer Patient angelegt
    onNewPatient(patient: Patient): Patient {
       console.log('onselect selectedPatient', this.selectedPatient);
       this.selectedPatient = patient;
        this.patients.push(patient);
        this.actualizeCache();
        this.isEditing = false;
        return this.selectedPatient;
    }
    onEditPatient(patient: Patient): void {
        console.log( 'OnEditPatient isEditing', this.isEditing);
        this.selectedPatient = patient;
        this.isEditing = true;
    }
  /* tslint:disable-next-line:no-unused-variable */
  private onDeletePatient(patient) {
    if (patient) {
      this.patientService.deletePatient(patient).subscribe(
        res => {
          let pos = this.patients.map(obj => {
            return obj._id;
          }).indexOf(patient._id);
          this.patients.splice(pos, 1);
          this.actualizeCache();
          this.sendInfoMsg('Patient erfolgreich gelöscht.', 'success');
        },
        error => console.log(error)
      );
    } else {
      this.sendInfoMsg('Kein Patient zum Löschen ausgewählt.', 'danger');
    }
  }


  private actualizeCache() {
    this.patientService.writeCacheList(this.patients);
  }

    sendInfoMsg(body, type, time = 3000) {
        this.infoMsg.body = body;
        this.infoMsg.type = type;
        window.setTimeout(() => this.infoMsg.body = '', time);
    }

}
