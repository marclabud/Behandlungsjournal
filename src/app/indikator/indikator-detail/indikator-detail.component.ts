import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Indikator} from '../model/indikator';
import {IndikatorService} from '../service/indikator.service';
import {BhJournalService} from '../../bhjournal/service/bhjournal.service';
import {MessageService} from '../../shared/service/message/message.service';
import {Subscription} from 'rxjs';
import {BhJournal} from '../../bhjournal/model/bhjournal';
import * as moment from 'moment';
import {Haeufigkeit} from '../../shared/model/haeufigkeit';
import {HaeufigkeitService} from '../../shared/component/haeufigkeit/service/haeufigkeit.service';


@Component({
  selector: 'app-indikator-detail',
  templateUrl: './indikator-detail.component.html',
  styleUrls: ['./indikator-detail.component.scss']
})
export class IndikatorDetailComponent implements OnInit, OnDestroy {

  private messageServiceIndikator: MessageService<Indikator>;
  private messageHaeufigkeitService: MessageService<Haeufigkeit>;
  private subscriptionIndikator: Subscription;

  private indikatoren: Array<Indikator> = [];
  private infoMsg = {body: '', type: 'info'};
  private goBack = false;
  isLoading = true;

  @Input() private isEditing;
  @Input() private indikator: Indikator;

  /* tslint:disable-next-line:no-unused-variable */
  private labelStart = 'Beginn:';
  /* tslint:disable-next-line:no-unused-variable */
  private labelEnde = 'Ende:';

  constructor(private haeufigkeitService: HaeufigkeitService,
              private indikatorService: IndikatorService,
              private bhjournalService: BhJournalService) {
    this.messageServiceIndikator = this.indikatorService.messageService;
    this.messageHaeufigkeitService = this.haeufigkeitService.messageService;
    this.subscribeIndikator();
  }

  private subscribeIndikator() {
    this.subscriptionIndikator = this.messageServiceIndikator.Itemselected$.subscribe(
      obj => {
        this.indikator = obj;
      });
  }

  ngOnInit() {
    this.getIndikator();
    this.setJournalId();
    this.isLoading = false;
  }

  private getIndikator() {
    if (this.isEditing) {
      this.indikator = this.indikatorService.readCache();
      this.messageHaeufigkeitService.selectItem(this.indikator.haeufigkeit);
    } else {
      this.indikator = new Indikator();
    }
  }

  private setJournalId() {
    const journal: BhJournal = this.bhjournalService.readCache();
    this.indikator.journal_id = journal._id;
  }

  addIndikator(indikator) {
    console.log('Medikation wird hinzugefügt', JSON.stringify(indikator));
    if (typeof(indikator._id) === 'undefined' || indikator._id === '') {
      this.indikatorService.addIndikator(indikator).subscribe(
        res => {
          const newIndikator = this.indikatoren.push(res);
          this.actualizeCache();
          this.sendInfoMsg('Neuer Indikator erfolgreich hinzugefügt.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  editIndikator(indikator) {
    console.log('Indikator wird geändert', JSON.stringify(indikator));
    this.indikatorService.editIndikator(indikator).subscribe(
      res => {
        this.indikator = indikator;
        this.indikatoren.push(this.indikator);
        this.actualizeCache();
        this.sendInfoMsg('Indikator erfolgreich geändert.', 'success');
      },
      error => console.log(error)
    );
  }


  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

  // receive change from HaeufigkeitComponent
  onHaeufigkeitChange(haeufigkeit: Haeufigkeit) {
    this.indikator.haeufigkeit = haeufigkeit;
  }

  onStartDatumChanged(startDatum: moment.Moment) {
    this.indikator.dauer.startDatum = startDatum;
  }

  onEndeDatumChanged(endeDatum: moment.Moment) {
    this.indikator.dauer.endeDatum = endeDatum;
  }

  isDauerValid(): boolean {
    return moment(this.indikator.dauer.startDatum).isValid()
      && moment(this.indikator.dauer.endeDatum).isValid();
  }

  back() {
    this.messageHaeufigkeitService.removeFromCache();
    this.goBack = true;
  }

  private actualizeCache() {
    this.indikatorService.writeCache(this.indikator);
    this.indikatorService.writeCacheList(this.indikatoren);
  }

  ngOnDestroy() {
    this.subscriptionIndikator.unsubscribe();
  }

}
