# Principles of Spacing

When writing large React applications, it is common practice to reuse basic components.
For example, you might have a particular button component that you reuse in many places.
However, when reusing components, a common issue is that the layout requirements
differ depending on where you render (or don't render) the component. The following principles
are a set of best practices you should follow to create modular and reusable components:

- the top-level DOM element of a component should NOT contain the following css properties:

	- `margin`
	- `order`
	- `flex-grow`
	- `flex-shrink`
	- `flex-basis`
	- `flex`
	- `align-self`
	
- the top-level DOM element of a component should have the following css properties (either explictly or by default):

	- `width: 100%`
	- `heigh: 100%`
	
Notice that these properties primarily control layout and spacing. Since a component should be agnostic
to where it is used, it should not assume any layout or spacing requirements and defer responsibility of
those settings to its container component.

# Implications and Complications

## Null Renders

A "null" render is when a React component's render function returns
`null` and is thus not added to the DOM. The possibility of a "null"
render complicates the layout management of the container components
as there is no straightforward way to identify a "null" render of
a subcomponent from a parent component's render function.

Consider this example:

```jsx
import React from 'react';

import {ChildComponent1, ChildComponent2} from './components';

export function ParentComponent() {
    return (
        <>
            <div style={{marginRight: "20px"}}>
                <ChildComponent1/>
            </div>
            <ChildComponent2/>
        </>
    );
}
```

Suppose we want the div that provides the margin to only attach
to the DOM if `ChildComponent1` does not "null" render. There
is no built-in solution for this.

The canonical solution is to duplicate the conditional that triggers
the "null" render in the parent component as well. Not only does
this break the core concept of encapsulation but it can be a common
source of bugs when working on a large project and team.

See the `maybeNull` or `withContainer` HoCs for an alternative, cleaner solution.

# Utilities

The below utilities work on React 16+ (and likely lower versions,
though this has not yet been tested). They have been transpiled
to work with the latest two browsers (at this time this means the library
is ES2015 compatible).

Installation:

`npm i react-spacing`


## maybeNull

A HoC React component that provides graceful handling of "null" renders
when layout styling is required.

### Interface

`maybeNull` is a function that takes a configuration object with
the following keys:

`Component`: `React.Component` - The React component on which you'd like to identify "null" renders

`ifRender`: `(children: React.Element) => React.Element` - [Optional] A render prop
that receives the rendered `Component` and run only when the `Component`
has a non-null render.

`ifNull`: `() => `React.Element` - [Optional] A render prop that only renders when the given
`Component` has a "null" render.

### Example Usage

```jsx
import React from 'react';
import {maybeNull} from 'react-spacing';

import {ChildComponent1, ChildComponent2} from './components';

const ChildComponent1WithContainer = maybeNull({
    Component: ChildComponent1,
    ifRender: (children) => (
       <div style={{marginRight: "20px"}}>
          {children}
       </div>
    )
})

export function ParentComponent() {
    return (
        <>
            <ChildComponent1WithContainer/>
            <ChildComponent2/>
        </>
    );
}
```

Note that since the layout is the responsibility of the `ParentComponent`,
it is best to create `ChildComponent1WithContainer` in the `ParentComponent`
file rather than in a separate file or the `ChildComponent1` file.

## withContainer

A HoC that wraps the input component in a styled `div` ONLY if the
component renders. Utilizes `maybeNull` under the hood, but has a
terser syntax and is ideal to apply directly in the input component
file.

### Interface

`withContainer` is a function that takes the original component
as its only argument. It adds additional props to that component
(see below).

### Additional Props

`className`: `string` - [Optional] The `className` to set on the wrapping `div`.

`style`: `{[key: string]: string}` - [Optional] The `style` object to set on
the wrapping `div`.

`ifNull`: `() => React.Element` - [Optional] What to render if the original
component has a "null" render.

### Example Usage

#### Child Component
```jsx
import React from 'react';

import {withContainer} from 'react-spacing';

function ChildComponent({requiredProp}){

    if(requiredProp === undefined) return null;

    return <p>I received {`${requiredProp}`}!</p>
}

export default withContainer(ChildComponent);
```

#### Parent Component
```jsx
import React from 'react';

import ChildComponent from './ChildComponent';

export function ParentComponent(){
    const componentStyle = {marginBotton: "20px"};
    return (
        <>
            <ChildComponent style={componentStyle}/>
            <p> No component ^ </p>
            <hr/>
            <ChildComponent style={componentStyle} requiredProp="Foobar"/>
            <p> Rendered component ^ </p>
        </>
    )
}
```

Unlike `maybeNull`, the `withContainer` is best
used within the child component file because it *extends* the interface
for the child component if some additional props rather than replacing it completely.

Note: If using `withContainer`, the added props are now reserved prop
names and should not be used within the child component.
