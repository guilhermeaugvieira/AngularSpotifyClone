import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusica } from 'src/app/interfaces/IMusica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  musicas : IMusica[] = [];
  iconePlay = faPlay;
  
  constructor(private _spotifyService : SpotifyService) { }

  ngOnInit(): void {
    this.obterMusicas();
  }

  async obterMusicas() {
    this.musicas = await this._spotifyService.buscarMusicas();
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: IMusica){
    await this._spotifyService.executarMusica(musica.id);
  }

}
