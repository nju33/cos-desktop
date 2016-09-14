export default function finder(state = {}, action) {
  switch (action.type) {
    case 'LOAD_ROOT': {
      return Object.assign({}, state, {
        containers: action.data,
        object: {}
      });
    }

    case 'LOAD_DETAIL': {
      return Object.assign({}, state, {
        container: action.data,
        object: {}
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
