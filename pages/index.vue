<template>
  <div>
    <div class="container">
      <br />
      <button
        @click="showModal()"
        class="btn btn-secondary add-new-button"
      >
        Add New Task
      </button>
      <br/>
      <client-only>
        <kanban-board :stages="states" :blocks="tasks" @update-block="updateBlock">
          <div v-for="stage in states" :slot="stage" :key="stage">
            <h2>{{ stage }}</h2>
          </div>
          <div v-for="task in tasks" :slot="task.id" :key="task.id">
            <div style="position: relative">
              <div><strong>Priority:</strong> {{ task.priority }}</div>
              <div class="task-title">Title:&nbsp;{{ task.title }}</div>
              <div class="task-description">
                Description:&nbsp;{{ task.description }}
              </div>
              <div class="view-task">
                <fa
                  @click="viewTask(task)"
                  class="icon"
                  :icon="['fa', 'eye']"
                />
              </div>
              <div class="action-btn">
                <fa
                  v-show="task.status != 'completed'"
                  @click="complete(task)"
                  class="action-check"
                  :icon="['fa', 'check']"
                />
                <fa
                  @click="remove(task.id)"
                  class="action-delete"
                  :icon="['fas', 'trash-alt']"
                />
              </div>
            </div>
          </div>
        </kanban-board>
      </client-only>
    </div>
    <New v-if="isModalVisible" @close-modal="isModalVisible = false" />
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import { mapState, mapActions } from "vuex";
    import New from "~/components/New.vue";
    import { Task } from "~/interfaces/task";


    export default Vue.extend({
      components: {
        New
      },
      data() {
        return {
          isModalVisible: false
        }
      },
      async fetch({ store }) {
        await store.dispatch("setStatus")
        await store.dispatch("loadAllTasks");
      },
      computed: {
        ...mapState(["states","tasks"]),
      },
      methods: {
        ...mapActions(["deleteTask", "updateTask", "setTask", "completeTask"]),
        onConfirm(task: Task): void { 
          this.update(task);
        },
        async remove(id: number){
          await this.deleteTask(id);
        },
        complete(task: Task){
          this.completeTask(task)
        },
        update(task:Task){
          this.updateTask(task)
        },
        async viewTask(task: Task){
          await this.setTask(task.id);
          this.isModalVisible = true;
        },
        async showModal(){
          await this.setTask(0)
          this.isModalVisible = true
        },
        async updateBlock(id: number, status: string) {
          let task = this.$store.state.tasks.filter((x: Task) => x.id == id)[0]
          await this.update({id: task.id, title: task.title, description: task.description, priority: task.priority, status: status})
        },
      },
    });
</script>



















<style>
ul.drag-list,
ul.drag-inner-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  max-width: 1000px;
  margin: 20px auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;
}
@media (max-width: 690px) {
  .drag-list {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
@media (max-width: 690px) {
  .drag-column {
    margin-bottom: 30px;
  }
}
.drag-column h2 {
  font-size: 0.8rem;
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.drag-inner-list {
  min-height: 50px;
  color: white;
}
.drag-column-backlog .drag-column-header {
  background-color: #fb7d44;
}
.drag-column-inprogress .drag-column-header {
  background-color: #2a92bf;
}
.drag-column-completed .drag-column-header {
  background-color: #00b961;
}
.drag-item {
  padding: 10px;
  margin: 10px;
  height: 120px;
  background: rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.drag-item.is-moving {
  transform: scale(1.5);
  background: rgba(0, 0, 0, 0.8);
}

.drag-header-more {
  cursor: pointer;
}

.drag-options {
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.drag-options.active {
  transform: translateX(0);
  opacity: 1;
}
.drag-options-label {
  display: block;
  margin: 0 0 5px 0;
}
.drag-options-label input {
  opacity: 0.6;
}
.drag-options-label span {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 400;
  margin-left: 5px;
}

/* Dragula CSS  */
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  list-style-type: none;
}

.gu-hide {
  display: none !important;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.gu-transit {
  opacity: 0.2;
}

.action-btn {
  position: absolute;
  color: var(--dark-color);
  right: 0;
  cursor: pointer;
}
.task-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.task-description {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.action-check {
  font-size: 20px;
  color: #6dc7ee;
}
.action-delete {
  color: rgb(243, 104, 104);
}
.view-task {
  position: absolute;
  color: var(--dark-color);
  right: 0;
  top: 0;
  cursor: pointer;
  font-size: 20px;
  color: #cbf37c;
}
.add-new-button {
  position: absolute;
}
</style>
