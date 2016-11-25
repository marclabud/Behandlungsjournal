import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {paths} from '../../../../../../server/src/server.conf';
import {Haeufigkeit} from '../../../model/haeufigkeit';
import {ServiceBase} from '../../../service.base';
import {MessageService} from '../../../service/message/message.service';

@Injectable()
export class HaeufigkeitService extends ServiceBase<Haeufigkeit> {

  private serviceUrl: string;
  public messageService;

  constructor(http: Http) {
    super(http, HaeufigkeitService.name + ':' + Haeufigkeit.name);
    this.serviceUrl = '/haeufigkeit';
    this.messageService = new MessageService<Haeufigkeit>(http, this);
  }

  getServiceUrl(isList: boolean): string {
    return paths.base_path + (isList ? this.serviceUrl + 's' : this.serviceUrl);
  }

  getCacheKey(isList: boolean): string {
    return isList ? this.cacheKey + 's' : this.cacheKey;
  }
}
