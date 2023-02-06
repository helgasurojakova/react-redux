import React, { useEffect } from 'react'
import { connect , useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './reducer'
import { ItemState, State, Store } from './types'

const extractionsState = (state: Store) => {
  return {
    isLoading: state.extractions.isLoading,
    data: state.extractions.data,
    error: state.extractions.error,
  }
}

const fetchData = (): any => {
  return (dispatch: Dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST })
    return fetch("http://localhost:3004/extractions")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_DATA_SUCCESS, payload: data })
      })
      .catch((error) => {
        dispatch({ type: FETCH_DATA_FAILURE, error: error })
      })
  }
}

function App(state: State) {
  const dispatch = useDispatch()
  const { isLoading, data, error } = state

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>
  }

  return (
    <div>
      {data &&      
      <table border={1}>
        <caption>
          Суточная динамика добычи нефти (т/сут) и воды (м3/сут) на месторождении «Северное» (1 – 31 января 2023 г).
        </caption>
        <tbody>
          <tr>
            <th>Дата</th>
            <th>Добыча нефти, т/сут</th>
            <th>Добыча жидкости, м3/сут</th>
          </tr>
          {data && data.map((item: ItemState) => {
            return (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.oilExtraction}</td>
              <td>{item.liquidExtraction}</td>
            </tr>)
          })}
        </tbody>
      </table>}
    </div>
  )
}

export default connect(extractionsState)(App)
