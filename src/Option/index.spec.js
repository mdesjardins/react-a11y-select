import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Option from '../Option'

describe('Option', () => {
  let component
  beforeEach(() => {
    component = shallow(<Option><span>Elvis!</span></Option>)
  })

  it('should render the inner contents', () => {
    expect(component.find('span').length).toEqual(1)
    expect(component.find('span').text()).toMatch(/Elvis/)
  })
})
