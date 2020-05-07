import React from 'react';
import propTypes from 'prop-types';
import logo from '../img/logo.svg';
import FMConcrolBar from './FMControlBar';

export default class FileManagerUI extends React.Component {
  state = {
    sortMethod: 'byNameDESC',
  };

  createEntry = this.props.createEntry;

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
          <FMConcrolBar createEntry={this.createEntry} />

          <div className="fm-column-names">
            <p>
              Name{' '}
              <button className="fm-column-sortBtn">
                {this.state.sortMethod === 'byNameASC' ? '\u2191' : '\u2193'}
              </button>
            </p>
            <p>
              Date{' '}
              <button className="fm-column-sortBtn">
                {this.state.sortMethod === 'byDateASC' ? '\u2191' : '\u2193'}
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
