import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespBusqueda, ValorPresente, TrendInfo, TrendValues } from '../models/searches.model'
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  private urlBusqueda = 'https://EGEON.sanabria.local:8080/api/systembrowser/1?searchstring=';
  private optionsBusqueda = '&searchOption=1&caseSensitive=false&groupByParent=false';
  private urlValue = 'https://EGEON.sanabria.local:8080/api/values/';
  private optionsValue = '?readAllProperties=true'; //api_key=DefaultAdmin%3ADefaultAdmin&
  private urlTrendId = 'https://egeon.sanabria.local:8080/api/trendseriesinfo/';
  // private optionsTrendId = '?api_key=defaultadmin%3ADefaultAdmin';
  private urlTrendValues = 'https://egeon.sanabria.local:8080/api/trendseries/';
  // private optionsTrendValues = '?from=2020-06-18T22%3A19%3A26.051Z&to=2020-06-19T12%3A19%3A26.051Z'; //&api_key=defaultadmin%3ADefaultAdmin
  userToken: string = '';

  constructor( private http: HttpClient ) { }

  buscarString (texto: String) {

    const query = this.urlBusqueda + texto + this.optionsBusqueda;

    return this.http.get<RespBusqueda>(query);

  }

  getValor(punto: string) {
    
    const query = this.urlValue + punto + this.optionsValue;

    return this.http.get<ValorPresente>(query);

  }

  getTrendId (objectId: string) {
  
    const query = this.urlTrendId + objectId; // + this.optionsTrendId;

    return this.http.get<TrendInfo[]>(query);
  }

  getTrendValues (trendSeriesId: string, from: string, to: string) {

    const query = this.urlTrendValues + trendSeriesId + `?from=${from}&to=${to}`;

    return this.http.get<TrendValues>(query).pipe( map( resp => {
      resp.Series.forEach((value) => {
        value.Timestamp = new Date(value.Timestamp).toLocaleString();
        value.Value = value.Value.substr(0,5); 
      })
      return resp
    }));
  }

}
