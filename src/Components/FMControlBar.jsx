import React from 'react';
import propTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import folderCreateIcon from '../img/folder-create.svg';
import fileCreateIcon from '../img/file-create.svg';
import { filemanagerStructure } from './FileManager';

export default function FMConcrolBar() {
  return (
    <div className="fm-controlBar">
      <FMConcrolBarItem
        active={true}
        icon={folderCreateIcon}
        title="Create Folder"
        contextMenu={<FMCreateFolderShowContext />}
      />

      <FMConcrolBarItem
        active={true}
        icon={fileCreateIcon}
        title="Create File"
        contextMenu={<FMCreateFileShowContext />}
      />
    </div>
  );
}

export function FMConcrolBarItem(props) {
  const { active, icon, title, contextMenu } = props;
  const [isContextShown, toggleContextShow] = React.useState(false);

  FMConcrolBarItem.propTypes = {
    active: propTypes.bool.isRequired,
    icon: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    contextMenu: propTypes.object,
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        toggleContextShow(false);
      }}
    >
      <div>
        <img
          className={
            active ? 'fm-controlBar_icon--active' : 'fm-controlBar_icon'
          }
          src={icon}
          alt={title}
          title={title}
          onClick={() => {
            toggleContextShow(!isContextShown);
          }}
        />

        {isContextShown ? contextMenu : ''}
      </div>
    </OutsideClickHandler>
  );
}

function FMCreateFolderShowContext() {
  return (
    <div className="fm-controlBar_item-context">
      <label htmlFor="fm-controlBar_create-folder-input">Create folder</label>
      <input
        id="fm-controlBar_create-folder-input"
        type="text"
        placeholder="Name"
      />
      <button
        onClick={() => {
          const folderName = document
            .getElementById('fm-controlBar_create-folder-input')
            .value.trim();
          if (folderName === '') return;
          filemanagerStructure.createEntry('folder', folderName, '0');
        }}
      >
        Create
      </button>
    </div>
  );
}

function FMCreateFileShowContext() {
  return (
    <div className="fm-controlBar_item-context">
      <label htmlFor="fm-controlBar_create-file-input">Create file</label>
      <input
        id="fm-controlBar_create-file-input"
        type="text"
        placeholder="Name"
      />
      <button
        onClick={() => {
          const fileName = document
            .getElementById('fm-controlBar_create-file-input')
            .value.trim();
          if (fileName === '') return;
          filemanagerStructure.createEntry('file', fileName, '0');
        }}
      >
        Create
      </button>
    </div>
  );
}
