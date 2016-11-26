/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MedicamentDetailComponent } from './medicament-detail.component';
import {FormsModule} from '@angular/forms';
import {BhJournalService} from '../../bhjournal/service/bhjournal.service';
import {MedikationService} from '../service/medikation.service';
import {MedicamentListComponent} from '../medicament-list/medicament-list.component';
import {HttpModule} from '@angular/http';
import {HaeufigkeitComponent} from '../../shared/component/haeufigkeit/haeufigkeit.component';
import {HaeufigkeitService} from '../../shared/component/haeufigkeit/service/haeufigkeit.service';

describe('MedicamentDetailComponent', () => {
  let component: MedicamentDetailComponent;
  let fixture: ComponentFixture<MedicamentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentDetailComponent , MedicamentListComponent, HaeufigkeitComponent],
      imports: [HttpModule, FormsModule],
      providers: [ BhJournalService, MedikationService, HaeufigkeitService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentDetailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
