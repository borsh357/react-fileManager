import React from 'react';
import { createEntry } from '../js/actions';

export default function FMCreateFolderContextMenu(props) {
  const { closeContext } = props;
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
          createEntry('folder', folderName, '0');
          closeContext();
        }}
      >
        Create
      </button>
    </div>
  );
}
