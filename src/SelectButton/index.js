import React from 'react'
import PropTypes from 'prop-types'

export const SelectButton = (props) => {
  const { open, listId, buttonId, highlightedId, onKeyDown, onClick, inner,
    children } = props
  return (
    <button
      tabIndex="0"
      className={
        `ReactA11ySelect__button ${open ? 'ReactA11ySelect__button--open' : ''}`
      }
      id={buttonId}
      role="button"
      aria-haspopup="true"
      aria-expanded={open ? true : undefined} // ARIA recommends not excluding over false
      aria-activedescendant={highlightedId}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      <span aria-controls={listId}>
        {children}
      </span>
      <span className="ReactA11ySelect__button__arrow-indicator" aria-hidden="true" />
    </button>
  )
}

SelectButton.propTypes = {
  open: PropTypes.boolean,
  buttonId: PropTypes.string,
  listId: PropTypes.string,
  highlightedId: PropTypes.string,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
}

export default SelectButton
