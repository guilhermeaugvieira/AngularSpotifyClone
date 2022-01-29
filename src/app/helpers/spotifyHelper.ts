import { IArtista } from "../interfaces/IArtista";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuario";

function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
  return {
    id: user.id,
    nome: user.display_name,
    imagemUrl: user.images.pop().url,
  }
}

function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  return {
    id: playlist.id,
    nome: playlist.name,
    imagemUrl: playlist.images.pop().url
  }
}

function SpotifyArtistaParaArtista(artista: SpotifyApi.ArtistObjectFull) : IArtista {
  return {
    id: artista.id,
    nome: artista.name,
    imagemUrl: artista.images.sort((a, b) => a.width - b.width).pop().url,
  };
}

export { SpotifyPlaylistParaPlaylist, SpotifyUserParaUsuario, SpotifyArtistaParaArtista};