import {AnyAction, Reducer} from 'redux';

import {EffectsCommandMap} from 'dva';
import {Earnings} from './data';
import {queryEarnings} from './service';


export interface ModalState {
  data: Earnings[];
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
        payload: response,
      });
    },
  },

  reducers: {
    show(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default EarningsModel;
