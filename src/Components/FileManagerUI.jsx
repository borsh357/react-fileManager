import React from 'react';
import propTypes from 'prop-types';
import logo from '../img/logo.svg';
import FMConcrolBar from './FMControlBar';
import { filemanagerStrusture } from '../js/store';

export default class FileManagerUI extends React.Component {
  render() {
    return (
      <div>
        <div className="fm-header">
          <a href="/">
            <img className="fm-header_logo" src={logo} alt="logo" />
          </a>
          <a href="/">
            <span className="fm-header_siteName">OverSpace</span>
          </a>
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
                  filemanagerStrusture.sortMethod === 'byNameASC'
                    ? (filemanagerStrusture.sortMethod = 'byNameDESC')
                    : (filemanagerStrusture.sortMethod = 'byNameASC');
                }}
              >
                {filemanagerStrusture.sortMethod === 'byNameASC'
                  ? '\u2191'
                  : '\u2193'}
              </button>
            </p>
            <p>
              Date{' '}
              <button
                className="fm-column-sortBtn"
                onClick={() => {
                  filemanagerStrusture.sortMethod === 'byDateDESC'
                    ? (filemanagerStrusture.sortMethod = 'byDateASC')
                    : (filemanagerStrusture.sortMethod = 'byDateDESC');
                }}
              >
                {filemanagerStrusture.sortMethod === 'byDateASC'
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
