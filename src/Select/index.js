import React, { Component } from 'react'
import Option from '../Option'
import PropTypes from 'prop-types'
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
      selectedIndex: null,
      highlightedIndex: -1,
      selectedValue: null, //TODO
    }
    this.options = []
  }

  componentWillMount() {
    let index = -1
    const indexedOptions = React.Children.map(this.props.children, (child) => {
      if (child.type === Option) {
        index++
        return React.cloneElement(child, {
          onMouseOver: (e) => this.handleOptionHover(e, index),
          onClick: (e) => this.handleOptionClick(e, index),
          index,
        })
      }
      return null
    })
    this.options = React.Children.toArray(indexedOptions).filter((child) => !!child)
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
    const { open, highlightedIndex } = this.state
    if (e.keyCode === keycode.DOWN) {
      if (!open) {
        this.setState({
          open: true,
        })
      }
      const nextIndex = highlightedIndex === React.Children.count(this.options) - 1 ?
            highlightedIndex : highlightedIndex + 1
      this.setState({
        highlightedIndex: nextIndex,
      })
    }

    if (e.keyCode === keycode.UP) {
      const previousIndex = highlightedIndex === 0 ? 0 : highlightedIndex - 1
      this.setState({
        highlightedIndex: previousIndex,
      })
    }

    if (e.keyCode === keycode.ESC) {
      if (open) {
        this.setState({
          open: false,
        })
      }
    }

    // Enter
    if (e.keyCode === keycode.ENTER && open) {
      this.handleOptionClick(e, highlightedIndex)
    }
  }

  handleOptionHover(e, hoverOverIndex) {
    this.setState({
      highlightedIndex: hoverOverIndex,
    })
  }

  handleOptionClick(_e, clickedIndex) {
    this.selectOption(clickedIndex)
  }

  selectOption(index) {
    const { onChange } = this.props
    this.setState({
      open: false,
      selectedIndex: index,
      highlightedIndex: null,
    })

    const selectedValue = this.findOption(index).props.value
    if (onChange) {
      onChange(selectedValue)
    }
  }

  findOption(index) {
    return this.options.find((option) => option.props.index === index)
  }

  renderButtonLabel() {
    const { selectedIndex } = this.state
    const { placeholderText, indicator } = this.props
    if (selectedIndex === null) {
      return (
        <span role="button">
          { placeholderText }
          <div
            className="ReactA11ySelect__button__arrow"
            dangerouslySetInnerHTML={{ __html: indicator }}
          />
        </span>
      )
    }
    return (
      <span role="button">
        {this.findOption(selectedIndex).props.children}
        <div
          className="ReactA11ySelect__button__arrow"
          dangerouslySetInnerHTML={{ __html: indicator }}
        />
      </span>
    )
  }

  renderChildren() {
    const { highlightedIndex, selectedIndex } = this.state
    const options = this.options.map((option) =>
      React.cloneElement(option, {
        id: `option-${option.props.index}`,
        highlighted: (highlightedIndex === option.props.index ? true : undefined),
        selected: (selectedIndex === option.props.index),
        onMouseOver: (e) => this.handleOptionHover(e, option.props.index),
        onClick: (e) => this.handleOptionClick(e, option.props.index),
      })
    )
    return <div>{options}</div>
  }

  render() {
    const { open } = this.state
    return (
      <div
        className="ReactA11ySelect"
        aria-expanded={open}
        ref={(wrapperDiv) => { this.wrapperDiv = wrapperDiv }}
      >
        <div
          tabIndex="0"
          className={
            `ReactA11ySelect__button ${this.state.open ? 'ReactA11ySelect__button--open' : ''}`
          }
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
        >
          {this.renderButtonLabel()}
        </div>
        {this.state.open &&
          <ul role="menu" id="owned_listbox" className="ReactA11ySelect__ul">
            {this.renderChildren()}
          </ul>}
      </div>
    )
  }
}
