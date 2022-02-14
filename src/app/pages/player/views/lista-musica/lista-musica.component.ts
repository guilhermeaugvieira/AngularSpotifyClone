import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/helpers/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica.component.scss']
})
export class ListaMusicaComponent implements OnInit, OnDestroy {

  bannerImagemUrl = '';
  bannerTexto = '';
  
  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();

  iconePlay = faPlay;

  subs: Subscription[] = [];

  titulo = '';
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _spotifyService: SpotifyService,
    private _playerService: PlayerService,
  ) { }
  
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async ngOnInit(): Promise<void> {
    await this.obterMusicas();
    this.obterMusicaAtual();
  }

  async obterMusicas() {
    const sub = this._activatedRoute.paramMap.subscribe(async params => {
      const tipo = params.get('tipo');
      const id = params.get('id');

      await this.obterDadosPagina(tipo, id);
    });

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string){
    if(tipo === 'playlist')
      await this.obterDadosPlaylist(id);
    else
      await this.obterDadosArtista(id);
  }

  async obterDadosPlaylist(playlistId: string){
    const playlistMusicas = await this._spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
    this.titulo = 'Musicas da playlist: ' + playlistMusicas.nome;
  }

  async obterDadosArtista(artistaId: string){

  }

  definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]){
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  async executarMusica(musica: IMusica){
    await this._spotifyService.executarMusica(musica.id);
    this._playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  obterMusicaAtual(){
    const sub = this._playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

}
