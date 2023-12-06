import { Dispatch } from 'react'

export const resetStore = (type: string) => async (dispatch: Dispatch<any>) => {
  dispatch({
    type,
  })
}

export const startLoading = (type: string) => async (dispatch: Dispatch<any>) =>
  dispatch({
    type,
  })

export const stopLoading = (type: string) => async (dispatch: Dispatch<any>) =>
  dispatch({
    type,
  })

//logout
/* export const logout = () => async (dispatch: Dispatch<any>) => {
	dispatch({
		type: LOGOUT,
	});
} */
