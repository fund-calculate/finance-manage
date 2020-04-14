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
    setup: Effect;
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
    * setup(_, {dispatch, put}) {
      const ws = new WebSocket('ws://127.0.0.1:1000/test/1000');
      ws.onopen = function (msg) {
        console.log('ws 打开了连接', msg);
      };

      ws.onmessage = function (msg) {
        console.log('接收服务端发过来的消息', JSON.parse(msg.data));
        // dispatch({
        //   type: 'show',
        //   payload: JSON.parse(msg.data),
        // });
        put({
          type: 'show',
          payload: JSON.parse(msg.data)
        });
      };

      ws.onclose = function (e) {
        console.log('ws 连接关闭了');
      };
    }
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
