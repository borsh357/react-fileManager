import React from 'react';
import propTypes from 'prop-types';
import fileRenameIcon from '../img/file-rename.svg';
import fileDeleteIcon from '../img/delete.svg';
import fileСSSIcon from '../img/file-css.svg';
import fileHTMLIcon from '../img/file-html.svg';
import fileImageIcon from '../img/file-image.svg';
import fileJSIcon from '../img/file-js.svg';
import filePHPIcon from '../img/file-php.svg';
import fileTXTIcon from '../img/file-txt.svg';
import fileDOCIcon from '../img/file-doc.svg';
import blankFileIcon from '../img/file-blank.svg';
import folderIcon from '../img/folder.svg';
import folderEmptyIcon from '../img/folder-empty.svg';
import { fmState } from '../js/store';
import OutsideClickHandler from 'react-outside-click-handler';
import { renameEntry, deleteEntry } from '../js/actions';

export default class File extends React.Component {
  state = {
    isSelected: false,
    isRenameContextShown: false,
    isDeleteContextShown: false,
  };

  getIcon(type, fileName, isEmpty) {
    if (fileName !== '..') {
      var fileExtention = fileName
        .split('.')
        [fileName.split('.').length - 1].toLowerCase();
    }

    if (type === 'folder') {
      if (isEmpty) return folderEmptyIcon;
      return folderIcon;
    }

    switch (fileExtention) {
      case 'css':
        return fileСSSIcon;
      case 'js':
        return fileJSIcon;
      case 'html':
        return fileHTMLIcon;
      case 'jpg':
      case 'jpeg':
      case 'bmp':
      case 'gif':
      case 'svg':
      case 'png':
        return fileImageIcon;
      case 'php':
        return filePHPIcon;
      case 'txt':
        return fileTXTIcon;
      case 'doc':
      case 'docx':
        return fileDOCIcon;
      default:
        return blankFileIcon;
    }
  }

  render() {
    const { name, date, type, id, isEmpty } = this.props;
    return (
      <div
        className="fm-item-row"
        tabIndex="0"
        onFocus={() => this.setState({ isSelected: true })}
        onBlur={() => this.setState({ isSelected: false })}
        onDoubleClick={() => {
          fmState.currentFolderName = name;
          openFolder(type, id);
        }}
      >
        <div className="fm-item-row_filename">
          <img src={this.getIcon(type, name, isEmpty)} alt="" />
          <span>{name}</span>
        </div>
        <span className="fm-item-row_date">{date}</span>
        <OutsideClickHandler
          onOutsideClick={() => {
            this.setState({ isRenameContextShown: false });
          }}
        >
          <div className="fm-file-control-icon">
            <img
              className={
                this.state.isSelected
                  ? 'fm-controlBar_icon--active'
                  : 'fm-controlBar_icon'
              }
              src={fileRenameIcon}
              alt="Rename"
              title="Rename"
              onClick={() => this.setState({ isRenameContextShown: true })}
            />
            {this.state.isRenameContextShown ? (
              <FMRenameShowContext
                id={id}
                closeContext={() => {
                  this.setState({
                    isRenameContextShown: false,
                    isSelected: false,
                  });
                }}
              />
            ) : (
              ''
            )}
          </div>
        </OutsideClickHandler>
        <OutsideClickHandler
          onOutsideClick={() => {
            this.setState({ isDeleteContextShown: false });
          }}
        >
          <div className="fm-file-control-icon">
            <img
              className={
                this.state.isSelected
                  ? 'fm-controlBar_icon--active'
                  : 'fm-controlBar_icon'
              }
              src={fileDeleteIcon}
              alt="Delete"
              title="Delete"
              onClick={() => this.setState({ isDeleteContextShown: true })}
            />
            {this.state.isDeleteContextShown ? (
              <FMDeleteShowContext id={id} name={name} />
            ) : (
              ''
            )}
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

function openFolder(type, id) {
  if (type === 'folder') {
    window.location = '/' + id;
  }
}

function FMRenameShowContext(props) {
  const { id, closeContext } = props;
  return (
    <div className="fm-controlBar_item-context --context-right">
      <label htmlFor="fm-controlBar_create-folder-input">Rename</label>
      <input
        id="fm-controlBar_create-folder-input"
        type="text"
        placeholder="Name"
      />
      <button
        onClick={() => {
          const newName = document
            .getElementById('fm-controlBar_create-folder-input')
            .value.trim();
          if (newName === '') return;
          renameEntry(id, newName);
          closeContext();
        }}
      >
        Rename
      </button>
    </div>
  );
}

function FMDeleteShowContext(props) {
  const { id, name } = props;
  return (
    <div className="fm-controlBar_item-context --context-right delete-context">
      <p>Delete {name} ?</p>
      <button onClick={() => deleteEntry(id)}>Delete</button>
    </div>
  );
}
