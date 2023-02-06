export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

export const initialState = {
  isLoading: false,
  data: [],
  error: null,
}

export const extractionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true }
    case FETCH_DATA_SUCCESS:
      return { ...state, isLoading: false, data: action.payload[0] }
    case FETCH_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}
