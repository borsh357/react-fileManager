import React from 'react';
import propTypes from 'prop-types';
import fileRenameIcon from '../img/file-rename.svg';
import fileDeleteIcon from '../img/delete.svg';

export default class File extends React.Component {
  state = {
    isSelected: false,
  };

  render() {
    return (
      <div
        className="fm-item-row"
        tabIndex="0"
        onFocus={() => this.setState({ isSelected: true })}
        onBlur={() => this.setState({ isSelected: false })}
      >
        <div className="fm-item-row_filename">
          <img src="" alt="" />
          <span>{this.props.name}</span>
        </div>
        <span className="fm-item-row_date">{this.props.date}</span>
        <img
          className={
            this.state.isSelected
              ? 'fm-controlBar_icon--active'
              : 'fm-controlBar_icon'
          }
          src={fileRenameIcon}
          alt="Rename"
          title="Rename"
        />
        <img
          className={
            this.state.isSelected
              ? 'fm-controlBar_icon--active'
              : 'fm-controlBar_icon'
          }
          src={fileDeleteIcon}
          alt="Delete"
          title="Delete"
        />
      </div>
    );
  }
}
