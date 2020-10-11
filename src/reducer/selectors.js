import { createSelector } from 'reselect';

export const getUser = (state) => state.users[0];

export const getUsers = (state) => state.users;

export const getAlbums = (state) => state.albums;

export const getPhotos = (state) => state.photos;

export const isLoaded = createSelector(
  getUsers,
  getAlbums,
  getPhotos,
  (resultOne, resultTwo, resultThree) => !!(resultOne && resultTwo && resultThree)
);

export const getPhotosByAlbum = (state, albumId) => state.photos
  .filter((photo) => photo.albumId === albumId);

export const getAlbumsByUser = createSelector(
  getUser,
  getAlbums,
  getPhotos,
  (user, albums, photos) => {
    const filteredAlbums = albums.filter((album) => album.userId === user.id);
    return filteredAlbums.map((album) => {
      const filteredPhotos = photos.filter((photo) => photo.albumId === album.id);
      return {
        ...album,
        photosCount: filteredPhotos.length,
        imageSrc: filteredPhotos[0].thumbnailUrl,
      }
    });
  },
);
