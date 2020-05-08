import React from 'react';
import { view } from '@risingstack/react-easy-state';
import FileManagerUI from './FileManagerUI';
import { getEntriesFrom } from '../js/actions';
import { useParams } from 'react-router-dom';

function FileManager() {
  let { currentFolderID } = useParams();
  return (
    <FileManagerUI>{getEntriesFrom(parseInt(currentFolderID))}</FileManagerUI>
  );
}

export default view(FileManager);
