import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import * as React from 'react';
import * as enzyme from 'enzyme';

import {DynaFieldWrapper} from '../../src';

describe('Home', () => {
  let wrapper;

  it('has expected content with deep render', () => {
    wrapper = enzyme.shallow(
      (
        <DynaFieldWrapper className="my-custom-class-name">
          <input className="input-control" style={{width: "100%"}} value="John" onChange={(e) => console.log('changed', e.target.value)}/>
        </DynaFieldWrapper>
      ),
      {}
    );

    expect(wrapper).toMatchSnapshot();
  });
});
