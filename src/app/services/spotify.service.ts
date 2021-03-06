import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../helpers/spotifyHelper';
import { TokenService } from './token.service';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private _tokenService : TokenService) { 
    this.spotifyApi = new Spotify();
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUri = `redirect_uri=${SpotifyConfiguration.redirectUri}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`

    return authEndpoint + clientId + redirectUri + scopes + responseType;
  }

  definirAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
  }

  async inicializarUsuario() {
    if(!!this.usuario)
      return true;

    const token = this._tokenService.obterAccessToken();

    if(!token) return false;
    
    try {
      this.definirAccessToken(token);
      await this.obterUsuarioSpotify();
      return !!this.usuario;

    } catch (erro) {
      return false;
    }
  }

  async obterUsuarioSpotify() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50) : Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });

    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10) : Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });

    return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaEmExecucao() : Promise<IMusica>{
    const musica = await this.spotifyApi.getMyCurrentPlayingTrack();

    return SpotifyTrackParaMusica(musica.item);
  }

  async voltarMusica(){
    await this.spotifyApi.skipToPrevious();
  }

  async pularMusica() {
    await this.spotifyApi.skipToNext();
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId, {
      offset,
      limit,
    });

    if(!playlistSpotify) return null;

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });

    playlist.musicas = musicasSpotify.items.map(musica => SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull));

    return playlist;

  }
}

