import React from 'react';
import { view } from '@risingstack/react-easy-state';
import FileManagerUI from './FileManagerUI';
import { getEntriesFrom } from '../js/actions';

class FileManager extends React.Component {
  render() {
    const { currentFolderID } = this.props;
    return <FileManagerUI>{getEntriesFrom(currentFolderID)}</FileManagerUI>;
  }
}

export default view(FileManager);
