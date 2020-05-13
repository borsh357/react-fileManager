import React from 'react';
import propTypes from 'prop-types';
import logo from '../img/logo.svg';
import FMConcrolBar from './FMControlBar';
import { filemanagerStrusture, fmState } from '../js/store';
import { search } from '../js/actions';

export default class FileManagerUI extends React.Component {
  state = {
    searchValue: '',
  };

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
            onInput={() => {
              let value = document
                .querySelector('.fm-header_searchBar')
                .value.trim();
              this.setState({ searchValue: value });
              search(value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') window.location = '/-1';
            }}
          />
          <button
            className="fm-header_searchBtn"
            onClick={() => {
              if (this.state.searchValue !== '') window.location = '/-1';
            }}
          >
            Go
          </button>
        </div>
        <div className="fm">
          <div className="fm-current-path">to do(currentFolderName)</div>
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
