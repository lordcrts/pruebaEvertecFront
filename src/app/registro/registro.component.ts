import { DataSource } from '@angular/cdk/table';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ModalComponent } from './modal/modal.component';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroComponent implements OnInit {
  displayedColumns = ["username", "first_name", "last_name", "marital_status", "siblings", "birthday", "acciones"];
  dataSource: FilesDataSource | null;
  submit:boolean
  
  constructor(private _service: RegistroService,
              private _matDialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) { 

              }
  
  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this._service);
  }

  creareHandle(element?,tipo?): void {
    const dialogRef = this._matDialog.open(ModalComponent, {
      panelClass: 'modal-dialog',
      data: {
        element:element,
        tipo:tipo
      },
      disableClose: true,
      minWidth:'300px',
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this._service._getUsers().then(data => {
          this.dataSource.connect()
          this.dataSource = new FilesDataSource(this._service);
        })
      }
    });
  }

}

export class FilesDataSource extends DataSource<any>{
  
  constructor(
    private _service: RegistroService,
  ) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._service.users
    ];

    return merge(...displayDataChanges)
      .pipe(
        map(() => {

          const data = this._service.users.slice();
          return data;
        }
        ));
  }

  /**
   * Disconnect
   */
  disconnect(): void { }

}
