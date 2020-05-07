import React from 'react';
import propTypes from 'prop-types';
import File from './File';
import FileManagerUI from './FileManagerUI';

export default class FileManager extends React.Component {
  // состояние необходимо было для ре-рендеринга компонента, но, возможно, в дальнейшем оно пригодится
  state = {
    update: true,
  };

  // тестовые записи для вывода
  entries = [
    { id: 0, name: 'Root', type: 'folder', files: [1, 2, 3] },
    { id: 1, name: 'Folder', type: 'folder', files: [] },
    { id: 2, name: 'File1', type: 'file', date: '15:24 01.01.1000' },
    { id: 3, name: 'File2', type: 'file' },
  ];

  //этот метод необходимо передать вниз
  createEntry(type, name, parentId) {
    const date = new Date();
    let dateDay = date.getDate();
    let dateMonth = date.getMonth();
    if (dateDay < 10) dateDay = '0' + dateDay;
    if (dateMonth < 10) dateMonth = '0' + dateMonth;
    const dateString = `${dateDay}.${dateMonth}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    let newEntry = {
      type: type,
      id: this.entries.length,
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
    this.setState({ update: true });
  }

  getEntry(id) {
    let gotEntry;
    this.entries.forEach((entry) => {
      if (entry.id === id) {
        gotEntry = entry;
      }
    });
    return <File name={gotEntry.name} date={gotEntry.date} />;
  }

  getEntriesFrom(id) {
    let gotEntries = [];
    this.entries.forEach((entry) => {
      if (entry.id === id) {
        entry.files.forEach((entryID) => {
          gotEntries.push(this.getEntry(entryID));
        });
      }
    });
    return gotEntries;
  }

  render() {
    return (
      // upd: метод успешно передается ниже
      <FileManagerUI createEntry={this.createEntry}>
        {this.getEntriesFrom(0)}

        {/* эту кнопку добавил для тестирования */}
        <button
          onClick={() => {
            this.createEntry('folder', 'folder2', '0');
            console.log(this.entries);
          }}
        >
          add
        </button>
      </FileManagerUI>
    );
  }
}
