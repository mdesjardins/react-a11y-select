import expect from 'expect'
import React from 'react'
import { mount, shallow } from 'enzyme'
import Select from './'
import Option from '../Option'
import OptionWrapper from '../OptionWrapper'
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
  })

  context('that has options', () => {
    let inner
    beforeEach(() => {
      component = mount(
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
        expect(component.find('ul').prop('aria-hidden')).toEqual(undefined)
      })

      it('opens when it receives a down arrow', () => {
        inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        expect(component.find('ul').prop('aria-hidden')).toEqual(undefined)
      })

      it('opens when it receives an enter key', () => {
        inner.simulate('keyDown', { keyCode: keycode.ENTER, preventDefault: () => {} })
        expect(component.find('ul').prop('aria-hidden')).toEqual(undefined)
      })

      it('opens when it receives a space', () => {
        inner.simulate('keyDown', { keyCode: keycode.SPACE, preventDefault: () => {} })
        expect(component.find('ul').prop('aria-hidden')).toEqual(undefined)
      })
    })

    describe('close', () => {
      context('with mouse', () => {
        beforeEach(() => inner.simulate('click'))

        it('closes when you click a second time', () => {
          inner.simulate('click')
          expect(component.find('ul').prop('aria-hidden')).toEqual(true)
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
        expect(component.find('ul').prop('aria-hidden')).toEqual(true)
      })
    })

    describe('highlighting', () => {
      beforeEach(() => inner.simulate('click'))

      it('highlights on mouse hover', () => {
        // don't forget - you can't assign option to a variable and check it
        // because we clone the Option every time. :-o
        component.find(OptionWrapper).first().simulate('mouseOver')
        const firstLi = component.find('li').first()
        expect(firstLi.prop('tabIndex')).toEqual('0')
      })

      it('highlights on keyboard down', () => {
        inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        const firstLi = component.find('li').first()
        expect(firstLi.prop('tabIndex')).toEqual('0')
      })

      it('stops moving down at the last option', () => {
        const numberOfOptions = component.find(Option).length
        for (let i = 0; i <= numberOfOptions; i++) {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
        }
        const lastLi = component.find('li').last()
        expect(lastLi.prop('tabIndex')).toEqual('0')
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

    describe('disabled options', () => {
      // We do special cases for first/last because of the danger of blowing our stack
      // from recursive calls to nextKey/previousKey
      context('when the first option is disabled', () => {
        beforeEach(() => {
          component = mount(
            <Select label="Deceased Rock Stars" onChange={onChangeSpy}>
              <Option value="elvis" disabled>Elvis Presley</Option>
              <Option value="jimi">Jimi Hendrix</Option>
              <Option value="john">John Lennon</Option>
              <Option value="kurt">Kurt Cobain</Option>
            </Select>
          )
          inner = component.find('.ReactA11ySelect__button')
          inner.simulate('keyDown', { keyCode: keycode.ENTER, preventDefault: () => {} })
        })

        it('skips over the when keying down first option', () => {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          const first = component.find(OptionWrapper).first()
          const second = component.find(OptionWrapper).at(1)
          expect(first.find('li').prop('disabled')).toEqual(true)
          expect(second.find('li').prop('tabIndex')).toEqual('0')
        })

        it('does nothing if keying up into the first option', () => {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          inner.simulate('keyDown', { keyCode: keycode.UP, preventDefault: () => {} })
          const first = component.find(OptionWrapper).first()
          const second = component.find(OptionWrapper).at(1)
          expect(first.find('li').prop('disabled')).toEqual(true)
          expect(second.find('li').prop('tabIndex')).toEqual('0')
        })
      })

      context('when the last option is disabled', () => {
        beforeEach(() => {
          component = mount(
            <Select label="Deceased Rock Stars" onChange={onChangeSpy}>
              <Option value="elvis">Elvis Presley</Option>
              <Option value="jimi">Jimi Hendrix</Option>
              <Option value="john">John Lennon</Option>
              <Option value="kurt" disabled>Kurt Cobain</Option>
            </Select>
          )
          inner = component.find('.ReactA11ySelect__button')
          inner.simulate('keyDown', { keyCode: keycode.ENTER, preventDefault: () => {} })
        })

        it('does not key down into the last option', () => {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          const penultimate = component.find(OptionWrapper).at(2)
          const last = component.find(OptionWrapper).last()
          expect(penultimate.find('li').prop('tabIndex')).toEqual('0')
          expect(last.find('li').prop('disabled')).toEqual(true)
        })
      })

      context('when a middle option is disabled', () => {
        beforeEach(() => {
          component = mount(
            <Select label="Deceased Rock Stars" onChange={onChangeSpy}>
              <Option value="elvis">Elvis Presley</Option>
              <Option value="jimi" disabled>Jimi Hendrix</Option>
              <Option value="john">John Lennon</Option>
              <Option value="kurt">Kurt Cobain</Option>
            </Select>
          )
          inner = component.find('.ReactA11ySelect__button')
          inner.simulate('keyDown', { keyCode: keycode.ENTER, preventDefault: () => {} })
        })

        it('skips over the when keying down first option', () => {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          const jimi = component.find(OptionWrapper).at(1)
          const john = component.find(OptionWrapper).at(2)
          expect(jimi.find('li').prop('disabled')).toEqual(true)
          expect(john.find('li').prop('tabIndex')).toEqual('0')
        })

        it('does nothing if keying up into the first option', () => {
          inner.simulate('keyDown', { keyCode: keycode.DOWN, preventDefault: () => {} })
          inner.simulate('keyDown', { keyCode: keycode.UP, preventDefault: () => {} })
          inner.simulate('keyUp', { keyCode: keycode.UP, preventDefault: () => {} })
          const elvis = component.find(OptionWrapper).first()
          expect(elvis.find('li').prop('tabIndex')).toEqual('0')
        })

        it('does not highlight a disabled option if it mouses over it', () => {
          component.find(OptionWrapper).at(1).simulate('mouseOver')
          const firstLi = component.find('li').first()
          expect(firstLi.hasClass('ReactA11ySelect__ul__li--highlighted')).toEqual(false)
        })
      })
    })
  })
})
