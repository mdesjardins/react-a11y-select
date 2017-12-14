import React from 'react'

// This is a private, not intended for use except by the Select
// component for wrapping Options (TODO: Make into a HOC for giggles?)
export const OptionWrapper = (props) => {
  const { onMouseOver, onClick, highlightedKey, children, optionKey } = props
  const highlighted = optionKey === highlightedKey
  return (
    <li
      onMouseOver={onMouseOver}
      onClick={onClick}
      className={
        `ReactA11ySelect__ul__li ${highlighted ? 'ReactA11ySelect__ul__li--highlighted' : ''}`
      }
      role="menuitem"
    >
      {children}
    </li>
  )
}

export default OptionWrapper
