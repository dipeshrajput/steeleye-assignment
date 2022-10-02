### SteelEye Assigment

### Explan what the simple `List` component does.

List component is a memoized component of WrappedListComponent which is a React functional component.
Now List component accepts the props `array of objects which has the property text(required)` and prop-types package is used to check at runtime whether the component receives the exact type of props.

Now List component actually renders the list of items with another component named SingleListItem (memoized component of WrappedSingleListItem). SingleListItem actually receives multiple props which includes text property of items and it shows that inside <li></li>
It also has a onClickHandler function which is triggered when the mouse pressed over the text.

#### What problems / warnings are there with code?

##### List of Errors:

###### error 1. PropType.shapeOf property doesn’t exist

###### error 2.TypeError: setSelectedIndex is not a function

##### List of Warnings:

From the inspect console, checked all the warnings:

##### 1. Warning: Each child in a list should have a unique "key" prop.

Check the render method of `WrappedListComponent

##### 2. Warning: Cannot update a component (`WrappedListComponent`) while rendering a different component (`WrappedSingleListItem`). To locate the bad setState() call inside `WrappedSingleListItem`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render

##### 3. Warning: Failed prop type: Invalid prop `isSelected` of type `number` supplied to `WrappedSingleListItem`, expected `boolean`.

---

##### Please fix, optimize, and/or modify the component as much as you think is necessary.

### solving error 1.

turns out propTypes.shapeOf property doesn't exist, instead used propTypes.shape().
https://github.com/facebook/prop-types
Also after modifying, another error error popped up which goes something
error - Invariant Violation: Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Rea
d more at http://fb.me/use-check-prop-types
using arrayOf() instead of array()

### solving error 2.

_What does useState return? It returns a pair of values: the current state and a function that updates it_
https://reactjs.org/docs/components-and-props.html
setSelectedIndex is supposed to be a function which changes the value of selectedIndex.
changing the selectedIndex and setSelectedIndex and swapping them solves the problem.

### solving warning 1.

solving this by passing index to key props of the SingleListItem.
why are keys needed ?
Simply put, they are props that are passed in child elements of a list in order to:
Identify which elements are added, updated and removed.
Also React has a diffing algorithm. https://reactjs.org/docs/reconciliation.html

### solving warning 2.

onClickHandler(index) inside the component called every time when the component is rendered. So it's actually bad code.
Fixed it by wrapping it in a arrow function.

### Solving warning 3.

isSelected prop expects a boolean and the original code is passing number to it. So solved by giving a conditional to check whether the Item index is selected or not.

#### Possible Optimizing

The index props serves no purpose for the SingleListItem. so it is removed.
Also no need to pass index to the onClickHandler so it's omitted.
All the possible optimization is shown in the code and also I would prefer using typescript. since typescript provides type-safety in compile time which is bonus on top of using prop-types. Plus prop-types can be generated from typescript interfaces and types.

Optimized code with typescript is given in the repo.

Typescript and PropTypes serve different purposes. Typescript validates types at compile time, whereas PropTypes are checked at runtime.

https://stackoverflow.com/questions/41746028/proptypes-in-a-typescript-react-application

Reference:
https://github.com/facebook/prop-types
official react docs
stackoverflow
