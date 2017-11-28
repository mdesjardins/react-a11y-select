import React, { Component } from 'react'
import { render } from 'react-dom'

import { Select, Option } from '../../src'

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>React Component</h1>
        <Select label="Test method">
          <Option value="apple">
            <img src="/apple.png" role="presentation" />
            Apple
          </Option>
          <Option value="cherry">
            <img src="/cherry.png" role="presentation" />
            Cherry
          </Option>
          <Option value="grape">
            <img src="/grape.png" role="presentation" />
            Grape
          </Option>
          <Option value="lemon">
            <img src="/lemon.png" role="presentation" />
            Lemon
          </Option>
          <Option value="orange">
            <img src="/orange.png" role="presentation" />
            Orange
          </Option>
          <Option value="peach">
            <img src="/peach.png" role="presentation" />
            Peach
          </Option>
          <Option value="pineapple">
            <img src="/pineapple.png" role="presentation" />
            Pineapple
          </Option>
          <Option value="watermelon">
            <img src="/watermelon.png" role="presentation" />
            Watermelon
          </Option>
        </Select>

        <h1>Native</h1>
        <select>
          <option>Apple</option>
          <option>Cherry</option>
          <option>Grape</option>
          <option>Lemon</option>
          <option>Orange</option>
          <option>Peach</option>
          <option>Pineapple</option>
          <option>Watermelon</option>
        </select>

      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
