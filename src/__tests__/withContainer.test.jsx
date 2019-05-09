import React from 'react';
import {mount} from 'enzyme';

import {withContainer} from "../withContainer";

const TestComponent = withContainer(({requiredProp}) => {

  if(requiredProp === undefined) return null;

  return <p>I received {`${requiredProp}`}!</p>
});

function NullRender(){
  return <p>TestComponent was null!</p>
}

describe('withContainer', () => {

  it('doesnt add div on null render', () => {
    expect(mount(<TestComponent className={"blah"}/>)).toMatchSnapshot();
  });

  it('adds div', () => {
    expect(mount(<TestComponent className={"blah"} requiredProp={"Jack"}/>))
      .toMatchSnapshot();
  });

  it('executes alternative on null render', () => {
    expect(mount(<TestComponent ifNull={NullRender}/>)).toMatchSnapshot();
  });
});