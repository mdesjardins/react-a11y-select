import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Select from './'

describe('Select', () => {
  let component

  beforeEach(() => {
    component = shallow(<Select />)
  })

  it('renders the wrapper div element', () => {
    expect(component.find('.ReactA11ySelect').length).toEqual(1)
  })
})
