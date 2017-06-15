import React from 'react';
import {HeaderUI} from 'components/header/Header';
import {createShallowContext} from 'tests/utils/Contexts';

describe('(Component) Header', () => {
  let _wrapper;
  let _mount = createShallowContext()

  beforeEach(() => {
    _wrapper = _mount(<HeaderUI />);
  });

  it('Renders a Navigation Bar', () => {
    const navbar = _wrapper.find('.navbar-header');
    expect(navbar).to.exist;
  });
});
