import { Component, OnInit, OnDestroy } from '@angular/core';
import {Http} from '@angular/http';
import {BhJournalService} from '../../bhjournal/service/bhjournal.service';
import {MessageService} from '../../shared/service/message/message.service';
import {BhJournal} from '../../bhjournal/model/bhjournal';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-indikator-list',
  templateUrl: './indikator-list.component.html',
  styleUrls: ['./indikator-list.component.css']
})
export class IndikatorListComponent implements OnInit, OnDestroy {
private messageService: MessageService<BhJournal>;
private subscription: Subscription;
private behandlungsjournal: BhJournal;
private isLoading = true;


  constructor(http: Http, private bhjournalService: BhJournalService) {
    this.messageService = bhjournalService.messageService;
    this.subscription = this.messageService.Itemselected$.subscribe(
      behandlungsjournal => {
        this.behandlungsjournal = behandlungsjournal;
        this.isLoading = true;
      });
  }
  ngOnInit() {
    if (typeof(this.behandlungsjournal) !== 'undefined') {
    } else {
      this.behandlungsjournal  = this.bhjournalService.readCache();
      this.isLoading = false;
    }
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}

