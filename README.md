# react-a11y-select

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A customizable select/dropdown component with a focus on accessibility (a11y).

## Live Demo
http://mikedesjardins.net/react-a11y-select/

## Installation
### via npm
```
npm install react-a11y-select
```

## Usage
Here is a very simple example for how to use the component:

    import { Select, Option } from 'react-a11y-select'
    import 'react-a11y-select/styles.css'
    ...

    <Select>
      <Option value="apple">
        <img src="apple.png" role="presentation" />
        Apple
      </Option>
      <Option value="cherry">
         <img src="cherry.png" role="presentation" />
         Cherry
      </Option>
    </Select>


This will render an unordered list styled as a dropdown/select box. Importantly, it will have all of the correct ARIA and role attributes to make it usable by screen readers, and it will respond as expected to keyboard input.

## Props
The following properties are on the `<Select>` component:

* `label` - the ARIA label attribute for the component. Briefly describes the form field for screen readers. Either `label` or `labelledBy` are required.
* `labelledBy` - the ARIA labelledBy attribute for the compoent. Set to the ID of a `<label>` DOM element which briefly describes the form field to screen readers.
* `placeholderText` - what appears in the dropdown before a value is selected. Defaults to "Please choose..."
* `indicator` - Unicode character that is used for the arrow indicator in the component. Defaults to `&#x25be` which is rendered as &#x25be;

## This is very much a work-in-progress
This hasn't been released onto NPM yet as there's still a lot more to do. It needs more tests, more features, more everything. Even when it's finished, it will probably be most valuable as a "demonstration" component to serve as inspiration for your own work. The props and API are subject to change. Here's a list of my TODOs:

* More tests (there basically aren't any right now)
* Use Flow for typechecking
* The double-use of `React.cloneElement` is not the most performant thing in the world, would like to fix that. :)
* Need to convert the CSS to use BEM or something similar - I'm used to PostCSS modules but that seems like a bad choice for a component library like this one. Would like to try using CSS variables here, too.
* There's still some styling work that needs to be done - e.g., the popup isn't always located in the right spot.
* An `<OptGroup>` element would be nice.
* Need to record a screencast of the screen reader in action.
* Make the down-arrow-thing customizable.
* A CI server would be nice once there are actually some tests in place.

## Was this project not quite what you were hoping for?
Check out David Clark's awesome aria menubutton project: https://github.com/davidtheclark/react-aria-menubutton
It's another implementation of a React dropdown component where web accessibility is a primary goal.

## License
MIT

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo