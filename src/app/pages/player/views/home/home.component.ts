import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/helpers/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas : IMusica[] = [];
  iconePlay = faPlay;

  musicaAtual : IMusica = newMusica();

  subs: Subscription[] = [];
  
  constructor(
    private _spotifyService : SpotifyService,
    private _playerService: PlayerService,
  ) { }
  
  ngOnDestroy(): void {
    this.subs.forEach(subscription => subscription.unsubscribe());
  }

  async ngOnInit(): Promise<void> {
    await this.obterMusicas();
    this.obterMusicaAtual();
  }

  async obterMusicas() {
    this.musicas = await this._spotifyService.buscarMusicas();
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: IMusica){
    await this._spotifyService.executarMusica(musica.id);
    this._playerService.definirMusicaAtual(musica);
  }

  obterMusicaAtual(){
    const sub = this._playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

}
