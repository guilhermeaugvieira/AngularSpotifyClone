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
    const token = localStorage.getItem('token');
    const validadeToken = localStorage.getItem('validadeToken');

    if(!token || !validadeToken) 
      return null;
    
    this.tokenUsuario = {
      accessToken: token,
      expiracao: addHours(new Date(validadeToken), 1).toUTCString(),
    };
  };

  obterAccessToken() {
    if (!this.tokenUsuario)
      return null;
    
    if(!this.validarExpiracaoToken()) {
      this.invalidarDadosToken();
      return null;
    }

    return this.tokenUsuario.accessToken;
  }

  invalidarDadosToken(){
    this.tokenUsuario = null;
    localStorage.clear();
  }

  validarExpiracaoToken(): boolean {
    if(new Date(this.tokenUsuario.expiracao) < new Date())
      return false;
    
    return true;
  }

  setarTokenUsuario(token: string){
    localStorage.setItem('token', token);
    localStorage.setItem('validadeToken', new Date().toUTCString());

    this.tokenUsuario = {
      accessToken: token,
      expiracao: addHours(new Date(), 1).toUTCString(),
    }
  }
}
