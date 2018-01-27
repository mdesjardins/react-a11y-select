import React from 'react'
import PropTypes from 'prop-types'

// World's most unintersting component. :) The real work happens in OptionWrapper.
export const Option = (props) => (
  <div>
    {props.children}
  </div>
)

Option.propTypes = {
  label: PropTypes.string,
}

export default Option
