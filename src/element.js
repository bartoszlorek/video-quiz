export function createElement(tagName, props) {
  const elem =
    tagName === 'fragment'
      ? document.createDocumentFragment()
      : document.createElement(tagName);

  const propKeys = Object.keys(props);

  for (let i = 0; i < propKeys.length; i++) {
    const key = propKeys[i];
    const value = props[key];

    if (key === 'children') {
      for (let j = 0; j < value.length; j++) {
        elem.appendChild(value[j]);
      }
    } else {
      elem[key] = value;
    }
  }

  return elem;
}

export function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
