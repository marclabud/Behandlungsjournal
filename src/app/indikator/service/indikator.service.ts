import {Injectable} from '@angular/core';
import {ServiceBase} from '../../shared/service.base';
import {paths} from '../../../../server/src/server.conf';
import {Indikator} from '../model/indikator';
import {Headers, RequestOptions, Http} from '@angular/http';
import {MessageService} from '../../shared/service/message/message.service';

@Injectable()
export class IndikatorService extends ServiceBase<Indikator> {
  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});
  private serviceUrl: string;
  public messageService;

  constructor(http: Http) {
    super(http, 'IndikatorService:Indikator');
    this.serviceUrl = '/indicator';
    this.messageService = new MessageService<Indikator>(http, this);
  }

  getIndikatoren() {
    console.log(this.http.get(paths.base_path + '/indicators').map(res => res.json()));
    return this.http.get(paths.base_path + '/indicators').map(res => res.json());
  }

  getIndikatorenByJournalId(journal_id: string) {
    console.log(this.http.get(`${paths.base_path}/indicators/${journal_id}`).map(res => res.json()));
    return this.http.get(`${paths.base_path}/indicators/${journal_id}`).map(res => res.json());
  }

  addIndikator(indikator: Indikator) {
    return this.http.post(paths.base_path + '/indicator', JSON.stringify(indikator), this.options);
  }

  editIndikator(indikator: Indikator) {
    return this.http.put(`${paths.base_path}/indicator/${indikator._id}`, JSON.stringify(indikator), this.options);
  }

  deleteIndikator(indikator: Indikator) {
    return this.http.delete(`${paths.base_path}/indicator/${indikator._id}`, this.options);
  }

  getServiceUrl(isList: boolean): string {
    return paths.base_path + (isList ? this.serviceUrl + 's' : this.serviceUrl);
  }

  getCacheKey(isList: boolean): string {
    return isList ? this.cacheKey + 's' : this.cacheKey;
  }
}
