import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  @Input() punto: string;
  @Input() puntoId: string;

  public formSubmitted = false;
  public fechaDesde;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public searchForm = this.fb.group({
    text: ['', Validators.required],
    fechaDesde: [''],
    fechaHasta: ['']
  }, {
    validators: this.fechas('fechaDesde', 'fechaHasta')
  })


  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private searchService: SearchesService) { }

  reporte() {
    const from: string = new Date(this.searchForm.value.fechaDesde).toISOString()
    const to: string = new Date(this.searchForm.value.fechaHasta).toISOString()
    this.formSubmitted = true;
    if( this.searchForm.valid ) {
        this.searchService.buscarString(this.punto).subscribe( res => {
          if(res.Nodes[0]){
            console.log(res)
            this.puntoId = res.Nodes[0].ObjectId;
            this._router.navigate(['trend', this.puntoId, from, to]);
          } else {
            Swal.fire({
              type: 'error',
              text: 'El punto no existe'
            });
            return
          }
        });
    } else {
      console.log('Formulario invalido')
    }
  }

  formIncompleto(): boolean {
    if ( this.searchForm.invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }

  }

  fechasOk(): boolean {
    const desde = this.searchForm.get('fechaDesde').value;
    const hasta = this.searchForm.get('fechaHasta').value;
    if( desde >= hasta && this.formSubmitted ) {
      return true;
    }
    else {
      return false;
    }
  }

  fechas(desdeName: string, hastaName: string) {
    return( formGroup: FormGroup ) => {
      const desde = formGroup.get(desdeName);
      const hasta = formGroup.get(hastaName);

      if (desde.value >= hasta.value){
        hasta.setErrors({ noEsMayor: true})
      } else {
        hasta.setErrors(null);
      }
    }
  }

}
