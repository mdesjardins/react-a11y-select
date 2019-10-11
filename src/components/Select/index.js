import React, { Component } from 'react'
import Option from '../Option'
import OptionWrapper from '../OptionWrapper'
import SelectButton from '../SelectButton'
import PropTypes from 'prop-types'
import uniqueId from 'lodash/uniqueId'
import * as keycode from '../../lib/keycodes'
import { OptionCollection } from '../../lib/optionCollection'

// TODO This class is way too large. Need to break it down into
// smaller subcomponents somehow. :-/
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
    initialValue: PropTypes.string,
    buttonId: PropTypes.string,
    listId: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
  }
  static defaultProps = {
    placeholderText: 'Please choose...',
    buttonId: uniqueId('react-a11y-button-'),
    listId: uniqueId('react-a11y-list-'),
    onChange: (_value) => { },
  }

  constructor(props) {
    super(props)
    const { children, initialValue } = this.props
    const optionComponents =
      React.Children.toArray(children).filter((child) => child.type === Option)
    const options = new OptionCollection(optionComponents)
    let initialOptionKey;

    if (initialValue) {
      const initialOption = options.findOptionByValue(initialValue)
      if (initialOption) {
        initialOptionKey = initialOption.key
      }
    }

    this.state = {
      open: false,
      selectedKey: initialOptionKey,
      highlightedKey: null,
      options: new OptionCollection(optionComponents)
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== undefined) {
      const option = prevState.options.findOptionByValue(nextProps.value);
      if (option) {
        return {
          selectedKey: option.key
        }
      }
    }
    return null;
  }


  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClick = (e) => {
    const { open } = this.state
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      open: !open,
    })
  }

  handleClickOutside = (e) => {
    if (this.wrapperDiv && !this.wrapperDiv.contains(e.target)) {
      const { open } = this.state
      if (open) {
        this.updateExpandedState(false)
      }
    }
  }

  handleKeyDown = (e) => {
    const { open, selectedKey, highlightedKey, options } = this.state
    if (e.keyCode !== keycode.TAB) {
      e.preventDefault()
      e.stopPropagation()
    }

    switch (e.keyCode) {
      case keycode.DOWN: {
        if (!open) {
          this.updateExpandedState(true)
        }
        this.highlightOption(options.getNextEnabledKey(highlightedKey))
        break
      }
      case keycode.UP: {
        this.highlightOption(options.getPreviousEnabledKey(highlightedKey))
        break
      }
      case keycode.ESC: {
        if (open) {
          this.updateExpandedState(false)
        }
        break
      }
      case keycode.SPACE:
      case keycode.ENTER: {
        if (open) {
          this.handleOptionSelect(e, highlightedKey)
        } else {
          this.updateExpandedState(true)
          this.setState({
            highlightedKey: selectedKey,
          })
        }
        break
      }
      case keycode.TAB: {
        if (open) {
          this.updateExpandedState(false)
        }
        break
      }
      default:
    }
    return false
  }

  handleOptionHover(e, hoverOverKey) {
    this.highlightOption(hoverOverKey)
  }

  handleOptionSelect(_e, clickedKey) {
    this.selectOption(clickedKey)
  }

  handleOptionWrapperRef(el) {
    if (el) {
      if (el.getAttribute('tabindex') === '0') {
        el.focus()
      }
    }
  }

  highlightOption(highlightedKey) {
    const candidate = this.state.options.findOptionByKey(highlightedKey)
    if (candidate.props.disabled) {
      return
    }
    this.setState({
      highlightedKey,
    })
  }

  selectOption(key) {
    const { onChange } = this.props
    this.updateExpandedState(false)
    this.setState({
      selectedKey: key,
      highlightedKey: null,
    })

    const selectedOption = this.state.options.findOptionByKey(key)
    const selectedValue = selectedOption.props.value
    if (onChange) {
      onChange(selectedValue)
    }
  }

  updateExpandedState(open) {
    this.setState({
      open,
    })
    if (!open) {
      const { buttonId } = this.props
      const button = document.getElementById(buttonId)
      if (button) {
        button.focus()
      }
    }
  }

  renderChildren() {
    const { highlightedKey, selectedKey } = this.state
    return this.state.options.allOptions().map((option) =>
      <OptionWrapper
        key={`optionwrapper-${option.key}`}
        optionKey={option.key}
        selectedKey={selectedKey}
        highlightedKey={highlightedKey}
        label={option.props.label}
        value={option.props.value}
        disabled={option.props.disabled}
        onOptionWrapperRef={this.handleOptionWrapperRef}
        onMouseOver={(e) => this.handleOptionHover(e, option.key)}
        onClick={(e) => this.handleOptionSelect(e, option.key)}
        onKeyDown={(e) => this.handleKeyDown(e)}
      >
        {option}
      </OptionWrapper>
    )
  }

  render() {
    const { open, highlightedKey, selectedKey, options } = this.state
    const { listId, buttonId, placeholderText } = this.props
    const highlightedId =
      highlightedKey ? `react-a11y-option-${highlightedKey}` : undefined

    return (
      <div
        className="ReactA11ySelect"
        ref={(wrapperDiv) => { this.wrapperDiv = wrapperDiv }}
      >
        <SelectButton
          buttonId={buttonId}
          listId={listId}
          highlightedId={highlightedId}
          open={open}
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
        >
          {!selectedKey && placeholderText}
          {!!selectedKey && options.findOptionByKey(selectedKey).props.children}
        </SelectButton>
        <ul
          id={listId}
          role="menu"
          className="ReactA11ySelect__ul"
          aria-hidden={open ? undefined : true}
          aria-activedescendant={highlightedId}
        >
          {this.renderChildren()}
        </ul>
      </div>
    )
  }
}
