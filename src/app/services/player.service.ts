import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newMusica } from '../helpers/factories';
import { IMusica } from '../interfaces/IMusica';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId : any = null;

  constructor(private _spotifyService: SpotifyService) { 
    this.obterMusicaAtual();
  }

  async obterMusicaAtual() {
    clearTimeout(this.timerId);
    const musica = await this._spotifyService.obterMusicaEmExecucao();

    this.definirMusicaAtual(musica);
    
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000);
  }

  definirMusicaAtual(musica: IMusica) {
    this.musicaAtual.next(musica);
  }
}
