import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Select from './'
import Option from '../Option'
import * as keycode from '../keycodes'

describe('Select', () => {
  let component
  const onChangeSpy = expect.createSpy()

  context('that is empty', () => {
    beforeEach(() => {
      component = shallow(<Select label="Elvis" onChange={onChangeSpy} />)
    })
    afterEach(() => onChangeSpy.restore())

    it('renders the wrapper div element', () => {
      expect(component.find('.ReactA11ySelect').length).toEqual(1)
    })

    describe('button element', () => {
      let button
      beforeEach(() => button = component.find('.ReactA11ySelect__button'))
      it('renders a div with a button role', () => {
        expect(button.prop('role')).toEqual('button')
      })

      it('sets aria-haspopup to true', () => {
        expect(button.prop('aria-haspopup')).toEqual('true')
      })

      it('does not set an aria-expanded prop', () => {
        expect(button.prop('aria-expanded')).toBe(undefined)
      })
    })
  })

  context('that has options', () => {
    let inner
    beforeEach(() => {
      component = shallow(
        <Select label="Deceased Rock Stars" onChange={onChangeSpy}>
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
        inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        expect(component.find(Option).length).toEqual(4)
      })

      it('opens when it receives an enter key', () => {
        inner.simulate('keyDown', { keyCode: keycode.ENTER, preventDefault: () => {} })
        expect(component.find(Option).length).toEqual(4)
      })

      it('opens when it receives a space', () => {
        inner.simulate('keyDown', { keyCode: keycode.SPACE, preventDefault: () => {} })
        expect(component.find(Option).length).toEqual(4)
      })
    })

    describe('close', () => {
      context('with mouse', () => {
        beforeEach(() => inner.simulate('click'))

        it('closes when you click a second time', () => {
          inner.simulate('click')
          expect(component.find(Option).length).toEqual(0)
        })

        // TODO not sure how to test this?
        it('closes when you click outside the component')
      })

      context('with keyboard', () => {
        beforeEach(
          () => inner.simulate('keydown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        )
      })

      it('closes when you key ESC', () => {
        inner.simulate('keydown', { keyCode: keycode.ESC, preventDefault: () => {} })
        expect(component.find(Option).length).toEqual(0)
      })
    })

    describe('highlighting', () => {
      beforeEach(() => inner.simulate('click'))

      it('highlights on mouse hover', () => {
        // don't forget - you can't assign option to a variable and check it
        // because we clone the Option every time. :-o
        component.find(Option).first().simulate('mouseOver')
        expect(component.find(Option).first().prop('highlighted')).toEqual(true)
      })

      it('highlights on keyboard down', () => {
        inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        expect(component.find(Option).first().prop('highlighted')).toEqual(true)
      })

      it('stops moving down at the last option', () => {
        const numberOfOptions = component.find(Option).length
        for (let i = 0; i <= numberOfOptions; i++) {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        }
        expect(component.find(Option).last().prop('highlighted')).toEqual(true)
      })
    })

    describe('selecting', () => {
      context('with keyboard', () => {
        beforeEach(() => {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        })

        it('invokes the onChange callback', () => {
          inner.simulate('keyDown', { keyCode: keycode.ENTER, preventDefault: () => {} })
          expect(onChangeSpy).toHaveBeenCalledWith('jimi')
        })
      })

      context('with mouse', () => {
        beforeEach(() => {
          inner.simulate('click')
          component.find(Option).first().simulate('mouseOver')
        })

        it('invokes the onChange callback', () => {
          component.find(Option).first().simulate('click')
          expect(onChangeSpy).toHaveBeenCalledWith('elvis')
        })
      })
    })
  })
})
