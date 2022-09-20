<script setup>
import { reactive } from "@vue/reactivity"; // import ref  from vue
import { useMutation } from "@urql/vue";
/*  Create field for job form  - corresponds to the fields we have in our Webiny CMS */

const newJob = reactive({
  title: "",
  desc: "",
  jobUrl: "",
  location: "",
  contact: "",
  expires: "",
});
const createJobResult = useMutation(`
mutation(
  $title:String!, 
  $contact:String!, 
  $desc:String!,
   $location:String!, 
   $url:String!,
   $expiry:Date!) {

createJob(data:{
  	jobRole:$title
    jobContact:$contact
    jobDescription:$desc
    jobLocation:$location
    jobUrl:$url
    startDate:$expiry
	})
  {
    data{
      jobRole
      jobDescription
      jobContact
      jobLocation
      jobUrl
      startDate
    }
  }
}
`);

/* * This function will take all the input from the form and push it into an object.
Then it will push the object to the jobs array and reset all the input fields.
*/
const checkFields = (newJob) => {
  if (
    newJob.title == "" ||
    newJob.desc == "" ||
    newJob.contact == "" ||
    newJob.jobUrl == "" ||
    newJob.location == "" ||
    newJob.expires == ""
  ) {
    alert("Fill in the fields");
  } else {
    addJob();
  }
};
const addJob = () => {
  const variables = {
    title: newJob.title,
    contact: newJob.contact,
    desc: newJob.desc,
    location: newJob.location,
    url: newJob.jobUrl,
    expiry: new Date(newJob.expires).toISOString().split("T")[0],
    // WEBINY CMS accepts a particular format for sending Dates
  };
  createJobResult.executeMutation(variables).then((result) => {
    if (result.error) {
      alert(result.error.name);
    } else {
      window.location.reload();
    }
  });
};
</script>

<template>
  <div>
    <h1>CREATE JOB</h1>
    <!-- Form for creating a job. This will push entered values into the CMS -->
    <form class="jobForm" @submit.prevent="checkFields(newJob)">
      <label for="title">Title</label>
      <input type="text" name="title" v-model="newJob.title" />
      <label for="desc">Job Description</label>
      <textarea name="desc" class="jobDesc" rows="5" v-model="newJob.desc">
      </textarea>
      <label for="URL">Job Reference URL</label>
      <input
        type="url"
        name="URL"
        placeholder="https://"
        pattern="https://.*"
        v-model="newJob.jobUrl"
      />
      <label for="contact">Job Contact Email</label>
      <input type="email" name="contact" v-model="newJob.contact" />
      <label for="location">Job Location</label>
      <input type="text" name="location" v-model="newJob.location" />
      <label for="expiry">Job Start Date</label>
      <input type="date" v-model="newJob.expires" name="expiry" />
      <button type="submit" value="Submit">ADD JOB</button>
    </form>
  </div>
</template>
