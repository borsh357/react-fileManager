import React from 'react';
import propTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import FMCreateFileContextMenu from './FMCreateFileContextMenu';
import FMCreateFolderContextMenu from './FMCreateFolderContextMenu';

export default function FMConcrolBarItem(props) {
  const { active, icon, title, contextType } = props;
  const [isContextShown, toggleContextShow] = React.useState(false);

  FMConcrolBarItem.propTypes = {
    active: propTypes.bool.isRequired,
    icon: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    contextType: propTypes.string.isRequired,
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        toggleContextShow(false);
      }}
    >
      <div>
        <img
          className={
            active ? 'fm-controlBar_icon--active' : 'fm-controlBar_icon'
          }
          src={icon}
          alt={title}
          title={title}
          onClick={() => {
            toggleContextShow(!isContextShown);
          }}
        />

        {isContextShown ? (
          contextType === 'folder' ? (
            <FMCreateFolderContextMenu
              closeContext={() => toggleContextShow(false)}
            />
          ) : (
            <FMCreateFileContextMenu
              closeContext={() => toggleContextShow(false)}
            />
          )
        ) : (
          ''
        )}
      </div>
    </OutsideClickHandler>
  );
}
