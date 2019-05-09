import React from 'react';
import {maybeNull} from "./maybeNull";

export function withContainer(Component){
  return (props) => {
    const {className, style, ifNull, ...rest} = props;
    const SafeComponent = maybeNull({
      Component,
      ifNull,
      ifRender: (children) => (
        <div className={className} style={style}>
          {children}
        </div>
      )
    });
    return <SafeComponent {...rest}/>;
  }
}