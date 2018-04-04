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
~~ API calls trigger actions (not the other way around) ~~ nevermind actually
Focus on on rendering 