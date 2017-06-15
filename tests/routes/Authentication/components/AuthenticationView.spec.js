import React from 'react';
import {createShallowContext} from 'tests/utils';
import {LoginForm} from 'src/components/forms/LoginForm';

describe('(View) Authentication Login', () => {
  let _shallow;
  let _wrapper;

  beforeEach(() => {
    _shallow = createShallowContext();
    _wrapper = _shallow(<LoginForm />);
  });

  it('Renders LoginView with Email input', () => {
    expect(_wrapper.find('#inputEmail')).to.exist;
  });

  it('Renders LoginView with Password input', () => {
    expect(_wrapper.find('#inputPassword')).to.exist;
  });
});
