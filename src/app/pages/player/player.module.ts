import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PainelEsquerdoComponent } from 'src/app/components/player/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/player/botao-menu/botao-menu.component';
import { RodapeUsuarioComponent } from 'src/app/components/player/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from 'src/app/components/player/home/home.component';
import { PainelDireitoComponent } from 'src/app/components/player/painel-direito/painel-direito.component';
import { TopArtistaComponent } from 'src/app/components/player/top-artista/top-artista.component';

@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    PainelDireitoComponent,
    TopArtistaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas),
    FontAwesomeModule,
  ]
})
export class PlayerModule { }
