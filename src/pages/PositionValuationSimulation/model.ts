import {AnyAction, Reducer} from 'redux';

import {EffectsCommandMap} from 'dva';
import {Aggregation} from './data';
import {queryAggregation} from './service';


export interface ModalState {
  aggregation: Partial<Aggregation>;
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
    aggregation: {},
  },

  effects: {
    * fetchBasic(_, {call, put}) {
      const response = yield call(queryAggregation);
      yield put({
        type: 'show',
        payload: response
      });
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...(state as ModalState),
        aggregation: action.payload.data,
      };
    },
  },
};

export default EarningsModel;
