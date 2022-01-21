import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { TokenService } from './token.service';

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
}
