import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map, debounceTime} from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent implements OnInit {
  title: 'material-test' = "material-test";
  bebidas: string[] = ['Latas Andes', 'Latas Heineken', 'Latas Imperial'];

  control = new FormControl();
  filBebidas!: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.filBebidas = this.control.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(val => this._filter(val))
    );
  }

  //? Filtrado, desde acá el llamado a api
  private _filter(val: string): string[]{
    const formatVal = val.toLocaleLowerCase();

    return this.bebidas.filter(bebida => bebida.toLocaleLowerCase().indexOf(formatVal) === 0);
  }
    
}
