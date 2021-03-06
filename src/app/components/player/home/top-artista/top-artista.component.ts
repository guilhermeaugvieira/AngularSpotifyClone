import { Component, OnInit } from '@angular/core';
import { ar } from 'date-fns/locale';
import { newArtista } from 'src/app/helpers/factories';
import { IArtista } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit {

  topArtista : IArtista = newArtista();
  
  constructor(
    private _spotifyService: SpotifyService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.buscarArtista();
  }

  async buscarArtista() {
    const artistas = await this._spotifyService.buscarTopArtistas(1);

    if(!!artistas)
      this.topArtista = artistas.pop();
  }

}
