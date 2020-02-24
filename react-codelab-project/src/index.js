import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Container Components
import { App, Home, Login, Register } from 'containers';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
/*
    redux-thunk ?

    redux-thunk 는 dispatcher 가 action creator 가 만든 action 객체 외에도, 저희가 만든 함수도 처리 할 수 있게 해줘요.

    비동기 처리를 할 때 사용되는 redux 미들웨어인데요,
    보통 dispatch() 함수 내부에 들어가는건 action 객체, 혹은 action creator 함수이죠?
    action-creator 는 그냥 객체만 반환 할 뿐 거기에서 HTTP 요청을 하거나 할수는 없잖아요,

    redux-thunk 를 사용하면, 우리가 함수를 만들어서 (정확히는 함수를 리턴하는 함수에요) 그 함수 내부에서
    AJAX 요청을 하고, 그 결과값에 따라 다른 action (ajax 가 성공했다던지 실패했다던지..) 을 또 dispatch 할 수 있게 됩니다.
    이렇게 말로 풀어서 설명을 해드리자면 이해하기가 힘든데 한번 직접 사용해보면 아~ 이런거구나 하실거에요.
    [https://velopert.com/1967]
*/

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
            </Route>
        </Router>
    </Provider>, rootElement
);