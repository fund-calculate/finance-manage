import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {Earnings} from './data';
import {queryEarnings} from './service';


export interface ModalState {
  list: Earnings[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    getEarningsModel: Effect;
  };
  reducers: {
    save: Reducer<ModalState>;
  };
}

const EarningsModel: ModelType = {
  namespace: 'earningsModel',
  state: {
    list: [],
  },
  effects: {
    * getEarningsModel(_, {call, put}) {
      const response = yield call(queryEarnings);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },

};

export default EarningsModel;
