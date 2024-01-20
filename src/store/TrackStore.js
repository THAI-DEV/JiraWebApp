import { atom } from 'jotai';

const initTrackInfo = {
  lastAppRoute: '',
};

export const trackInfoAtom = atom(initTrackInfo);

export const setTrackAtom = atom(null, (_get, set, payload) => {
  set(trackInfoAtom, {
    lastAppRoute: payload,
  });
});

// export const getTrackAtom = atom((get) => {
//   return get(trackInfoAtom);
// });
