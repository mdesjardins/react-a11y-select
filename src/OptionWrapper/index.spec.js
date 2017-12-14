import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import OptionWrapper from '../OptionWrapper'
import Option from '../Option'

describe('OptionWrapper', () => {
  let component
  let props = { }
  const onMouseOverSpy = expect.createSpy()
  const onClickSpy = expect.createSpy()

  beforeEach(() => {
    component = shallow(
      <OptionWrapper
        onMouseOver={onMouseOverSpy}
        onClick={onClickSpy}
        {...props}
      >
        <Option />
      </OptionWrapper>
    )
  })
  afterEach(() => {
    onMouseOverSpy.restore()
    onClickSpy.restore()
  })

  describe('callbacks', () => {
    it('should invoke the onMouseOver method when hovered over', () => {
      component.simulate('mouseOver')
      expect(onMouseOverSpy).toHaveBeenCalled()
    })

    it('should invoke the onClick method when clicked', () => {
      component.find('li').simulate('click')
      expect(onClickSpy).toHaveBeenCalled()
    })
  })

  describe('highlighting', () => {
    beforeEach(() => {
      props = { ...props, highlightedKey: '123', optionKey: '123' }
    })

    it('should apply the highlighting class to the li', () => {
      expect((component).find('li').hasClass('ReactA11ySelect__ul__li--highlighted')).toEqual(true)
    })
  })
})
