import React from 'react';
import { useEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import FileManagerUI from './FileManagerUI';
import { getEntriesFrom } from '../js/actions';
import { useParams } from 'react-router-dom';
import { filemanagerStrusture, fmState } from '../js/store';

function FileManager() {
  useEffect(() => {
    fetch('http://localhost:3001/files')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        filemanagerStrusture.entries = data;
      })
      .catch(function (ex) {
        console.log('Fetch dailed! ', ex);
      });
  });

  let { currentFolderID } = useParams();
  fmState.currentFolderID = currentFolderID;

  return (
    <FileManagerUI>{getEntriesFrom(parseInt(currentFolderID))}</FileManagerUI>
  );
}

export default view(FileManager);
