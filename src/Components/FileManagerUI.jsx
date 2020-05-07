import React from 'react';
import propTypes from 'prop-types';
import logo from '../img/logo.svg';
import FMConcrolBar from './FMControlBar';
import { filemanagerStructure } from './FileManager';

export default class FileManagerUI extends React.Component {
  render() {
    return (
      <div>
        <div className="fm-header">
          <img className="fm-header_logo" src={logo} alt="logo" />
          <span className="fm-header_siteName">OverSpace</span>
          <input
            className="fm-header_searchBar"
            type="text"
            placeholder="Search"
          />
          <button className="fm-header_searchBtn">Go</button>
        </div>
        <div className="fm">
          <div className="fm-current-path">My space &gt; folder</div>

          {/* далее метод передается компоненту controlBar */}
          {/* upd: метод успешно передается ниже */}
          <FMConcrolBar />

          <div className="fm-column-names">
            <p>
              Name{' '}
              <button
                className="fm-column-sortBtn"
                onClick={() => {
                  filemanagerStructure.sortMethod === 'byNameASC'
                    ? (filemanagerStructure.sortMethod = 'byNameDESC')
                    : (filemanagerStructure.sortMethod = 'byNameASC');
                }}
              >
                {filemanagerStructure.sortMethod === 'byNameASC'
                  ? '\u2191'
                  : '\u2193'}
              </button>
            </p>
            <p>
              Date{' '}
              <button
                className="fm-column-sortBtn"
                onClick={() => {
                  filemanagerStructure.sortMethod === 'byDateDESC'
                    ? (filemanagerStructure.sortMethod = 'byDateASC')
                    : (filemanagerStructure.sortMethod = 'byDateDESC');
                }}
              >
                {filemanagerStructure.sortMethod === 'byDateASC'
                  ? '\u2191'
                  : '\u2193'}
              </button>
            </p>
            <p></p>
            <p></p>
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}
