# Principles of Spacing

When writing large React applications, it is common practice to reuse basic components.
For example, you might have a particular button component that you reuse in many places.
Howevever, when reusing components, a common issue is that the layout requirements
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

```javascript
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
to the DOM if <ChildComponent1/> does not "null" render. There
is no built-in solution for this.

The canonical solution is to duplicate the conditional that triggers
the "null" render in the parent component as well. Not only does
this break the core concept of encapsulation but it can be a common
source of bugs when working on a large project and team.

See the `withContainer` HoC for an alternative, cleaner solution.

# Utilities

The below utilities work on React 16+ (and likely lower versions,
though this has not yet been tested).

## withContainer

A HoC React component that provides graceful handling of "null" renders
when layout styling is required.

### Interface

`Component`: `React.Component` - The React component on which you'd like to identify "null" renders

`ifRender`: `undefined` | `(children: React.Element) => React.Element` - A render prop
that receives the rendered `Component` and run only when the `Component`
has a non-null render.

`ifNull`: `undefined` | () => `React.Element` - A render prop that only renders when the given
`Component` has a "null" render.

### Example Usage

```javascript
import React from 'react';
import {withContainer} from 'react-spacing';

import {ChildComponent1, ChildComponent2} from './components';

const ChildComponent1WithContainer = withSpacing({
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

# Examples

- Conditionally rendered components with redux: /examples/redux
