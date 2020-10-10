const initialState = {
  albums: null,
  photos: null,
  users: null,
};

const ActionType = {
  LOAD_ALBUMS: "LOAD_ALBUMS",
  LOAD_PHOTOS: "LOAD_PHOTOS",
  LOAD_USERS: "LOAD_USERS",
};

const ActionCreator = {
  loadAlbums: (albums) => ({ type: ActionType.LOAD_ALBUMS, payload: albums }),
  loadPhotos: (photos) => ({ type: ActionType.LOAD_PHOTOS, payload: photos }),
  loadUsers: (users) => ({ type: ActionType.LOAD_USERS, payload: users }),
};

const Operation = {
  loadAlbums: () => (dispatch, getState, api) => {
    return api
      .get("/albums")
      .then((response) => {
        dispatch(ActionCreator.loadAlbums(response.data));
      })
      .catch(() => {});
  },
  loadPhotos: () => (dispatch, getState, api) => {
    return api
      .get("/photos")
      .then((response) => {
        dispatch(ActionCreator.loadPhotos(response.data));
      })
      .catch(() => {});
  },
  loadUsers: () => (dispatch, getState, api) => {
    return api
      .get("/users")
      .then((response) => {
        dispatch(ActionCreator.loadUsers(response.data));
      })
      .catch(() => {});
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_ALBUMS:
      return {
        ...state,
        albums: action.payload,
      };
    case ActionType.LOAD_PHOTOS:
      return {
        ...state,
        photos: action.payload,
      };
    case ActionType.LOAD_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export { reducer, ActionType, ActionCreator, Operation };
