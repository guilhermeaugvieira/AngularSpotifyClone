import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _spotifyService : SpotifyService,
    private _tokenService : TokenService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback(){
    const token = this._tokenService.obterTokenUrlCallback();

    if(!!token){
      this._tokenService.setarTokenUsuario(token);
      this._spotifyService.definirAccessToken(token);

      this._router.navigate(['/player']);
    }
  }

  abrirPaginaLogin() {
    window.location.href = this._spotifyService.obterUrlLogin();
  }

}
