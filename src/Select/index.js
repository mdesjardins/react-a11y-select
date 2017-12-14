import React, { Component } from 'react'
import Option from '../Option'
import OptionWrapper from '../OptionWrapper'
import PropTypes from 'prop-types'
import uniqueId from 'lodash/uniqueId'
import * as keycode from '../keycodes'

export default class Select extends Component {
  static propTypes = {
    label: (props, propName, componentName) => {
      if (!props.label && !props.labelledBy) {
        const msg = `One of props 'label' or 'labelledBy' was not specified in ${componentName}`
        return new Error(msg)
      }
      return null
    },
    labelledBy: (props, propName, componentName) => {
      const msg = `One of props 'label' or 'labelledBy' was not specified in ${componentName}`
      if (!props.label && !props.labelledBy) {
        return new Error(msg)
      }
      return null
    },
    placeholderText: PropTypes.string,
    indicator: PropTypes.string,
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    placeholderText: 'Please choose...',
    indicator: '&#x25be;',
    onChange: (_value) => {},
  }

  constructor() {
    super()
    this.state = {
      open: false,
      selectedKey: null,
      highlightedKey: null,
    }
    this.options = []
  }

  componentWillMount() {
    const { children, initialValue } = this.props
    this.options = React.Children.toArray(children).filter((child) => child.type === Option)
    if (initialValue) {
      const initialOption = this.findOptionByValue(initialValue)
      if (initialOption) {
        this.setState({
          selectedKey: initialOption.key,
        })
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClick = (_e) => {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  handleClickOutside = (e) => {
    if (this.wrapperDiv && !this.wrapperDiv.contains(e.target)) {
      const { open } = this.state
      if (open) {
        this.setState({
          open: false,
        })
      }
    }
  }

  handleKeyDown = (e) => {
    const { open, highlightedKey } = this.state
    e.preventDefault()
    switch (e.keyCode) {
      case keycode.DOWN: {
        if (!open) {
          this.setState({
            open: true,
          })
        }
        this.setState({
          highlightedKey: this.nextKey(highlightedKey),
        })
        break
      }
      case keycode.UP: {
        this.setState({
          highlightedKey: this.previousKey(highlightedKey),
        })
        break
      }
      case keycode.ESC: {
        if (open) {
          this.setState({
            open: false,
          })
        }
        break
      }
      case keycode.SPACE:
      case keycode.ENTER: {
        if (open) {
          this.handleOptionSelect(e, highlightedKey)
        } else {
          this.setState({
            open: true,
            highlightedIndex: 0,
          })
        }
        break
      }
      case keycode.TAB: {
        if (open) {
          this.setState({
            open: false,
          })
        }
        break
      }
      default:
    }
  }

  handleOptionHover(e, hoverOverKey) {
    this.setState({
      highlightedKey: hoverOverKey,
    })
  }

  handleOptionSelect(_e, clickedKey) {
    this.selectOption(clickedKey)
  }

  selectOption(key) {
    const { onChange } = this.props
    this.setState({
      open: false,
      selectedKey: key,
      highlightedKey: null,
    })

    const selectedValue = this.findOptionByKey(key).props.value
    if (onChange) {
      onChange(selectedValue)
    }
  }

  findOptionByValue(value) {
    return this.options.find((option) => option.props.value === value)
  }

  findOptionByKey(key) {
    return this.options.find((option) => option.key === key)
  }

  nextKey(key) {
    const currentIndex = this.options.findIndex((option) => option.key === key)
    if (currentIndex === -1) {
      // nothing selected yet, so select the first thing.
      return this.options[0].key
    } else if (currentIndex === this.options.length - 1) {
      return this.options[currentIndex].key
    }
    return this.options[currentIndex + 1].key
  }

  previousKey(key) {
    const currentIndex = this.options.findIndex((option) => option.key === key)
    if (currentIndex === 0) {
      return currentIndex
    }
    return this.options[currentIndex - 1].key
  }

  renderButtonLabel(listId) {
    const { selectedKey } = this.state
    const { placeholderText, indicator } = this.props
    // We use aria-hidden="true" to hide the down arrow, which
    // might not have awesome support. We should maybe move to
    // using a positioned background image.
    if (selectedKey === null) {
      return (
        <span aria-controls={listId}>
          { placeholderText }
          <div
            className="ReactA11ySelect__button__arrow"
            dangerouslySetInnerHTML={{ __html: indicator }}
            aria-hidden="true"
          />
        </span>
      )
    }
    return (
      <span aria-controls={listId}>
        {this.findOptionByKey(selectedKey).props.children}
        <div
          className="ReactA11ySelect__button__arrow"
          dangerouslySetInnerHTML={{ __html: indicator }}
        />
      </span>
    )
  }

  renderChildren() {
    const { highlightedKey, selectedKey } = this.state
    return this.options.map((option) =>
      <OptionWrapper
        onMouseOver={(e) => this.handleOptionHover(e, option.key)}
        onClick={(e) => this.handleOptionSelect(e, option.key)}
        key={`optionwrapper-${option.key}`}
        optionKey={option.key}
        selectedKey={selectedKey}
        highlightedKey={highlightedKey}
      >
        {option}
      </OptionWrapper>
    )
  }

  render() {
    const { open } = this.state
    const listId = `react-a11y-select-${uniqueId()}`
    return (
      <div
        className="ReactA11ySelect"
        ref={(wrapperDiv) => { this.wrapperDiv = wrapperDiv }}
      >
        <button
          tabIndex="0"
          className={
            `ReactA11ySelect__button ${this.state.open ? 'ReactA11ySelect__button--open' : ''}`
          }
          role="button"
          aria-haspopup="true"
          aria-expanded={open ? true : undefined} // ARIA recommends not excluding over false
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
        >
          {this.renderButtonLabel(listId)}
        </button>
        {this.state.open &&
          <ul id={listId} role="menu" className="ReactA11ySelect__ul">
            {this.renderChildren()}
          </ul>}
      </div>
    )
  }
}
