import React, { Component } from 'react'
import Option from '../Option'
import '../index.css'

export default class Select extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      selectedIndex: null,
      highlightedIndex: -1,
      selectedValue: null, //TODO
    }
    //this.optionKeys = []
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

  // componentWillMount() {
  //   // can't use toArray here, it munges up the keys
  //   // const children = React.Children.toArray(this.props.children)
  //   // const options = children.filter((child) => child.type === Option)
  //   const keys = React.Children.map(this.props.children, (child) => {
  //     if (child.type === Option) {
  //       return child.key
  //     }
  //     return null
  //   })
  //   this.optionKeys = keys.filter((key) => key !== null)

  //   const children = React.Children.map(this.props.children, (child) => {
  //     if (child.type === Option) {
  //       return React.cloneElement(child)
  //     }
  //     return null
  //   })
  //   this.options = children.filter((child) => child !== null)
  // }

  handleClick = (_e) => {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  handleKeyDown = (e) => {
    const { open, highlightedIndex } = this.state
    // down arrow
    if (e.keyCode === 40) {
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

    // up arrow
    if (e.keyCode === 38) {
      // const previousKey = this.previousKey(highlightedIndex)
      const previousIndex = highlightedIndex === 0 ? 0 : highlightedIndex - 1
      this.setState({
        highlightedIndex: previousIndex,
      })
    }

    // Escape Key
    if (e.keyCode === 27) {
      if (open) {
        this.setState({
          open: false,
        })
      }
    }

    // Enter
    if (e.keyCode === 13) {
      if (open) {
        this.setState({
          open: false,
          selectedIndex: this.state.highlightedIndex,
          highlightedIndex: null,
        })
      }
    }
  }

  handleOptionHover(e, hoverOverIndex) {
    this.setState({
      highlightedIndex: hoverOverIndex,
    })
  }

  handleOptionClick(e, clickedIndex) {
    this.setState({
      open: false,
      selectedIndex: clickedIndex,
      highlightedIndex: null,
    })
  }

  findOption(index) {
    return this.options.find((option) => option.props.index === index)
  }

  renderButtonLabel() {
    const { selectedIndex } = this.state
    if (selectedIndex === null) {
      return (
        <span>
          Selected <div role="presentation" className="arrow">&#x25be;</div>
        </span>
      )
    }
    return this.findOption(selectedIndex).props.children
  }

  renderChildren() {
    const { highlightedIndex, selectedIndex } = this.state
    const options = this.options.map((option) =>
      React.cloneElement(option, {
        highlighted: (highlightedIndex === option.props.index ? true : undefined),
        selected: (selectedIndex === option.props.index),
        onMouseOver: (e) => this.handleOptionHover(e, option.props.index),
        onClick: (e) => this.handleOptionClick(e, option.props.index),
        id: `option-${option.props.index}`,
      })
    )
    return <div>{options}</div>
  }

  render() {
    const { selectedIndex } = this.state
    return (
      <div
        className="ReactA11ySelect"
        role="combobox"
        aria-expanded="false"
        aria-owns="owned_listbox"
        aria-haspopup="listbox"
      >
        <div
          tabIndex="0"
          className={`button ${this.state.open ? 'open' : 'closed'}`}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          aria-autocomplete="none"
          aria-controls="owned_listbox"
          aria-activedescendant={selectedIndex}
        >
          {this.renderButtonLabel()}
        </div>
        {this.state.open &&
          <ul role="listbox" id="owned_listbox">
            {this.renderChildren()}
          </ul>}
      </div>
    )
  }
}
