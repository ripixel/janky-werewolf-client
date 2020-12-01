# Proposed Refactor of Component Design

## Current State

The current implementation of components relies on:

- Each class has a dedicated component for its special stage, with other classes having a "not-the-special class" component
- Desktop and Mobile have dedicated view controller components
- Redux connectors are individual to each component, regardless of whether used elsewhere (with some exceptions)

This has the benefit that each stage is encapsulated, and distinct from everything else, meaning changing individual stages has no chance of affecting others.

However, it has the major drawback that the number of components grows linearly by a factor of the number of stages for each new class added. This will create a large number of components, and the Higher-order-component controllers also increase in complexity.

## Desired State

Instead of the above, I will refactor the components so that:

- Each specific piece of functionality will be its own component. Currently this comprises of:
  - "You have joined the game, but it has not yet started"
  - Pick a single player that matches some critera, and perform an action immediately, or possibly perform an action immediately that isn't tied to a player
  - Pick a single player that matches some criteria, and vote on a specific player to perform an action that happens only when all voters agree
  - "You have nothing to do, sit tight"
  - Town setup
  - Win/Loss

This means future classes could be added with no additional functional components required. If a new functional component is required, it's then added for future classes to use if needed.

### Implementation

To be able to define for what state what functionality is required, there will be a "matrix config object". This will look something like:

```javascript
import Settings from './settings';
import WaitingToStart from './waitingToStart';

const MATRIX_CONFIG = {
  [STAGE.LOBBY]: {
    [ROLE.MOD]: Settings,
    [ROLE.UNKNOWN]: WaitingToStart,
  },
};
```

For the render, we can simply then do:

```javascript
const MatrixComponent = MATRIX_CONFIG[stage][role];
return <MatrixComponent />;
```

We have therefore reduced a possible 4-deep HOC level to 1. We can easily see for a given stage and role what functional component will be rendered.

### Caveats

Even though the _functionality_ of each component will be abstracted into singular functions, some components will require additional props given their role.

As a slight reversion to the previous way of doing things, we will therefore create Higher-order-components that wrap the functional component with the desired props. For example:

```javascript
const PickNoVote = ({ availablePlayers, actionToTake }) => { ... };

export const SeerPickNoVote = seerConnector(PickNoVote);
export const BodyguardPickNoVote = bodyguardConnector(PickNoVote);
```

In the example above, `seerConnector` and `bodyguardConnector` are Redux connectors similar to those already in use.
