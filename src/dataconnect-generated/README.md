# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetSkills*](#getskills)
- [**Mutations**](#mutations)
  - [*CreateSkill*](#createskill)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetSkills
You can execute the `GetSkills` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getSkills(vars?: GetSkillsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillsData, GetSkillsVariables>;

interface GetSkillsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetSkillsVariables): QueryRef<GetSkillsData, GetSkillsVariables>;
}
export const getSkillsRef: GetSkillsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSkills(dc: DataConnect, vars?: GetSkillsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillsData, GetSkillsVariables>;

interface GetSkillsRef {
  ...
  (dc: DataConnect, vars?: GetSkillsVariables): QueryRef<GetSkillsData, GetSkillsVariables>;
}
export const getSkillsRef: GetSkillsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSkillsRef:
```typescript
const name = getSkillsRef.operationName;
console.log(name);
```

### Variables
The `GetSkills` query has an optional argument of type `GetSkillsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSkillsVariables {
  searchTerm?: string | null;
  limit?: number | null;
  offset?: number | null;
}
```
### Return Type
Recall that executing the `GetSkills` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSkillsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSkillsData {
  skills: ({
    id: UUIDString;
    title: string;
    description: string;
    tags: string[];
    createdAt: TimestampString;
    installCommand: string;
    author: {
      username?: string | null;
      imageUrl?: string | null;
      clerkId: string;
      email: string;
    } & User_Key;
  } & Skill_Key)[];
}
```
### Using `GetSkills`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSkills, GetSkillsVariables } from '@dataconnect/generated';

// The `GetSkills` query has an optional argument of type `GetSkillsVariables`:
const getSkillsVars: GetSkillsVariables = {
  searchTerm: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `getSkills()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSkills(getSkillsVars);
// Variables can be defined inline as well.
const { data } = await getSkills({ searchTerm: ..., limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `GetSkillsVariables` argument.
const { data } = await getSkills();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSkills(dataConnect, getSkillsVars);

console.log(data.skills);

// Or, you can use the `Promise` API.
getSkills(getSkillsVars).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

### Using `GetSkills`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSkillsRef, GetSkillsVariables } from '@dataconnect/generated';

// The `GetSkills` query has an optional argument of type `GetSkillsVariables`:
const getSkillsVars: GetSkillsVariables = {
  searchTerm: ..., // optional
  limit: ..., // optional
  offset: ..., // optional
};

// Call the `getSkillsRef()` function to get a reference to the query.
const ref = getSkillsRef(getSkillsVars);
// Variables can be defined inline as well.
const ref = getSkillsRef({ searchTerm: ..., limit: ..., offset: ..., });
// Since all variables are optional for this query, you can omit the `GetSkillsVariables` argument.
const ref = getSkillsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSkillsRef(dataConnect, getSkillsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.skills);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.skills);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateSkill
You can execute the `CreateSkill` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSkill(vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface CreateSkillRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
}
export const createSkillRef: CreateSkillRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSkill(dc: DataConnect, vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface CreateSkillRef {
  ...
  (dc: DataConnect, vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
}
export const createSkillRef: CreateSkillRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSkillRef:
```typescript
const name = createSkillRef.operationName;
console.log(name);
```

### Variables
The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSkillVariables {
  authorClerkId: string;
  title: string;
  description: string;
  tags: string[];
  installCommand: string;
  promptConfig: string;
  usageExample: string;
}
```
### Return Type
Recall that executing the `CreateSkill` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSkillData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSkillData {
  skill_insert: Skill_Key;
}
```
### Using `CreateSkill`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSkill, CreateSkillVariables } from '@dataconnect/generated';

// The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`:
const createSkillVars: CreateSkillVariables = {
  authorClerkId: ..., 
  title: ..., 
  description: ..., 
  tags: ..., 
  installCommand: ..., 
  promptConfig: ..., 
  usageExample: ..., 
};

// Call the `createSkill()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSkill(createSkillVars);
// Variables can be defined inline as well.
const { data } = await createSkill({ authorClerkId: ..., title: ..., description: ..., tags: ..., installCommand: ..., promptConfig: ..., usageExample: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSkill(dataConnect, createSkillVars);

console.log(data.skill_insert);

// Or, you can use the `Promise` API.
createSkill(createSkillVars).then((response) => {
  const data = response.data;
  console.log(data.skill_insert);
});
```

### Using `CreateSkill`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSkillRef, CreateSkillVariables } from '@dataconnect/generated';

// The `CreateSkill` mutation requires an argument of type `CreateSkillVariables`:
const createSkillVars: CreateSkillVariables = {
  authorClerkId: ..., 
  title: ..., 
  description: ..., 
  tags: ..., 
  installCommand: ..., 
  promptConfig: ..., 
  usageExample: ..., 
};

// Call the `createSkillRef()` function to get a reference to the mutation.
const ref = createSkillRef(createSkillVars);
// Variables can be defined inline as well.
const ref = createSkillRef({ authorClerkId: ..., title: ..., description: ..., tags: ..., installCommand: ..., promptConfig: ..., usageExample: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSkillRef(dataConnect, createSkillVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.skill_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.skill_insert);
});
```

