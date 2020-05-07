import React from 'react';
import propTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import folderCreateIcon from '../img/folder-create.svg';
import fileCreateIcon from '../img/file-create.svg';
import filemanagerStructure from './FileManager';

export default function FMConcrolBar(props) {
  const createEntry = props.createEntry;
  return (
    <div className="fm-controlBar">
      <FMConcrolBarItem
        active={true}
        src={folderCreateIcon}
        title="Create Folder"
        // тут необходимо передать метод в FMCreateFileShowContext, который в свою очередь сам передается как пропс, вот тут причина
        // upd: метод успешно передается ниже
        contextMenu={<FMCreateFolderShowContext createEntry={createEntry} />}
      />

      <FMConcrolBarItem
        active={true}
        src={fileCreateIcon}
        title="Create File"
        contextMenu={<FMCreateFileShowContext />}
      />
    </div>
  );
}

export function FMConcrolBarItem(props) {
  const { active, src, title, contextMenu } = props;
  const [isContextShown, toggleContextShow] = React.useState(false);

  FMConcrolBarItem.propTypes = {
    active: propTypes.bool.isRequired,
    src: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    contextMenu: propTypes.func,
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
          src={src}
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

function FMCreateFolderShowContext(props) {
  const createEntry = props.createEntry;

  return (
    <div className="fm-controlBar_item-context">
      {console.log(createEntry)}
      <label htmlFor="fm-controlBar_create-folder-input">Create folder</label>
      <input
        id="fm-controlBar_create-folder-input"
        type="text"
        placeholder="Name"
      />
      <button
        //обработчик событий который должен вызвать передаваемый метод и создать папку
        //upd: метод дошел до кнопки, но он обращается не к родительскому элементу
        onClick={() => {
          createEntry('folder', 'folder2', '0');
          console.log(filemanagerStructure);
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
      <button>Create</button>
    </div>
  );
}
