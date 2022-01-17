/* eslint-disable complexity */

'use strict';

module.exports = function babelPluginReactNative({ types }, opts) {
  const replacementOS = opts.OS;

  return {
    name: 'plugin-react-native', // not required
    visitor: !replacementOS
      ? {}
      : {
          ImportDeclaration(path) {
            const node = path.node;
            if (node.source.value !== 'react-native') return;
            if (!node.specifiers) {
              throw path.buildCodeFrameError('Expecting named parameters');
            }

            node.specifiers = node.specifiers.filter((specifier) => {
              if (specifier.type === 'ImportDefaultSpecifier') {
                return true;
              }

              if (types.isImportSpecifier(specifier)) {
                if (specifier.imported.name === 'Platform') {
                  const referencePaths =
                    path.scope.bindings[specifier.local.name].referencePaths;

                  let canDelete = true;
                  referencePaths.forEach((ref) => {
                    if (
                      ref.parentPath &&
                      types.isMemberExpression(ref.parentPath.node)
                    ) {
                      const memberExpressionNode = ref.parentPath.node;
                      if (
                        types.isIdentifier(memberExpressionNode.object) &&
                        memberExpressionNode.object.name ===
                          specifier.local.name &&
                        types.isIdentifier(memberExpressionNode.property) &&
                        memberExpressionNode.property.name === 'OS'
                      ) {
                        ref.parentPath.replaceWith(
                          types.stringLiteral(replacementOS),
                        );
                        return; // can delete
                      }
                    }
                    canDelete = false;
                  });

                  return !canDelete;
                }
              }

              if (types.isImportNamespaceSpecifier(specifier)) {
                const referencePaths =
                  path.scope.bindings[specifier.local.name].referencePaths;
                let canDelete = true;
                referencePaths.forEach((ref) => {
                  if (
                    ref.parentPath &&
                    types.isMemberExpression(ref.parentPath.node) &&
                    types.isIdentifier(ref.parentPath.node.property) &&
                    ref.parentPath.node.property.name === 'Platform'
                  ) {
                    if (
                      ref.parentPath.parentPath &&
                      types.isMemberExpression(ref.parentPath.parentPath.node)
                    ) {
                      const memberExpressionNode =
                        ref.parentPath.parentPath.node;

                      if (
                        types.isIdentifier(memberExpressionNode.property) &&
                        memberExpressionNode.property.name === 'OS'
                      ) {
                        ref.parentPath.parentPath.replaceWith(
                          types.stringLiteral(replacementOS),
                        );
                        return; // can delete
                      }
                    }
                  }
                  canDelete = false;
                });

                return !canDelete;
              }

              return true;
            });

            if (node.specifiers.length === 0) {
              path.remove();
            }
          },
        },
  };
};
