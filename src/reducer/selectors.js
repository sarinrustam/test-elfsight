import { createSelector } from 'reselect';

export const getUser = (state) => state.users[0];

export const getAlbums = (state) => state.albums;

export const getAlbumsByUser = createSelector(
  getUser,
  getAlbums,
  (user, albums) => albums.filter((album) => album.userId === user.id)
);

export const getPhotosByAlbum = (state, albumId) => {
  return state.photos.filter((photo) => photo.albumId === albumId);
};