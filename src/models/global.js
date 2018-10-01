import menuSource from '../data/data';
console.log('menuSource:', menuSource)

export const global = {
  state: {
    test: 1,
    menuSource,
    selector: '', // menu selector key
    listSource: []
  },
  reducers: {
    updateState: (state, payload) => ({ ...state, ...payload }),
  },
  effects: {
    async updateListSource(data) {
      this.updateState({ listSource: data });
    },
  },
};