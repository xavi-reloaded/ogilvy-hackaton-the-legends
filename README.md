# Curler Mobile

## Follow 'Build First Phylosophy'

1. Unit Test
2. Auto Build, package, dependency management, etc..

# Prerequisites
- Must be installed globally
    - npm
    - cordova
    
- Install all dependency
    
    ```sh
    npm install
    ```    
# Tests

- Terminal
   
    ```sh
    npm test
    ```
- InteliJ
   
    - Configure Karma
        - Install the karma plugin.
        - Go to Run / Debug configuration
        - Add new configuration
        - Set  configuration
             - Configuration file:  In the drop-down select karma-conf.js
             - Node interpreter:  In the drop-down select last version of node
             - Karma package: In the drop-down select the karma of node_modules
        - Apply
        - Ok
        
    - Install the JetBrains IDE Support plugin on the Chrome
        - Go to the url and install the plugin on the Chrome
        - https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji/related
     
    - Run tests
        - Click play
        
    - Debug tests
        - Click debug