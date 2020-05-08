import React from 'react';
import folderCreateIcon from '../img/folder-create.svg';
import fileCreateIcon from '../img/file-create.svg';
import FMConcrolBarItem from './FMControlBarItem';

export default function FMConcrolBar() {
  return (
    <div className="fm-controlBar">
      <FMConcrolBarItem
        active={true}
        icon={folderCreateIcon}
        title="Create Folder"
        contextType="folder"
      />

      <FMConcrolBarItem
        active={true}
        icon={fileCreateIcon}
        title="Create File"
        contextType="file"
      />
    </div>
  );
}
