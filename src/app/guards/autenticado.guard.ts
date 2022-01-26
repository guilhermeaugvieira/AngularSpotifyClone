import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanLoad {
  
  constructor(
    private _router: Router, 
    private _spotifyService: SpotifyService,
    private _tokenService: TokenService) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this._tokenService.obterAccessToken();

      if (!token) return this.naoAutenticado();

      return new Promise(async (res) => {
        const usuarioCriado = await this._spotifyService.inicializarUsuario();
        
        if(usuarioCriado)
          res(true);
        else
          res(this.naoAutenticado());
      });
    };

  naoAutenticado() {
    this._tokenService.invalidarTokenUsuario();
    this._router.navigate(['login']);
    return false;
  }
}
