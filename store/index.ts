
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Task } from '~/interfaces/task';

export const state = () => ({
    tasks: [] as { userId: number, id: number, title: string, status: string }[],
    task: {} as Task,
    states:[] as string[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    getAllTasks: (state) => state.tasks
}

export const actions: ActionTree<RootState, RootState> = {
     setStatus({commit}){
      const res = getAllStatus()
      commit('SET_KANBAN_STATUS',res)
      
    },
     async loadAllTasks({ commit }) {
        const res =  await this.$axios.$get('task');
        commit('SET_TASKS', res);
    },
   async setTask({commit},id)  {
    let task = {};
    if(id != 0)
       task = await this.$axios.$get(`task/${id}`);
    commit('SET_TASK', task)
   },
    async addTask({ commit }, data) {
        const res = await this.$axios.$post('task', data);
        res.id = this.state.tasks.length+1
        commit('NEW_TASK', res);
    },
    async deleteTask({ commit }, id) {
        await this.$axios.$delete(`task/${id}`);
        commit('REMOVE_TASK', id);
    },
   
    async updateTask({ commit }, updatedTask) {
        const res = await this.$axios.$put(`task`, updatedTask);
        commit('UPD_TASK', res)
    }, 

    async completeTask({commit}, updatedTask){
        const res = await this.$axios.$get(`task/complete/${updatedTask.id}`);
        commit('UPD_TASK', res)
    }
}

export const mutations: MutationTree<RootState> = {
    SET_KANBAN_STATUS:(state,states) => state.states = states,
    SET_TASKS: (state, tasks) => state.tasks= tasks,
    SET_TASK: (state, task) => state.task = task,
    NEW_TASK: (state, task) => state.tasks.push(task),
    REMOVE_TASK: (state, id) => state.tasks = state.tasks.filter(task => task.id !== id),
    UPD_TASK: (state, updTask) => {
        const index = state.tasks.findIndex(task => task.id === updTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updTask);
        }
    },
    COMPLETE_TASK: (state, updTask) => {
        updTask.status = "completed"
        const index = state.tasks.findIndex(task => task.id === updTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updTask);
        }
    },
}

export const getAllStatus = () => {
  return ['backlog','inprogress','completed']
}