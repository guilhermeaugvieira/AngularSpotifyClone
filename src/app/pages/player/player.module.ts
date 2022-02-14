import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PainelEsquerdoComponent } from 'src/app/pages/player/views/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/player/painel-esquerdo/botao-menu/botao-menu.component';
import { RodapeUsuarioComponent } from 'src/app/components/player/painel-esquerdo/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from 'src/app/pages/player/views/home/home.component';
import { PainelDireitoComponent } from 'src/app/pages/player/views/painel-direito/painel-direito.component';
import { BuscasRecentesComponent } from 'src/app/components/player/painel-direito/buscas-recentes/buscas-recentes.component';
import { FormsModule } from '@angular/forms';
import { TopArtistasComponent } from 'src/app/components/player/painel-direito/top-artistas/top-artistas.component';
import { OpcaoArtistaComponent } from 'src/app/components/player/painel-direito/opcao-artista/opcao-artista.component';
import { PlayerCardComponent } from 'src/app/components/player/painel-direito/player-card/player-card.component';
import { TopArtistaComponent } from 'src/app/components/player/home/top-artista/top-artista.component';
import { ListaMusicaComponent } from './views/lista-musica/lista-musica.component';
import { BannerComponent } from 'src/app/components/player/lista-musica/banner/banner.component';

@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    PainelDireitoComponent,
    TopArtistaComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    OpcaoArtistaComponent,
    PlayerCardComponent,
    ListaMusicaComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas),
    FontAwesomeModule,
    FormsModule
  ]
})
export class PlayerModule { }
