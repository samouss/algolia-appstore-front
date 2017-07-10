export const getDisplayName = (component, name) => {
  const componentName = component.displayName
    || component.name
    || 'Component';

  return `${name}(${componentName})`;
};
