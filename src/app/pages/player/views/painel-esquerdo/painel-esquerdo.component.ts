import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  menuSelecionado = 'Home';
  playlists: IPlaylist[] = [];
  
  //Icones
  iconeHome = faHome;
  iconePesquisar = faSearch;
  iconeArtista = faGuitar;
  iconePlaylist = faMusic;
  
  constructor(
    private _spotifyService: SpotifyService,
    private _router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.buscarPlaylists();
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    this._router.navigateByUrl(`player/${botao.toLowerCase()}`);
  }

  async buscarPlaylists(){
    this.playlists = await this._spotifyService.buscarPlaylistUsuario();
  }

  irParaPlaylist(playlistId: string){
    this.menuSelecionado = playlistId;
    this._router.navigateByUrl(`player/lista/playlist/${playlistId}`);
  }

}
