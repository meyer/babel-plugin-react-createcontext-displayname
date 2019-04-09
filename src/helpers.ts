import { types as t } from '@babel/core';

export const makeDevIfStatement = (body: t.Statement[] = []): t.IfStatement =>
  t.ifStatement(
    // process.env.NODE_ENV === 'development'
    t.binaryExpression(
      '===',
      t.memberExpression(
        t.memberExpression(t.identifier('process'), t.identifier('env')),
        t.identifier('NODE_ENV')
      ),
      t.stringLiteral('development')
    ),
    t.blockStatement(body)
  );

export const makeDisplayName = (
  componentName: string,
  displayName: string
): t.IfStatement =>
  makeDevIfStatement([
    t.expressionStatement(
      // componentName.displayName = 'displayName'
      t.assignmentExpression(
        '=',
        t.memberExpression(
          t.identifier(componentName),
          t.identifier('displayName')
        ),
        t.stringLiteral(displayName)
      )
    ),
  ]);
