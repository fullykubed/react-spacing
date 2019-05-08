# Explanation

In `ButtonBase.jsx` we have the presentational logic for a button component we want to use in our application.
It follows the spacing principles defined at the repo root and only renders when provided a `text` prop.

In `ConnectedButton.jsx` we have a connected component that injects the redux store's `buttonText` value
into the `ButtonBase` component.

In `Page.jsx`, we pull everything together in a quick demo. We have some ancillary text that we only want
to render when `ConnectedButton` (and thus `ButtonBase`) renders. Additionally, here is where we specify
that the width of the button should be `200px`.
