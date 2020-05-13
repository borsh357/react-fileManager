import { store } from '@risingstack/react-easy-state';

export const filemanagerStrusture = store({
  entries: [],
  sortMethod: 'byNameASC',
});

export const fmState = store({
  currentFolderID: 0,
});
