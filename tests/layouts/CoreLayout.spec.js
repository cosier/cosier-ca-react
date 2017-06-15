import TestUtils from 'react-addons-test-utils';
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import React from 'react';

/**
 * Shallow Render Helper
 * @param {object} component
 * @return {Element} React Element
 */
function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

/**
 * Shallow Render with Props
 *
 * @param {object} props
 * @return {object} Rendered html
 */
function shallowRenderWithProps(props = {}) {
  return shallowRender(<CoreLayout {...props} />);
}

describe('(Layout) Core', () => {
  let _component;
  let _props;
  let _child;

  beforeEach(() => {
    _child = <h1 className="child">Child</h1>;
    _props = {
      children: _child,
    };

    _component = shallowRenderWithProps(_props);
  });

  it('Should render as a <div>.', () => {
    expect(_component.type).to.equal('div');
  });
});
