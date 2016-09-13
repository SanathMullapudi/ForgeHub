## Future Tasks (reasonable)
- User interactions
  - User Auth
    - better implementation if auth is baked into graphql implementation via graphql's context parameter w/ JWT token stored client side or alternative implementation to the same effect
  - Social integration (likes, comments, shares, etc.)
  - reactivity (i.e. real time via relay subscriptions or socket cluster or 'fake it' w/ simple web sockets builtin to RN not connected to graphql, but integration with graphql would be a more interesting proposition and better learning experience)
- Video encoding script (potentially AWS lambda) that fires when uploading to s3 bucket, and encodes the video for various common video formats
  - use AWS Elastic Transcoder or zencoder's offered solution
- UI/UX improvements
- Security/ExtraValidations/'Housekeeping'
- Performance Tuning
  - Common pitfalls --> Common optimizations --> Testing --> Profiling --> Testing --> Profiling .... --> Eventually Done
  - Moving down to Native when necessary

## Future Fun Tasks (experimental)
- Relay Subscriptions?, Alternative real time interactions
- Future task implement soundcloud like comments that show based on time stamps
- Tie in a little machine learning fun w/ 'fake data'  that shows how to pick related video section etc.
  - Also could be interesting to do A/B testing on slightly different UI's and record various stats (time spend on app, on videos, etc.) to find optional UI/UX that way

## Code Optimizations/General Thoughts
  - Mongo Inheritance?! via Discriminators and ES6, to reduce code/logic duplication
    - the overlap in logic/code between the User and Game models could be solved with new mongoose discriminators
      - http://mongoosejs.com/docs/discriminators.html
    - Do this later for sake of learning but doesn't need to be part of the MVP
  - The scraping algorithm restructure (avoid doing this now since, the mock database wouldn't be necessary with actual access to Forge's backend)
    - the algorithm --> Json --> then to mongo is fine for now, but can be refactored to be more extensible, and collate the related code blocks
    - the css selectors in 'options.js' can be moved into the mongo models that they describe,
    - the parsing should skip the json and write straight to mongo, this reducing unnecessary async code/related duplication (like looping through essentially the same structure 2x)
    - a more generalized approach breaks the 'scraper' into 2 phases a seek phase and find phase, like it currently is but be coded to make that more apparent and allow for callback tie in's that work into the main algorithm, similar to specToGraphQL
      - this would allow more modular chucks like, parse item (going either to JSON/Mongo), and allow for better seek phase than 'just look at top 50 videos'
      - could allow for finite page visiting, to correct like a single video
      - could allow better Performance/UI for the pull-to-refresh portion
      - also the helper functions that are essentially reformatting functions would be placed in the mongo model they match
