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


# Examples

- Conditionally rendered components with redux: /examples/redux
