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
    const { selection } = this.state;
    return (
      <div className="outer">
        <div className="banner" role="banner">
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
        </div>
        <div className="container">
          <div className="main" role="main">
            <h2>Live Demo</h2>
            <form>
              <Select label="Test method" onChange={this.handleSelectChange} initialValue={selection} value={selection}>
                <Option value="apple">
                  <img src="apple.png" alt="" />
                  Apple
                </Option>
                <Option value="cherry">
                  <img src="cherry.png" alt="" />
                  Cherry
                </Option>
                <Option value="grape">
                  <img src="grape.png" alt="" />
                  Grape
                </Option>
                <Option value="lemon">
                  <img src="lemon.png" alt="" />
                  Lemon
                </Option>
                <Option value="orange">
                  <img src="orange.png" alt="" />
                  Orange
                </Option>
                <Option value="peach" disabled>
                  <img src="peach.png" alt="" />
                  Peach
                </Option>
                <Option value="pineapple">
                  <img src="pineapple.png" alt="" />
                  Pineapple
                </Option>
                <Option value="watermelon">
                  <img src="watermelon.png" alt="" />
                  Watermelon
                </Option>
              </Select>
            </form>
            <p aria-live="true">
              You selected: <em>{this.state.selection}</em>
            </p>
          </div>

          <div role="complementary" className="complementary">
            <h2>Code</h2>
            <pre className="language-html">
              {`
 <Select label="Test method">
   <Option value="apple">
     <img src="apple.png" alt="" />
      Apple
   </Option>
   <Option value="cherry">
     <img src="cherry.png" alt="" />
     Cherry
   </Option>
   <Option value="grape">
     <img src="grape.png" alt="" />
     Grape
   </Option>
   <Option value="lemon">
     <img src="lemon.png" alt="" />
     Lemon
   </Option>
   <Option value="orange">
     <img src="orange.png" alt="" />
     Orange
   </Option>
   <Option value="peach" disabled>
     <img src="peach.png" alt="" />
     Peach
   </Option>
   <Option value="pineapple">
     <img src="pineapple.png" alt="" />
     Pineapple
   </Option>
     <Option value="watermelon">
       <img src="watermelon.png" alt="" />
       Watermelon
     </Option>
 </Select>
        `}
            </pre>
          </div>
        </div>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
