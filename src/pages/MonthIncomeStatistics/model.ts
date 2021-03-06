import {AnyAction, Reducer} from 'redux';

import {EffectsCommandMap} from 'dva';
import {Earnings} from './data';
import {queryEarnings, montyEarningsList} from './service';


export interface ModalState {
  data: Earnings[];
  montyEarningsList: Earnings[];
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
    fetchCurrent: Effect;
  };
  reducers: {
    show: Reducer<ModalState>;
    showMontyEarningsList: Reducer<ModalState>;
  };
}

const EarningsModel: ModelType = {
  namespace: 'earningsModel',

  state: {
    data: [],
    montyEarningsList: [],
  },

  effects: {
    * fetchBasic(_, {call, put}) {
      const response = yield call(queryEarnings);
      yield put({
        type: 'show',
        payload: response.data
      });
    },
    * fetchCurrent(_, {call, put}) {
      const response = yield call(montyEarningsList);
      yield put({
        type: 'showMontyEarningsList',
        payload: response.data
      });
    },
  },

  reducers: {
    // show(state, {payload}) {
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    // },
    show(state, action) {
      return {
        ...(state as ModalState),
        data: action.payload,
      };
    },
    showMontyEarningsList(state, action) {
      return {
        ...(state as ModalState),
        montyEarningsList: action.payload,
      };
    },
  },
};

export default EarningsModel;
