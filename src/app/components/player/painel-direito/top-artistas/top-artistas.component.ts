import { Component, OnInit } from '@angular/core';
import { IArtista } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  constructor(private _spotifyService: SpotifyService) { }

  artistas: IArtista[] = [];
  
  async ngOnInit(): Promise<void> {
    await this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    this.artistas = await this._spotifyService.buscarTopArtistas(5);
  }

}
