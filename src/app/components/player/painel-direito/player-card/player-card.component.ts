import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/helpers/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();

  iconeAnterior = faStepBackward;
  iconeProximo = faStepForward;

  subs: Subscription[] = [];
  
  constructor(private _playerService: PlayerService) { }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  obterMusicaTocando(){
    const sub = this._playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  async voltarMusica(){
    await this._playerService.voltarMusica();
  }

  async proximaMusica(){
    await this._playerService.proximaMusica();
  }

}
