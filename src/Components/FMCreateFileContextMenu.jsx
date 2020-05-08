import React from 'react';
import { createEntry } from '../js/actions';

export default function FMCreateFileContextMenu(props) {
  const { closeContext } = props;
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
          createEntry('file', fileName, '0');
          closeContext();
        }}
      >
        Create
      </button>
    </div>
  );
}
