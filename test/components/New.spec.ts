
import { mount, createLocalVue  } from '@vue/test-utils'
import 'jest'
import Vuex from "vuex";
import {expect, test, describe, beforeAll, beforeEach, jest} from '@jest/globals';
import New from '~/components/New.vue'

describe('new page unit test', () => {
  test('is a page', () => {
    const wrapper = mount(New, {
    })
    expect(wrapper.isVueInstance).toBeTruthy();
  });
   
  test(`calls add button `, () => {
    const wrapper = mount(New, {});
    const addTask = jest.fn();
    wrapper.setMethods({addTask: addTask});
    wrapper.find('button.add-new-button').trigger('click');
    expect(addTask).toHaveBeenCalled();
  })

  test(`calls update button `, () => {
    const wrapper = mount(New, {});
    const deleteTask = jest.fn();
    wrapper.setMethods({deleteTask: deleteTask});
    wrapper.find('button.action-delete').trigger('click');
    expect(deleteTask).toHaveBeenCalled();
  })

})