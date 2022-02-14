import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-opcao-artista',
  templateUrl: './opcao-artista.component.html',
  styleUrls: ['./opcao-artista.component.scss']
})
export class OpcaoArtistaComponent implements OnInit {

  @Input()
  imagemSrc = '';

  @Output()
  click = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }

}
