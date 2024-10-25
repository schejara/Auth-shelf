import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
function* fetchShelf() {
    try {
        
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
  
      
      const response = yield axios.get('/api/shelf',rejectUnauthenticated,config);
      console.log('API response:', response.data);      
      yield put({ type: 'SET_SHELF', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }


function* shelfSaga() {
    console.log('shelf function')
    yield takeLatest('FETCH_SHELF', fetchShelf);
  }

  export default shelfSaga
  