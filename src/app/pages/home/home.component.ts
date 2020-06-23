import { Component, OnInit } from '@angular/core';
import { SearchesService } from 'src/app/services/searches.service';
import { Router } from '@angular/router';
import { RespBusqueda, ValorPresente } from '../../models/searches.model'
import { NombreValor, ValoresTrends } from '../../models/valores.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  textSearch: String;
  respBusqueda: RespBusqueda;
  datos: NombreValor[] = [];
  mostraDatos: boolean = false;

  constructor(private search: SearchesService, private router: Router) { }

  ngOnInit() {
  }

  async buscar() {
    this.mostraDatos = false;
    this.datos = [];
    //console.log(this.textSearch);
    this.search.buscarString(this.textSearch).subscribe( res => {
      this.respBusqueda = res;
      console.log(res);
      this.cargarDatos();
    });
    
  }

  cargarDatos() {
    for (const iterator of this.respBusqueda.Nodes) {
      if(!iterator.Name.startsWith("Trend_")){
        this.search.getValor(iterator.ObjectId).subscribe( res => {
          this.datos.push({ Nombre : iterator.Name, Valor: res[0].Value.Value, ObjectId:iterator.ObjectId});
        });   
      }
    }
    this.mostraDatos = true;
    //console.log(this.datos); 
  }

}
