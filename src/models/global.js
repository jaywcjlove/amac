import menuSource from '../data/data';

export const global = {
  state: {
    test: 1,
    menuSource,
    title: '', // title
    details: '',
    selector: '', // menu selector key
    contentSource: [],
  },
  reducers: {
    updateState: (state, payload) => ({ ...state, ...payload }),
  },
  effects: {
    async updateListSource(data) {
      this.updateState({ contentSource: data });
    },
  },
};