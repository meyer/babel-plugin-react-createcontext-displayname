import { makeDisplayName } from './helpers';

export = (
  babel: typeof import('@babel/core')
): import('@babel/core').PluginObj<{}> => {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-react-createcontext-displayname',
    visitor: {
      CallExpression(path) {
        if (
          // TODO(meyer) add test for React.createContext
          !t.isIdentifier(path.node.callee) ||
          path.node.callee.name !== 'createContext' ||
          path.node.arguments.length > 1
        ) {
          return;
        }

        const parentNode = path.parentPath.node;

        if (
          !t.isVariableDeclarator(parentNode) ||
          !t.isIdentifier(parentNode.id)
        ) {
          return;
        }

        const componentName = parentNode.id.name;
        const nearestStatement = path.find(t.isStatement);
        nearestStatement.insertAfter(
          makeDisplayName(componentName, componentName)
        );
      },
    },
  };
};
