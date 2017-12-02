import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Select from './'
import Option from '../Option'
import * as keycode from '../keycodes'

describe('Select', () => {
  let component

  context('that is empty', () => {
    beforeEach(() => {
      component = shallow(<Select label="Elvis" />)
    })

    it('renders the wrapper div element', () => {
      expect(component.find('.ReactA11ySelect').length).toEqual(1)
    })

    it('renders a button element', () => {
      expect(component.find('span').prop('role')).toEqual('button')
    })
  })

  context('that has options', () => {
    let inner
    beforeEach(() => {
      component = shallow(
        <Select label="Deceased Rock Stars">
          <Option value="elvis">Elvis Presley</Option>
          <Option value="jimi">Jimi Hendrix</Option>
          <Option value="john">John Lennon</Option>
          <Option value="kurt">Kurt Cobain</Option>
        </Select>
      )

      // Enzyme events to propagate the same way that browser events
      // do. For that reason, we need to simulate our events on the
      // div inside the wrapper div. :-/
      // See the "Gotchas":
      // https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/simulate.md
      inner = component.find('.ReactA11ySelect__button')
    })

    describe('open', () => {
      it('opens when it receives a click', () => {
        inner.simulate('click')
        expect(component.find(Option).length).toEqual(4)
      })

      it('opens when it receives a down arrow', () => {
        inner.simulate('keyDown', { keyCode: keycode.DOWN })
        expect(component.find(Option).length).toEqual(4)
      })
    })

    describe('close', () => {
    })

    describe('highlighting', () => {
      beforeEach(() => inner.simulate('click') )

      it('highlights on mouse hover', () => {
        // don't forget - you can't assign option to a variable and check it
        // because we clone the Option every time. :-o
        component.find(Option).first().simulate('mouseOver')
        expect(component.find(Option).first().prop('highlighted')).toEqual(true)
      })

      it('highlights on keyboard down', () => {
        inner.simulate('keyDown', { keyCode: keycode.DOWN })
        expect(component.find(Option).first().prop('highlighted')).toEqual(true)
      })

      it('stops moving down at the last option', () => {
        const numberOfOptions = component.find(Option).length
        for (let i = 0; i <= numberOfOptions; i++) {
          inner.simulate('keyDown', { keyCode: keycode.DOWN })
        }
        expect(component.find(Option).last().prop('highlighted')).toEqual(true)
      })
    })

    describe('selecting', () => {
    })
  })
})
