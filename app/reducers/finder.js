export default function finder(state = {}, action) {
  switch (action.type) {
    case 'LOAD_ROOT': {
      return Object.assign({}, state, {containers: action.data});
    }

    case 'LOAD_DETAIL': {
      return Object.assign({}, state, {
        container: action.data
      });
    }

    case 'SHOW_DETAIL': {
      return Object.assign({}, state, {
        object: action.data
      });
    }

    default:
      return state;
  }
}
