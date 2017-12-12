import React, { Component } from 'react'
import { render } from 'react-dom'

import { Select, Option } from '../../src'

import '../../src/styles.css'

class Demo extends Component {
  constructor() {
    super()
    this.state = {
      selection: '',
    }
  }

  handleSelectChange = (selection) => {
    this.setState({ selection })
  }

  render() {
    return (
      <div className="outer">
        <banner>
          <h1>react-a11y-select component</h1>
          <p>
            This is a live demo of the react-a11y-select component, which was
            designed to be accessible to screenreaders and respond to keyboard
            controls as a native component will.
          </p>
          <p>
            See source at <a href="https://www.github.com/mdesjardins/react-a11y-select">
              https://www.github.com/mdesjardins/react-a11y-select</a>.
          </p>
        </banner>
        <div className="container">
          <main>
            <h2>Live Demo</h2>
            <Select label="Test method" onChange={this.handleSelectChange}>
              <Option value="apple">
                <img src="apple.png" role="presentation" />
                Apple
              </Option>
              <Option value="cherry">
                <img src="cherry.png" role="presentation" />
                Cherry
              </Option>
              <Option value="grape">
                <img src="grape.png" role="presentation" />
                Grape
              </Option>
              <Option value="lemon">
                <img src="lemon.png" role="presentation" />
                Lemon
              </Option>
              <Option value="orange">
                <img src="orange.png" role="presentation" />
                Orange
              </Option>
              <Option value="peach">
                <img src="peach.png" role="presentation" />
                Peach
              </Option>
              <Option value="pineapple">
                <img src="pineapple.png" role="presentation" />
                Pineapple
              </Option>
              <Option value="watermelon">
                <img src="watermelon.png" role="presentation" />
                Watermelon
              </Option>
            </Select>
            <p>
              You selected: <em>{this.state.selection}</em>
            </p>
          </main>

          <complementary>
            <h2>Code</h2>
            <pre className="language-html">
            {`
 <Select label="Test method">
   <Option value="apple">
     <img src="apple.png" role="presentation" />
      Apple
   </Option>
   <Option value="cherry">
     <img src="cherry.png" role="presentation" />
     Cherry
   </Option>
   <Option value="grape">
     <img src="grape.png" role="presentation" />
     Grape
   </Option>
   <Option value="lemon">
     <img src="lemon.png" role="presentation" />
     Lemon
   </Option>
   <Option value="orange">
     <img src="orange.png" role="presentation" />
     Orange
   </Option>
   <Option value="peach">
     <img src="peach.png" role="presentation" />
     Peach
   </Option>
   <Option value="pineapple">
     <img src="pineapple.png" role="presentation" />
     Pineapple
   </Option>
     <Option value="watermelon">
       <img src="watermelon.png" role="presentation" />
       Watermelon
     </Option>
 </Select>
        `}
            </pre>
          </complementary>
        </div>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
