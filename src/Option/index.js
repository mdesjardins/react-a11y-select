import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Option extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
  }

  static defaultProps = {
    highlighted: false,
    selected: false,
  }

  render() {
    const { highlighted, onMouseOver, onClick, id } = this.props
    return (
      <li
        className={
          `ReactA11ySelect__ul__li ${highlighted ? 'ReactA11ySelect__ul__li--highlighted' : ''}`
        }
        onMouseOver={onMouseOver}
        onClick={onClick}
        role="menuitem"
        id={id}
      >
        {this.props.children}
      </li>
    )
  }
}
