// 购物车状态

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    deleteCart (store, skuId) {
      return new Promise((resolve, reject) => {
        if (store.rootState.user.profile.token) {
          // todo
        } else {
          store.commit('deleteCart', skuId)
          resolve()
        }
      })
    }
  },
  getters: {
    validList (state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    validTotal (state, getters) {
      return getters.validList.reduce((total, item) => total + item.count, 0)
    },
    validAmount (state, getters) {
      return getters.validList.reduce((total, item) => total + item.nowPrice * item.count, 0).toFixed(2)
    }
  }
}
