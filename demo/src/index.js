import React, { Component } from 'react'
import { render } from 'react-dom'

import { Select, Option } from '../../src'

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-a11y-select Demo</h1>

        <Select label="Test method">
          <Option key="1" value="1">Option 1</Option>
          <Option key="2" value="2">Option <i>2</i></Option>
          <Option key="3" value="3">Option 3</Option>
        </Select>

        <h1>Native</h1>
        <select>
          <option>Native Option 1</option>
          <option>Native Option 2</option>
          <option>Native Option 3</option>
        </select>

      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
