import React from 'react'
import PropTypes from 'prop-types'

export const SelectButton = (props) => {
  const { open, listId, buttonId, highlightedId, onKeyDown, onClick, inner,
    children } = props
  return (
    <button
      className="ReactA11ySelect__button"
      id={buttonId}
      role="button"
      tabIndex={open ? "-1" : "0"}
      aria-haspopup="true"
      aria-expanded={open ? true : undefined} // ARIA recommends not including over false
      aria-controls={listId}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      <span>
        {children}
      </span>
      <span className="ReactA11ySelect__button__arrow-indicator" aria-hidden="true" />
    </button>
  )
}

SelectButton.propTypes = {
  open: PropTypes.bool,
  buttonId: PropTypes.string,
  listId: PropTypes.string,
  highlightedId: PropTypes.string,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
}

export default SelectButton
