import React from 'react';
import {mount} from 'enzyme';

import {withContainer} from "../withContainer";

const partialConfig = {
  ifRender: (children) => (
    <div id={"rendered"}>
      {children}
    </div>
  ),
  ifNull: () => (<div id="notRendered" />)
};

describe('withContainer', () => {

  describe('functional components', () => {

    function NullComponent() {
      return null;
    }

    function NonNullComponent() {
      return <div/>;
    }

    it('renders ifRender' , () => {
      const WC = withContainer({
        Component: NonNullComponent,
        ...partialConfig
      });
      expect(mount(<WC testProp={"jack"}/>)).toMatchSnapshot();
    });

    it('renders ifNull' , () => {
      const WC = withContainer({
        Component: NullComponent,
        ...partialConfig
      });
      expect(mount(<WC/>)).toMatchSnapshot();
    });

    it('renders nothing' , () => {
      const WC = withContainer({
        Component: NonNullComponent,
      });
      expect(mount(<WC/>)).toMatchSnapshot();
    });

    it('renders nothing 2' , () => {
      const WC = withContainer({
        Component: NullComponent,
      });
      expect(mount(<WC/>)).toMatchSnapshot();
    });

  });

  describe('class components', () => {

    class NullComponent extends React.Component {
      render(){
        return null;
      }
    }

    class NonNullComponent extends React.Component {
      render(){
        return <div/>;
      }
    }

    it('renders ifRender' , () => {
      const WC = withContainer({
        Component: NonNullComponent,
        ...partialConfig
      });
      expect(mount(<WC testProp={"jack"}/>)).toMatchSnapshot();
    });

    it('renders ifNull' , () => {
      const WC = withContainer({
        Component: NullComponent,
        ...partialConfig
      });
      expect(mount(<WC/>)).toMatchSnapshot();
    });

    it('renders nothing' , () => {
      const WC = withContainer({
        Component: NonNullComponent,
      });
      expect(mount(<WC/>)).toMatchSnapshot();
    });

    it('renders nothing 2' , () => {
      const WC = withContainer({
        Component: NullComponent,
      });
      expect(mount(<WC/>)).toMatchSnapshot();
    });

  });


});