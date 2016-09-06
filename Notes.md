
# ForgeHub

## Purpose
  - Create prototype for Forge's IOS/Android App

## Tasks
  - Convert backend database/scrapper output from a JSON file to real database
    - Initially start with mongodb
  - Generate UI/Views for App
    - Complete only UI for representing data on the server, leave user interactions/mutations for later
  - Build the barebones MVP version and compress it for publication on Appetize.io

## Future Tasks
  - User interactions
    - User Auth
    - Social integration (likes, comments, shares, etc.)
  - UI/UX improvements
  - Performance Tuning
    - Common pitfalls --> Common optimizations --> Testing --> Profiling --> Testing --> Profiling .... --> Eventually Done
    - Moving down to Native when necessary

### Misc Tasks
  - Write/Blog about experience

### Complete
  - Update existing tools (Node, xCode, etc.)
    - Node, Xcode, and other npm modules are all updated to latest versions that do not conflict with each other
  - Search for any new tools/updates to old tools for React Native since I last checked
    - Siphon
      - Exponent like ease of pushing prototypes to devices through their app
        - Unfortunately this leads to their downfall as they like Exponent, don't offer a way to push custom native modules to prototypes, and they realized this and have decided to terminate their endeavors
      - 'pain-free publishing for react native', essentially minimizing the grunt work to deploy to IOS/Android
      - CodePush/AppHub style 'pushing updates to production apps'
    - Ignite
      - Essentially the same as it was when I previously looked at it
      - Skeleton Generator, with an emphasis on Redux
    - Deco
      - Hasn't published much progress since I last checked but should the majority of popular custom native modules be added to deco, with better tooling (fails to recognize 'View/components' that were not dragged from their list, as components with properties), and less bugs in the IDE, and it could super popular among designers and may legs up from 'constraint builder' that IOS offers in the form of AutoLayout
    - FastLane
      - Looks amazing from the demo/intro video https://fastlane.tools/
      - Essentially a CI tool like travis for mobile development supporting react native
      - Offers a ton of time saving features (automatic screenshots and signing certificates!!!, etc.) and integrations (slack, etc.) that make it worthwhile for a large/serious project
    - Nuclide
      - Hasn't changed much from last time, a basic IDE for JS development, with support for Debugger/Element Inspector for RN
      - Does have an issue with Node 6.x where the debugger fails to connect with the simulator, but you can fix by running Node 5.x or targeting 5.x through Nuclide settings
    - Misc.
      - Lots of other platforms have lent their hand of approval for React Native, either via promises to add react native support to their platform (Ubuntu, Microsoft, Samsung, etc...) or tooling (Visual Studio Code)
      - Fable is alternative to extent for allowing React Native to be written in F#
      - Facebook's Paper-Like UI has been done with Native, and some crazy people are even trying some openGl integration
        - Reference links
      - RN 0.32 allows for more components (SwipeableListView, cross platform ActivityIndicator, KeyboardAvoidingView) and some new css stuff (StyleSheet.absoluteFill, layout algorithm, better flexbox implementation, starting to offloading Animations from the JS tread, z-index)
  - Find/Learn the basic of a popular Web Automation/Test Framework
    - Learned the basic of Selenium and built scrapper to fetch necessary data from Forge's Website
  - Setup BoilerPlate for React Native and Graphql Backend Server, Relay, Babel etc.
