import {
  createStore,
  Store as VuexStore,
  CommitOptions
} from 'vuex'

import {BookingInfo} from 'src/models/BookingInfo'
import { Mutations, mutations } from './mutations'

export const store = createStore<BookingInfo>({
  state: {},
  mutations
})

export type Store = Omit<
  VuexStore<BookingInfo>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}
