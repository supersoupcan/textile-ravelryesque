##### App Structure

index.js => Provider,
Provider => Router,
Router => Route('/'),
Route('/') => App,
App => [ NavBar, Route('/path'), Footer ],
RoutePath('/path') => redux.connencted Container,
redux-connected Container => [Container, Presentational],
Container => Container, Presentational, JSX


##### Focus
~~ API calls trigger actions (not the other way around) ~~ 
nevermind actually this seems terrible

instead I have an api module that accepts api request, and 
dynamically creates an action for that promise... unless the request fails, 
this promise is not tied to the completion of the original api request, 
but rather the sucsess boolean passed within the reponse 
this way I don't have worry about resolving errors within reducer case statements

every object in the store has a messages prop, which accepts req.flash on every server call