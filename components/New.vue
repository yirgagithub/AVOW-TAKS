<template>
  
  <div class="modal-overlay">
    <div class="modal">
    <h3 class="lead text-dark">Add Task</h3>
    <div class="add">
      <form>
        <div class="row">
        <input
          type="text"
          v-model="title"
          placeholder="Task title"
        />
        <div v-show="titleError" style="color:red">Title is required</div>
        <textarea type="textArea" v-model="description" placeholder="Describe your task..."></textarea>
        <div style="height:5px" type=""></div>
        <label>Status:&nbsp;&nbsp;</label>
      <input type="radio" id="backlog" name="status" v-model="status" value="backlog" checked> <label for="backlog">Backlog</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" id="inprogress" name="status" v-model="status" value="inprogress"> <label for="inprogress">In Progress</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" id="completed" name="status" v-model="status" value="completed"> <label for="completed">Completed</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <div style="height:5px" type=""></div>
      <label>Priority:&nbsp;&nbsp;</label>
      <input type="radio" id="p1" name="pr" value="p1" v-model="priority" checked> <label for="p1">P1</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" id="p2" name="pr" value="p2" v-model="priority"> <label for="p2">P2</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" id="p3" name="pr" value="p3" v-model="priority"> <label for="p3">P3</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="radio" id="p4" name="pr" value="p4" v-model="priority"> <label for="p4">P4</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <div style="height:5px" type=""></div>
        <button v-if="id == 0" @click="onSubmit" class="btn btn-secondary" type="submit" >Add</button>
        <button v-if="id != 0" @click="onSubmit" class="btn btn-secondary" type="submit" >Update</button>
        <button type="button" @click="$emit('close-modal')" class="btn btn-dark">Cancel</button>
      </div>
      </form>
   
  </div>
  </div>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "New",
  data() {
    let task = this.$store.state.task
    if(task.id == undefined){
      return {id: 0, title:  '', description: '', status: 'backlog', priority: 'p1', titleError: false} 
    }
    return {id: task.id, title:  task.title, description: task.description, status: task.status, priority: task.priority};
  },
  methods: {
    ...mapActions(["addTask", "updateTask"]),
    onSubmit(e: MouseEvent | KeyboardEvent): void {
      e.preventDefault();
     
      if(this.title != "" && this.id == 0 || this.id == undefined){
        this.$emit('close-modal')
        this.addTask({title: this.title, description: this.description, status: this.status, priority:this.priority});
      }else if(this.title != ""){
        this.$emit('close-modal')
        this.updateTask({id: this.id, title: this.title, description: this.description, status: this.status, priority:this.priority})
      }else{
        this.titleError = true
      }
    },
  },
});
</script>

<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: 1px solid #b4becb;
}
</style>

<style scoped>

form input:focus {
  outline: none;
}

input[type="text"] {
  flex: 10;
  border: 1px solid #b4becb;
  width: 80%;
  padding: 10px;
  font-size: 16px;
}

textarea{
  flex: 10;
  border: 1px solid #b4becb;
  width: 80%;
  padding: 10px;
  font-size: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 400px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
btn-primary{
  background-color: #ac003e;
}
btn-secondary{
  background-color: #e4c3cfe0;
}
</style>