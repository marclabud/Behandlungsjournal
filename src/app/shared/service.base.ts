import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Cache} from './cache';


@Injectable()
export abstract class ServiceBase<TItem> {

  protected cacheList: Cache<Array<TItem>>;
  protected cache: Cache<TItem>;

  constructor(protected http: Http, protected cacheKey: string) {
    this.cacheList = new Cache<Array<TItem>>(cacheKey);
    this.cache = new Cache<TItem>(cacheKey);
  }

  public getCacheList(): Cache<Array<TItem>> {
    return this.cacheList;
  }

  public getCache(): Cache<TItem> {
    return this.cache;
  }

  public getItem(forceReload = false): Observable<TItem> {
    console.log('Call ServiceBase.getItem()');
    if (this.cache.hasCache() && !forceReload) {
      return Observable.create((observer) => {
        this.log('Cache');
        observer.next(this.cache.readCache());
        observer.complete();
      });
    }

    return this.http.get(this.getServiceUrl(false), {withCredentials: true}).map(res => {
      this.log('DB');
      let orderStatus = res.json();
      this.cache.writeCache(orderStatus);
      return (<TItem>orderStatus);
    });
  }

  public getAllItems(forceReload = false): Observable<TItem[]> {
    console.log('Call ServiceBase.getAllItems()');
    let isList = true;

    if (this.cacheList.hasCache(isList) && !forceReload) {
      return Observable.create((observer) => {
        this.log('Cache', isList);
        observer.next(this.cacheList.readCache(isList));
        observer.complete();
      });
    }

    return this.http.get(this.getServiceUrl(isList), {withCredentials: true}).map(res => {
      this.log('DB', isList);
      let orderStatus = res.json();
      this.cacheList.writeCache(orderStatus, isList);
      return (<TItem[]>orderStatus);
    });
  }

  public updateCacheList(items: TItem[]) {
    let isList = true;
    this.getCacheList().writeCache(items, isList);
    console.log('Update Cache with ' + this.getKey(isList), JSON.stringify(items));
  }

  public updateCache(item: TItem) {
    this.getCache().writeCache(item);
    console.log('Update Cache with ' + this.getKey(), JSON.stringify(item));
  }

  private log(source: string, isList = false) {
    console.log('Load [' + this.getKey(isList) + '] from ' + source);
  }

  protected getKey(isList = false) {
    return isList ? this.cacheKey + 's' : this.getCacheKey(isList);
  }

  public abstract getServiceUrl(isList): string;

  public abstract getCacheKey(isList): string;
}
