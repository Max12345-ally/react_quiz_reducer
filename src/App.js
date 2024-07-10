import {useEffect, useReducer} from 'react';
import Error from './Error';
import Header from './Header';
import Loader from './Loader';
import Main from './Main';
import StartScreen from './StartScreen';

const initialState = {
  questions: [],
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  const [{question, status}, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({type: 'dataReceived', payload: data}))
      .catch((err) => dispatch({type: 'dataFailed'}));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'Loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
      </Main>
    </div>
  );
}
