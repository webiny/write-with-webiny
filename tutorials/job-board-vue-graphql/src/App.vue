<script setup>
import { reactive } from "@vue/reactivity"; // import ref and reactive from vue
import moment from "moment";
import { useQuery, useMutation } from "@urql/vue"; //
import Create from "./components/Create.vue";
/* Array to contain our jobs */
const jobs = reactive([]);
const currentDate = moment(Date.now()).format("Do MMMM Y");

/* * This function will access the Webiny CMS using GraphQL to return all the jobs posted.
 */
useQuery({
  query: `
      {
        listJobs{
            data{
              id
              jobRole
              jobContact
              jobDescription
              jobLocation
              jobUrl
              startDate
              createdOn
                }
            }
          }
      `,
}).then((result) => {
  let jobResult = result.data.value.listJobs.data; // get the list of result from the CMS
  jobResult.forEach((element) => {
    jobs.push(element);
  });
});

/** DELETING A JOB * */
const deleteJobResult = useMutation(`
  mutation($ID: ID!){
      deleteJob(revision:$ID) {
        data
      }
    }
`);

const removeJob = (id) => {
  const variables = {
    ID: id,
  };
  deleteJobResult.executeMutation(variables).then((result) => {
    if (result.error) {
      console.error("Oh no!", result.error);
    } else {
      location.reload(); // refresh the page
    }
  });
};
</script>
<template>
  <!-- container for the entire page -->
  <div class="container">
    <!-- a div to layout all the jobs in our database -->
    <div class="jobs">
      <date class="currentDate">{{ currentDate }}</date>
      <h1>JOBS</h1>
      <!-- for each job in our database display -->
      <div class="job" v-for="job in jobs" :key="job.id">
        <h2>{{ job.jobRole }}</h2>
        <h4>{{ job.jobUrl }}</h4>
        <p>
          {{ job.jobDescription }}
        </p>
        <h3><span class="material-icons"> map </span>{{ job.jobLocation }}</h3>
        <h3><span class="material-icons"> mail </span>{{ job.jobContact }}</h3>
        <h3>Start Date: {{ moment(job.startDate).format("Do MMMM Y") }}</h3>
        <div class="header">
          <span>posted on {{ moment(job.createdOn).format("Do MMMM Y") }}</span>
          <button class="icon" @click="removeJob(job.id)">
            <span class="material-icons"> delete </span>
          </button>
        </div>
      </div>
    </div>
    <!-- a div to layout our form sidebar -->
    <div class="side">
      <Create></Create>
    </div>
  </div>
</template>
<!-- Most of the styles are in styles.css. Here are some just for this page. -->
<style scoped>
/* These two classes are to layout the title and the delete button on a job */
.header {
  display: flex;
  justify-content: space-between;
}
.header span {
  padding: 15px;
  cursor: pointer;
}
</style>

<!-- <span class="material-icons" @click="editJob(job)"> edit </span>-->
