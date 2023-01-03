import * as api from '../api';
import { UPDATE_TARGET_CREATORS_FOLLOW_STATUS } from '../constants/actionType';


export const updateTargetCreatorFollowStatus = (creator) => async(dispatch) => {
    try {
      const { data } = await api.updateTargetCreatorFollowStatus(creator);
      dispatch( { type: UPDATE_TARGET_CREATORS_FOLLOW_STATUS, payload: data })
      console.log('followed', data)
    } catch (error) {
      console.log(error);
    }
  }