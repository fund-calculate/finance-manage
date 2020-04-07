import {AnyAction, Reducer} from 'redux';

import {EffectsCommandMap} from 'dva';
import {TableListItem} from './data';
import {queryEarnings} from './service';


export interface ModalState {
  data: TableListItem[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<ModalState>;
  };
}

const EarningsModel: ModelType = {
  namespace: 'earningsModel',

  state: {
    data: [],
  },

  effects: {
    * fetchBasic(_, {call, put}) {
      const response = yield call(queryEarnings);
      yield put({
        type: 'show',
        payload: response.data
      });
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...(state as ModalState),
        data: action.payload,
      };
    },
  },
};

export default EarningsModel;
