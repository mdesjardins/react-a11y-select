import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import Select from '../components/Select'
import Option from '../components/Option'

import { OptionCollection } from './optionCollection'

describe('optionCollection', () => {
  let optionCollection

  beforeEach(() => {
    const component = mount(
      <Select label="Dead Rock Stars">
        <Option key="1" value="jimi">Jimi Hendrix</Option>
        <Option disabled key="2" value="elvis">Elvis Presley</Option>
        <Option key="3" value="freddie">Freddie Mercury</Option>
        <Option key="4" value="amy">Amy Winehouse</Option>
      </Select>
    )
    const options = component.props().children
    optionCollection = new OptionCollection(options)
  })

  describe('#allOptions', () => {
    it('returns four options', () => {
      expect(optionCollection.allOptions().length).toEqual(4)
    })
  })

  describe('#getNextEnabledKey', () => {
    context('when the current key is not before a disabled key', () => {
      it('selects the following key', () => {
        expect(optionCollection.getNextEnabledKey('3')).toEqual('4')
      })
    })
    context('when the current key is before a disabled key', () => {
      it('skips over the disabled key', () => {
        expect(optionCollection.getNextEnabledKey('1')).toEqual('3')
      })
    })
    context('when the current key is the last key', () => {
      it('returns the current key', () => {
        expect(optionCollection.getNextEnabledKey('4')).toEqual('4')
      })
    })
  })

  describe('#getPreviousEnabledKey', () => {
    context('when the current key is not after a disabled key', () => {
      it('selects the following key', () => {
        expect(optionCollection.getPreviousEnabledKey('4')).toEqual('3')
      })
    })
    context('when the current key is after a disabled key', () => {
      it('skips over the disabled key', () => {
        expect(optionCollection.getPreviousEnabledKey('3')).toEqual('1')
      })
    })
    context('when the current key is the first key', () => {
      it('returns the current key', () => {
        expect(optionCollection.getPreviousEnabledKey('1')).toEqual('1')
      })
    })
  })

  describe('#findOptionByKey', () => {
    context('when the key exists', () => {
      it('returns the option', () => {
        expect(optionCollection.findOptionByKey('1').props.value).toEqual('jimi')
      })
    })
    context('when the key does not exist', () => {
      it('returns undefined', () => {
        expect(optionCollection.findOptionByKey('-1') === undefined).toBe(true)
      })
    })
  })

  describe('#findOptionByValue', () => {
    context('when the value exists', () => {
      it('returns the option', () => {
        expect(optionCollection.findOptionByValue('jimi').key).toEqual('1')
      })
    })
    context('when the key does not exist', () => {
      it('returns undefined', () => {
        expect(optionCollection.findOptionByKey('chester') === undefined).toBe(true)
      })
    })
  })
})
