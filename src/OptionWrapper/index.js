import React from 'react'

// This is a private, not intended for use except by the Select
// component for wrapping Options
// TODO refactor me I'm hideous!
export const OptionWrapper = (props) => {
  const { onMouseOver, onClick, onOptionWrapperRef, selectedKey, highlightedKey, children,
          optionKey, label, value, optionId, disabled, highlightedRef, ...others } = props
  const highlighted = optionKey === highlightedKey
  const selected = optionKey === selectedKey
  const classes =
    `${highlighted ? 'ReactA11ySelect__ul__li--highlighted' : ''}
     ${selected ? 'ReactA11ySelect__ul__li--selected' : 'ReactA11ySelect__ul__li--unselected'}
     ${disabled ? 'ReactA11ySelect__ul__li--disabled' : ''}`
  const ariaLabel = label || value
  return (
    <li
      id={optionId}
      className={`ReactA11ySelect__ul__li ${classes}`}
      aria-checked={selected ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      aria-label={ariaLabel}
      tabIndex={highlighted ? "0" : "-1"}
      role="menuitemradio"
      ref={(e) => onOptionWrapperRef(e)}
      onMouseOver={disabled ? undefined : onMouseOver}
      onClick={disabled ? undefined : onClick}
      {...others}
    >
      {selected &&
        <span className="ReactA11ySelect__ul__li__selected-indicator" aria-hidden="true"/>}
      {children}
    </li>
  )
}
export default OptionWrapper
