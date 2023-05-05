import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom';

import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={PageOne} />
                <Route path="/page-two" component={PageTwo} />
                <Route path="/page-three" component={PageThree} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
