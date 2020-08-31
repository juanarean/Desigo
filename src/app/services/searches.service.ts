import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RespBusqueda, ValorPresente, TrendInfo, TrendValues } from '../models/searches.model'

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  private urlBusqueda = 'https://EGEON.sanabria.local:8080/api/systembrowser/1?searchstring=';
  private optionsBusqueda = '&searchOption=1&caseSensitive=false&groupByParent=false';
  private urlValue = 'https://EGEON.sanabria.local:8080/api/values/';
  private optionsValue = '?readAllProperties=true'; //api_key=DefaultAdmin%3ADefaultAdmin&
  private urlTrendId = 'https://egeon.sanabria.local:8080/api/trendseriesinfo/';
  private optionsTrendId = '?api_key=defaultadmin%3ADefaultAdmin';
  private urlTrendValues = 'https://egeon.sanabria.local:8080/api/trendseries/';
  private optionsTrendValues = '?from=2020-06-18T22%3A19%3A26.051Z&to=2020-06-19T12%3A19%3A26.051Z'; //&api_key=defaultadmin%3ADefaultAdmin
  userToken: string = '';

  constructor( private http: HttpClient ) { }

  buscarString (texto: String) {

    this.userToken = localStorage.getItem('token')

    const header = 
    { 
      "Authorization" : "Bearer " + this.userToken,
    };

    const query = this.urlBusqueda + '*' + texto + '*' + this.optionsBusqueda;

    return this.http.get<RespBusqueda>(query, { headers : new HttpHeaders(header)});

  }

  getValor (punto: string) {
    this.userToken = localStorage.getItem('token')

    const header = 
    { 
      "Authorization" : "Bearer " + this.userToken,
    };

    const query = this.urlValue + punto + this.optionsValue;

    return this.http.get<ValorPresente>(query, { headers : new HttpHeaders(header)});

  }

  getTrendId (objectId: string) {
    this.userToken = localStorage.getItem('token')

    const header = 
    { 
      "Authorization" : "Bearer " + this.userToken,
    };

    const query = this.urlTrendId + objectId; // + this.optionsTrendId;

    return this.http.get<TrendInfo[]>(query, { headers : new HttpHeaders(header)});
  }

  getTrendValues (trendSeriesId: string) {
    this.userToken = localStorage.getItem('token')

    const header = 
    { 
      "Authorization" : "Bearer " + this.userToken,
    };

    const query = this.urlTrendValues + trendSeriesId + this.optionsTrendValues;

    return this.http.get<TrendValues>(query, { headers : new HttpHeaders(header)});
  }

}
