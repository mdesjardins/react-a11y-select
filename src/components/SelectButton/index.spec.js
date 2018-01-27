import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import SelectButton from './'

describe('SelectButton', () => {
  let component
  context('when closed', () => {
    beforeEach(() => {
      component = shallow(<SelectButton label="Elvis" open={false} />)
    })

    it('renders a div with a button role', () => {
      expect(component.prop('role')).toEqual('button')
    })

    it('sets aria-haspopup to true', () => {
      expect(component.prop('aria-haspopup')).toEqual('true')
    })

    it('does not set an aria-expanded prop', () => {
      expect(component.prop('aria-expanded')).toBe(undefined)
    })

    it('sets tabindex to 0', () => {
      expect(component.prop('tabIndex')).toBe('0')
    })
  })

  context('when open', () => {
    beforeEach(() => {
      component = shallow(<SelectButton label="Elvis" open={true} />)
    })

    it('does sets an aria-expanded prop', () => {
      expect(component.prop('aria-expanded')).toBe(true)
    })

    it('sets tabindex to -1', () => {
      expect(component.prop('tabIndex')).toBe('-1')
    })
  })
})
