import { Component } from '@angular/core';
import { SearchesService } from 'src/app/services/searches.service';
import { Router } from '@angular/router';
import { RespBusqueda } from '../../models/searches.model'
import { NombreValor } from '../../models/valores.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent  {

  textSearch: String;
  respBusqueda: RespBusqueda;
  datos: NombreValor[] = [];
  mostraDatos: boolean = false;
  public puntoSelected: string;
  public puntoSelectedId: string;

  constructor(private searchService: SearchesService, private router: Router) { }


  async buscar() {
    this.mostraDatos = false;
    this.datos = [];
    this.searchService.buscarString('*' + this.textSearch + '*').subscribe( res => {
      if(res.Nodes[0]){
        this.respBusqueda = res;
        this.cargarDatos();
      } else {
        Swal.fire({
          type: 'error',
          text: 'El punto no existe'
        });
        return
      }
    });
    
  }

  cargarDatos() {
    for (const iterator of this.respBusqueda.Nodes) {
      if(!iterator.Name.startsWith("Trend_")){
        this.searchService.getValor(iterator.ObjectId).subscribe( res => {
          this.datos.push({ Nombre : iterator.Name, Valor: res[0].Value.Value, ObjectId:iterator.ObjectId});
        });   
      }
    }
    this.mostraDatos = true;
  }

  ponerPunto(punto: NombreValor) {
    this.puntoSelected = punto.Nombre;
    this.puntoSelectedId = punto.ObjectId; 
  }

}
