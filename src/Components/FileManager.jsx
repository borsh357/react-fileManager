import React from 'react';
import { store, view } from '@risingstack/react-easy-state';
import File from './File';
import FileManagerUI from './FileManagerUI';

export const filemanagerStructure = store({
  entries: [
    {
      id: 0,
      name: 'Root',
      type: 'folder',
      date: '15:24 01.01.1000',
      files: [1, 2, 3, 5, 6, 7, 8, 9, 15],
    },
    {
      id: 1,
      name: 'Folder',
      type: 'folder',
      date: '15:24 01.01.1000',
      files: [4],
    },
    { id: 2, name: 'File1.js', type: 'file', date: '15:24 01.01.1001' },
    { id: 3, name: 'File3.html', type: 'file', date: '15:24 01.01.1000' },
    { id: 4, name: 'File2.php', type: 'file', date: '15:24 01.01.1040' },
    { id: 5, name: 'File6.doc', type: 'file', date: '15:24 01.01.1002' },
    {
      id: 15,
      name: 'anotherfolder',
      type: 'folder',
      date: '15:24 01.01.1002',
      files: [],
    },
    { id: 6, name: 'File5.docx', type: 'file', date: '15:24 01.01.1000' },
    { id: 7, name: 'File2.jpg', type: 'file', date: '15:24 01.01.1030' },
    { id: 8, name: 'File2.gif', type: 'file', date: '15:24 01.01.1002' },
    { id: 9, name: 'File2.svg', type: 'file', date: '15:24 01.01.1004' },
  ],

  sortMethod: 'byNameASC',

  createEntry(type, name, parentId) {
    const date = new Date();
    let dateDay = date.getDate();
    let dateMonth = date.getMonth();
    let dateMinutes = date.getMinutes();
    if (dateDay < 10) dateDay = '0' + dateDay;
    if (dateMonth < 10) dateMonth = '0' + dateMonth;
    if (dateMinutes < 10) dateMinutes = '0' + dateMinutes;
    const dateString = `${dateDay}.${dateMonth}.${date.getFullYear()} ${date.getHours()}:${dateMinutes}`;

    let newEntry = {
      type: type,
      id: this.entries[this.entries.length - 1].id + 1,
      name: name,
      date: dateString,
    };

    if (newEntry.type === 'folder') newEntry.files = [];

    if (parentId) {
      this.entries.forEach((entry) => {
        if (entry.id == parentId) {
          entry.files.push(newEntry.id);
        }
      });
    }
    this.entries.push(newEntry);
  },

  getEntry(id) {
    let gotEntry;
    this.entries.forEach((entry) => {
      if (entry.id === id) {
        gotEntry = entry;
      }
    });
    return (
      <File
        name={gotEntry.name}
        date={gotEntry.date}
        type={gotEntry.type}
        id={id}
        key={id}
        isEmpty={
          gotEntry.type === 'folder'
            ? gotEntry.files.length > 0
              ? false
              : true
            : true
        }
      />
    );
  },

  getEntriesFrom(id) {
    let gotEntries = [];
    this.entries.forEach((entry) => {
      if (entry.id === id) {
        entry.files.forEach((entryID) => {
          gotEntries.push(this.getEntry(entryID));
        });
      }
    });
    this.sort(gotEntries, this.sortMethod);
    return gotEntries;
  },

  sort(array, sortMethod) {
    switch (sortMethod) {
      case 'byNameDESC':
        array.sort(this.compareValues('name', 'desc'));
        break;
      case 'byNameASC':
        array.sort(this.compareValues('name'));
        break;
      case 'byDateDESC':
        array.sort(this.compareValues('date', 'desc'));
        break;
      case 'byDateASC':
        array.sort(this.compareValues('date'));
        break;
    }
  },

  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.props.hasOwnProperty(key) || !b.props.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA =
        typeof a.props[key] === 'string'
          ? a.props[key].toUpperCase()
          : a.props[key];
      const varB =
        typeof b.props[key] === 'string'
          ? b.props[key].toUpperCase()
          : b.props[key];

      let comparison = 0;

      if (
        (a.props['type'] != 'folder' && b.props['type'] != 'folder') ||
        (a.props['type'] === 'folder' && b.props['type'] === 'folder')
      ) {
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
      } else if (a.props['type'] === 'folder' && b.props['type'] != 'folder') {
        comparison = -1;
      } else {
        comparison = 1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    };
  },

  renameEntry(id, newName) {
    this.entries.forEach((entry) => {
      if (entry.id === id) {
        entry.name = newName;
      }
    });
  },

  deleteEntry(id) {
    this.entries.forEach((entry) => {
      if (entry.type === 'folder') {
        entry.files.splice(entry.files.indexOf(id), 1);
      }
      if (entry.id === id) {
        this.entries.splice(this.entries.indexOf(entry), 1);
      }
    });
  },
});

class FileManager extends React.Component {
  render() {
    return (
      <FileManagerUI>{filemanagerStructure.getEntriesFrom(0)}</FileManagerUI>
    );
  }
}

export default view(FileManager);
