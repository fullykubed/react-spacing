import React from 'react';

export function maybeNull({
  Component,
  ifRender,
  ifNull
}){
  if(typeof Component !== "function"){
    throw new Error('Component must be a React comoonent!');
  }
  const renderComponent = (result) =>
    result === null ? (ifNull ? ifNull() : null) : (ifRender ? ifRender(result) : null);
  if(Component.prototype && Component.prototype.render){
    return class extends Component {
      render() {
        return renderComponent(super.render())
      }
    }
  }else{
    return (props) => renderComponent(Component(props));
  }
}