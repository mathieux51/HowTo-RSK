/* eslint-disable import/prefer-default-export */

import { SET_FIELD } from '../constants/index';

export const setField = (field, fielName) => dispatch => {
  dispatch({
    type: `${SET_FIELD}_${fielName}`,
    field,
  });
};

// export const fetch = (resourceType, id) => (dispatch, getState) => {
//   const isFetching = getState().isFetching[resourceType] || false
//   if (!isFetching) {
//     dispatch({ type: 'FETCH_REQUEST', resourceType, id })
//     get(resourceType).then(
//       resources => dispatch({ type: 'FETCH_SUCCESS', resourceType, resources }),
//       error => dispatch({ type: 'FETCH_FAILURE', resourceType, error })
//     )
//   }
// }
