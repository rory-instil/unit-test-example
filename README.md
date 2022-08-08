# Getting Started with Unit Test Example

## Node
Install `nvm` if you haven't already: https://github.com/nvm-sh/nvm#install--update-script
and run:
```bash
nvm use
```

## Building

In the project directory, run:

### `npm install`

## Testing
In the project directory, run:
### `npm run test`

### Using the debugger in Intellij
Simply open a test file (i.e. `./src/app.itest.ts`) and click the run button beside a test, or right click the file and select run.
![image](https://github.com/rory-instil/integration-test-example/blob/main/run-test-example.png?raw=true)
You can also debug tests this way

### Using the debugger in VS Code
Debugging is one of the places where VS Code really shines over other editors.
Node.js debugging in VS Code is easy to set up and even easier to use.
This project comes pre-configured with everything you need to get started.

When you hit `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.

You can debug in the following ways:
* **Launch Program** - transpile typescript to javascript via npm build, then launch the app with the debugger attached on startup
* **Attach by Process ID** - run the project in debug mode. This is mostly identical to the "Node.js: Attach by Process ID" template with one minor change.
  We added `"protocol": "inspector"` which tells VS Code that we're using the latest version of Node which uses a new debug protocol.
* **Jest Current File** - have a Jest test file open and active in VSCode, then debug this specific file by setting break point. All tests are not run.
* **Jest all** -  run all tests, set a break point.

In this file, you can tell VS Code exactly what you want to do:
```json
[
        {
            "name": "Launch Program",
            "type": "node",
            "program": "${workspaceFolder}/dist/server.js",
            "request": "launch",
            "preLaunchTask": "npm: build"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach by Process ID",
            "processId": "${command:PickProcess}",
            "protocol": "inspector"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Jest Current File",
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "args": [
                "${fileBasenameNoExtension}",
                "--detectOpenHandles"
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "disableOptimisticBPs": true,
            "windows": {
                "program": "${workspaceFolder}/node_modules/jest/bin/jest",
            }
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Jest all",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script",
                "test"
            ],
            "port": 9229,
            "skipFiles": [
                "<node_internals>/**"
            ]
        },
    ]
```

With this file in place, you can hit `F5` to attach a debugger.
You will probably have multiple node processes running, so you need to find the one that shows `node dist/server.js`.
Now just set your breakpoints and go!

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
