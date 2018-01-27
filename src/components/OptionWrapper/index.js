import React from 'react'

// This is a private, not intended for use except by the Select
// component for wrapping Options
// TODO refactor me I'm hideous!
export const OptionWrapper = (props) => {
  const { onMouseOver, onClick, onOptionWrapperRef, selectedKey, highlightedKey, children,
          optionKey, label, value, disabled, highlightedRef, ...others } = props
  const highlighted = optionKey === highlightedKey
  const selected = optionKey === selectedKey
  const ariaLabel = label || value
  return (
    <li
      id={`react-a11y-option-${optionKey}`}
      className="ReactA11ySelect__ul__li"
      tabIndex={highlighted ? "0" : "-1"}
      role="menuitemradio"
      aria-checked={selected ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      aria-label={ariaLabel}
      ref={(e) => onOptionWrapperRef(e)}
      disabled={disabled ? true : undefined}
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
