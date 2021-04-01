import React from 'react';

const Button = props => <button {...props}>Hello</button>;

const withRedBorder = Component => props => (
  <Component {...props} style={{ border: '1px solid red' }} />
);

export const RedButton = withRedBorder(Button);

//withRedBorder HOC took a component Button and returned RedButton
