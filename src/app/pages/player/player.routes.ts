import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/components/player/home/home.component";
import { PlayerComponent } from "./player.component";

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
      }
    ]
  },
];