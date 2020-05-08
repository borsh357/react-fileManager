import { store } from '@risingstack/react-easy-state';

export const filemanagerStrusture = store({
  entries: [
    {
      id: 0,
      name: 'Root',
      type: 'folder',
      date: '08.05.2020 12:45',
      files: [1, 2, 3, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 1,
      name: 'Folder',
      type: 'folder',
      date: '08.05.2021 12:15',
      files: [4],
    },
    { id: 2, name: 'File1.js', type: 'file', date: '09.05.2020 00:43' },
    { id: 3, name: 'File3.html', type: 'file', date: '08.05.2020 12:03' },
    { id: 4, name: 'File2.php', type: 'file', date: '08.05.2020 11:42' },
    { id: 5, name: 'File6.doc', type: 'file', date: '08.05.2020 12:53' },
    {
      id: 10,
      name: 'anotherfolder',
      type: 'folder',
      date: '08.05.2020 12:43',
      files: [],
    },
    { id: 6, name: 'File5.docx', type: 'file', date: '08.05.2020 12:43' },
    { id: 7, name: 'File2.jpg', type: 'file', date: '08.05.2020 12:43' },
    { id: 8, name: 'File2.gif', type: 'file', date: '08.05.2020 16:43' },
    { id: 9, name: 'File2.svg', type: 'file', date: '08.05.2020 12:43' },
  ],

  sortMethod: 'byNameASC',
});
