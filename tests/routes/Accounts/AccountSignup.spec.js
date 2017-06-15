import {SignupForm, Fields as SignupFields} from 'components/forms/SignupForm';

import React from 'react';

import {TestProvider, createMountContext} from 'tests/utils';

describe('(View) Account Signup', () => {
  const _mount = createMountContext();
  const _func = () => { };

  let _wrapper;
  let _props;

  beforeEach(() => {
    _props = {
      errors: {},
      fields: SignupFields,
      onSubmit: chai.spy(_func),
      createError: chai.spy(_func),
      removeError: chai.spy(_func),
    };

    _wrapper = _mount(
      <TestProvider>
        <SignupForm {..._props} />
      </TestProvider>
    );
  });

  it('Invalid Form submission dispatches signupErrors Action', () => {
    _wrapper.find('form').simulate('submit');
    expect(_props.createError).to.have.been.called.at.least(1);
    expect(_props.onSubmit).to.not.have.been.called.at.most(0);
  });

  it('Valid Form submission dispatches newSignupUser Action', () => {
    _wrapper.find('form').simulate('submit');
    expect(_props.onSubmit).to.have.been.called.at.least(1);
    expect(_props.createError).to.not.have.been.called.at.most(0);
  });

  it('Renders Processing Screen during Signup', () => {
    _props.isProcessingSignup = true;
    _wrapper = _mount(<SignupForm {..._props} />);
    expect(_wrapper.find('#input_full_name')).to.not.exist;
    expect(_wrapper.find('.creating-new-account')).to.exist;
  });

  it('Renders Full Name Field', () => {
    expect(_wrapper.find('#input_full_name')).to.exist;
  });

  it('Renders Email Field', () => {
    expect(_wrapper.find('#input_email')).to.exist;
  });

  it('Renders Password Fields', () => {
    expect(_wrapper.find('#input_password')).to.exist;
    expect(_wrapper.find('#input_password_confirm')).to.exist;
  });

  it('Renders Agreement Checkbox', () => {
    expect(_wrapper.find('#accept_agreements')).to.exist;
  });
});
