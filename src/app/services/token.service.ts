import { Injectable } from '@angular/core';
import { addHours } from 'date-fns';
import { IToken } from '../interfaces/IToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  tokenUsuario: IToken = null;

  constructor() { 
    this.inicializarToken();
  }

  obterTokenUrlCallback(){
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');

    return params[0].split('=')[1];
  }

  inicializarToken(): void {
    const localStorageToken = localStorage.getItem('token');

    if(!localStorageToken) 
      return null;

    const token = JSON.parse(localStorageToken);
    
    this.tokenUsuario = {
      accessToken: token.accessToken,
      expiracao: addHours(new Date(token.dataCriacao), 1).toUTCString(),
    };
  };

  obterAccessToken() {
    if (!this.tokenUsuario)
      return null;
    
    if(!this.validarExpiracaoToken()) {
      this.invalidarTokenUsuario();
      return null;
    }

    return this.tokenUsuario.accessToken;
  }

  invalidarTokenUsuario(){
    this.tokenUsuario = null;
    localStorage.clear();
  }

  validarExpiracaoToken() {
    if(new Date(this.tokenUsuario.expiracao) < new Date())
      return false;
    
    return true;
  }

  setarTokenUsuario(token: string){
    localStorage.setItem('token', JSON.stringify({
      accessToken: token,
      dataCriacao: new Date().toUTCString(),
    }));

    this.tokenUsuario = {
      accessToken: token,
      expiracao: addHours(new Date(), 1).toUTCString(),
    }
  }
}
