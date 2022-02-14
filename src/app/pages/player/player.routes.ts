import { Routes } from "@angular/router";
import { PlayerComponent } from "./player.component";
import { HomeComponent } from "./views/home/home.component";
import { ListaMusicaComponent } from "./views/lista-musica/lista-musica.component";

export const PlayerRotas: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'lista/:tipo/:id',
        component: ListaMusicaComponent,
      }
    ]
  },
];