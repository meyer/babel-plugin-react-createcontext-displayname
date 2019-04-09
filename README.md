# babel-plugin-react-createcontext-displayname
A simple babel plugin that adds `displayName` values to `createContext` calls.

In:

```typescript
const MyContext = createContext();
```

Out:

```typescript
const MyContext = createContext();
if (process.env.NODE_ENV === 'development') {
  MyContext.displayName = 'MyContext';
}
```
