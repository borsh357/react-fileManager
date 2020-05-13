import React from 'react';
import { filemanagerStrusture } from './store';
import File from '../Components/File';
import moment from 'moment';
import folderEmptyIcon from '../img/folder-empty.svg';
// import './api';

export function createEntry(type, name, parentID) {
  const date = moment().format('DD.MM.YYYY HH:mm');

  let newEntry = {
    type: type,
    id:
      filemanagerStrusture.entries[filemanagerStrusture.entries.length - 1].id +
      1,
    name: name,
    date: date,
  };

  if (newEntry.type === 'folder') {
    newEntry.files = [];
    newEntry.parentID = parentID;
  }

  if (parentID) {
    console.log(parentID);
    filemanagerStrusture.entries.forEach((entry) => {
      if (entry.id === parseInt(parentID)) {
        console.log(parentID);
        entry.files.push(newEntry.id);
      }
    });
  }
  filemanagerStrusture.entries.push(newEntry);
  saveFiles();
}

function getEntry(id) {
  let gotEntry;
  filemanagerStrusture.entries.forEach((entry) => {
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
}

function GoBackIcon(props) {
  const { parentID } = props;
  return (
    <div
      className="fm-item-row"
      tabIndex="0"
      onDoubleClick={() => {
        window.location = '/' + parentID;
      }}
    >
      <div className="fm-item-row_filename">
        <img src={folderEmptyIcon} alt="Go back" title="Go back" />
        <span>..</span>
      </div>
    </div>
  );
}

export function getEntriesFrom(id) {
  let gotEntries = [];
  let parentID;
  filemanagerStrusture.entries.forEach((entry) => {
    if (entry.id === id) {
      parentID = entry.parentID;
      entry.files.forEach((entryID) => {
        gotEntries.push(getEntry(entryID));
      });
    }
  });
  sort(gotEntries, filemanagerStrusture.sortMethod);
  if (id !== 0)
    gotEntries.unshift(<GoBackIcon key="0" parentID={parseInt(parentID)} />);
  return gotEntries;
}

function sort(array, sortMethod) {
  switch (sortMethod) {
    case 'byNameDESC':
      array.sort(compareValues('name', 'desc'));
      break;
    case 'byNameASC':
      array.sort(compareValues('name'));
      break;
    case 'byDateDESC':
      array.sort(compareValues('date', 'desc'));
      break;
    case 'byDateASC':
      array.sort(compareValues('date'));
      break;
  }
}

function compareValues(key, order = 'asc') {
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

    if (key != 'date') {
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
    } else {
      if (Date.parse(varA) > Date.parse(varB)) {
        comparison = 1;
      } else if (Date.parse(varA) < Date.parse(varB)) {
        comparison = -1;
      }
    }

    return order === 'desc' ? comparison * -1 : comparison;
  };
}

export function renameEntry(id, newName) {
  filemanagerStrusture.entries.forEach((entry) => {
    if (entry.id === id) {
      entry.name = newName;
    }
  });
  saveFiles();
}

export function deleteEntry(id) {
  filemanagerStrusture.entries.forEach((entry) => {
    if (entry.type === 'folder') {
      entry.files.splice(entry.files.indexOf(id), 1);
    }
    if (entry.id === id) {
      filemanagerStrusture.entries.splice(
        filemanagerStrusture.entries.indexOf(entry),
        1
      );
    }
  });
  saveFiles();
}

export function search(name) {
  filemanagerStrusture.entries[0].files = [];
  if (!name || name === '') return;
  console.log(name);
  filemanagerStrusture.entries.forEach((entry) => {
    if (
      entry.id !== -1 &&
      entry.name.toLowerCase().includes(name.toLowerCase())
    ) {
      filemanagerStrusture.entries[0].files.push(entry.id);
    }
  });
  saveFiles();
}

function saveFiles() {
  fetch('http://localhost:3001/savefiles', {
    method: 'post',
    mode: 'no-cors',
    body: JSON.stringify(filemanagerStrusture.entries),
  }).catch(function (error) {
    console.log('Request failed', error);
  });
}
