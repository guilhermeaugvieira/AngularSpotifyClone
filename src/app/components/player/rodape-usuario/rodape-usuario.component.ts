import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { th } from 'date-fns/locale';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {

  iconeSair = faSignOutAlt;
  usuario: IUsuario = null;
  
  constructor(
    private _spotifyService: SpotifyService,
    private _tokenService: TokenService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.usuario = this._spotifyService.usuario;
  }

  logout(): void{
    this._tokenService.invalidarTokenUsuario();
    this._router.navigate(['/login']);
  }

}
