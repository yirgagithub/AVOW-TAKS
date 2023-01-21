
import { mount, createLocalVue  } from '@vue/test-utils'

import Vuex from "vuex";
import {expect, test, describe, beforeAll, beforeEach, jest} from '@jest/globals';
import Index from '~/pages/index.vue'
import storeConfig from '~/test/__mocks__/store'
import exp from 'constants';

// eslint-disable-next-line import/no-named-as-default-member
const store = new Vuex.Store({
  state: storeConfig().modules.index.state,
  getters: storeConfig().modules.index.getters,
  mutations: storeConfig().modules.index.mutations,
  actions: storeConfig().modules.index.actions,
})


describe('Task page unit test', () => {
  test('is a page', () => {
    const wrapper = mount(Index, {
    })
    expect(wrapper.isVueInstance).toBeTruthy();
  });
   
  test(`calls add button `, () => {
    const wrapper = mount(Index, {});
    const addTask = jest.fn();
    wrapper.setMethods({addTask: addTask});
    wrapper.find('button.add-new-button').trigger('click');
    expect(addTask).toHaveBeenCalled();
  })

  test(`calls delete button `, () => {
    const wrapper = mount(Index, {});
    const deleteTask = jest.fn();
    wrapper.setMethods({deleteTask: deleteTask});
    wrapper.find('button.action-delete').trigger('click');
    expect(deleteTask).toHaveBeenCalled();
  })

  test(`calls marked button `, () => {
    const wrapper = mount(Index, {});
    const markTask = jest.fn();
    wrapper.setMethods({markTask: markTask});
    wrapper.find('button.action-check').trigger('click');
    expect(markTask).toHaveBeenCalled();
  })

  test(`calls view button `, () => {
    const wrapper = mount(Index, {});
    const viewTask = jest.fn();
    wrapper.setMethods({viewTask: viewTask});
    wrapper.find('button.icon').trigger('click');
    expect(viewTask).toHaveBeenCalled();
  })

  test('load all tasks', () => {
    let tasks =  store.getters.loadAllTasks
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1
        })
      ]))
  })

})
