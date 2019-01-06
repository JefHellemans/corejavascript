# Core Javascript

An exercise in timing functions in Javascript.

## To run
Make sure yarn is installed and nothing is running on port `3000`. Then, on the root folder run:
```
yarn install
yarn start
```
The result will be available on `http://localhost:3000`.

## Functionality
The application should be pretty straight forward to use, but there are a couple of "hidden" features I would like to highlight.

1. It is possible to use this application in multiple tabs at the same time. They will synchronize between each other.
1. After entering a full due date and time, a `Remind me` option will appear which triggers a dialog when the deadline for the todo is reached.
1. If a due date is passed, the styling of a todo will change to reflect that state.

Other than that everything should be self explanatory, but please reach out to me if there are any questions.

## Usage of timing features in the code
There are a couple of places where different timing features of javascript are used. Some implement a more sane use case than others, but they are all used correctly and in a way that at least makes sense.

`async/await` is used throughout the whole project, but most notably in `client/helpers/api.ts` and `client/state/index.ts`.

`setTimeout` is used in `client/helpers/api.ts` to debounce and group updates, causing less frequent API calls when editing a todo. Furthermore it is used in `client/state/index.ts` to manage the reminder functionality.

`setInterval` is used in `client/state/index.ts` for the polling mechanism that automatically synchronizes the local todos with the ones from the server, making the multi-user functionality possible. I encountered the `this` problem there and solved it using `bind`.

Both `nextTick` and `setImmediate` are used on the server (`server/index.ts`) where more information about the case is provided. This is far from the ideal use case for an implementation of these features, but explains the difference between the two and shows in what order subsequent calls to them are executed.
