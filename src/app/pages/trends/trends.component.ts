import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchesService } from 'src/app/services/searches.service';
import { ValoresTrends } from 'src/app/models/valores.model';
import Swal from 'sweetalert2';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html'
})
export class TrendsComponent implements OnInit {

  private objectId: string;
  private from: string;
  private to: string;
  public valores: ValoresTrends [] = [];

  public chartCargada: boolean = false;

  public lineChartData: ChartDataSets[] = [ {data: [], label: 'nombre'} ];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   gridLines: {
        //     color: 'rgba(255,0,0,0.3)',
        //   },
        //   ticks: {
        //     fontColor: 'red',
        //   }
        // }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    // { // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // },
    // { // dark grey
    //   backgroundColor: 'rgba(77,83,96,0.2)',
    //   borderColor: 'rgba(77,83,96,1)',
    //   pointBackgroundColor: 'rgba(77,83,96,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


  constructor( private _route: ActivatedRoute, private _search: SearchesService, private router: Router ) {
    this.objectId = _route.snapshot.paramMap.get('id');
    this.from = _route.snapshot.paramMap.get('from');
    this.to = _route.snapshot.paramMap.get('to');
   }

  ngOnInit() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this._search.getTrendId(this.objectId).subscribe( res => {
      if(res) {
        this._search.getTrendValues(res[0].TrendseriesId,this.from,this.to).subscribe( res => {
          this.valores = res.Series;
          Swal.close();
          this.cargarGrafico();
        }, err => {
          console.log(err);
          Swal.fire({
            type: 'error',
            text: 'Error en pedir valores'
          });
        });
    } else {
      Swal.fire({
        type: 'error',
        text: 'Array vacio'
      });
      this.router.navigateByUrl('/home');
    }
    }, err => {
      console.log(err);
        Swal.fire({
        type: 'error',
        text: 'Error al pedir el TrendId'
      });
      this.router.navigateByUrl('/home');
    });
  }

  private listaValores: number[] = [];

  cargarGrafico() {
    this.lineChartData[0].label = this.objectId;
    for (let i = 0; i < this.valores.length; i++) {
      //console.log(parseFloat(this.valores[i].Value));
      this.listaValores.push(Number(this.valores[i].Value));
      if(i%20) {
        this.lineChartLabels.push(new Date(this.valores[i].Timestamp).toLocaleString());
      }
    }
    this.lineChartData[0].data = this.listaValores;
    console.log(this.lineChartData);
    this.chartCargada = true;
  }

  public changeColor() {
  }
}
