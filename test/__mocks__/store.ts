import { state, getters, mutations, actions } from '~/store/index'

export default function storeConfig() {
  return {
    modules: {
      index: { state, getters, mutations, actions },
    },
  }
}