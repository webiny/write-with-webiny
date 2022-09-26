<!-- ./components/PhotoForm.vue -->

<script setup>
// get photo data from props, if any is provided
const { photoData, mode } = defineProps(["photoData", "mode"]);

// initial page state
// conditionally set default values incase photo data is not defined in props
const file = ref({
  url: photoData?.photo || "",
});
console.log({ file, photoData });
const caption = ref(photoData?.caption || "Caption");
const username = ref(photoData?.author.username || "miracleio");
const name = ref(photoData?.author.name || "");
const userId = ref(photoData?.author.id || "");

const authorExists = ref(false);
const isLoading = ref(false);
const data = ref({});

// init toast component state
const toastState = useToastState();
const setToastState = useSetToastState;

/**
 * header data to be used in POST fetch requests
 */
let headers = {
  method: "POST",
  "Content-Type": "application/json",
};

/**
 * function to reset form state
 * @param {Event} e Form event
 */
const resetForm = (e) => {
  e.target.reset();
  file.value = null;
  caption.value = "";
  username.value = "";
  name.value = "";
  userId.value = null;

  authorExists.value = false;

  isLoading.value = false;
  data.value = {};
};

/**
 * function to handle file selection
 * @param {Event} e Form event
 */
const handleFileSelect = (e) => {
  // get file from file input button
  file.value = e.target.files[0];

  // create a temporary url to be used as `src` of preview image
  file.value.url = URL.createObjectURL(file.value);
  console.log({ file, url: file.value.url });

  // check if file selected is actually an image
  let isImage = file.value.type.includes("image");
  console.log({ isImage });

  // alert user and clear input and file values
  if (!isImage) {
    alert("Please select a valid image file");
    e.target.value = "";
    file.value = null;
  }
};

/**
 * function to get presigned payload data from webiny
 */
const getPresignedPostData = async (fileData) => {
  console.log({ fileData });
  const res = await (
    await fetch("/api/getPresignedPostData", {
      ...headers,
      body: JSON.stringify(fileData),
    })
  ).json();

  return res.fileManager.getPreSignedPostPayload.data;
};

/**
 * function to upload file to s3 bucket
 */
const uploadToS3 = async ({ url, fields }, file) => {
  console.log({ url, fields, file });
  const formData = new FormData();
  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key]);
  });
  // Actual file has to be appended last.
  formData.append("file", file);

  const res = await fetch(url, {
    method: "POST",
    "Content-Type": "multipart/form-data",
    body: formData,
  });

  console.log({ res });

  return res;
};

/**
 * function to get payload data and upload file to s3 bucket
 */
const uploadFile = async (fileData) => {
  // get payload data
  let preSignedPostPayload = await getPresignedPostData(fileData);
  console.log({ preSignedPostPayload });

  // upload file to s3 bucket with payload data
  let upload = await uploadToS3(preSignedPostPayload.data, file.value);
  console.log({ upload, preSignedPostPayload });

  return { status: upload.status, preSignedPostPayload };
};

/**
 * function to create file in webiny dashboard
 */
const createFile = async ({ name, key, type, size, tags }) => {
  console.log({ name, key, type, size, tags });

  const res = await (
    await fetch("api/createFile", {
      ...headers,
      body: JSON.stringify({ name, key, type, size, tags }),
    })
  ).json();

  console.log({ res });

  return res.fileManager.createFile.data;
};

/**
 * function create photo entry
 */
const createPhoto = async ({ caption, url, authorId }) => {
  let photoData = { caption, url, authorId };
  console.log({ photoData });
  const res = await (
    await fetch("/api/createPhoto", {
      ...headers,
      body: JSON.stringify(photoData),
    })
  ).json();

  return res;
};

/**
 * function to check if author exists
 */
const checkAuthor = async () => {
  isLoading.value = true;
  setToastState({
    message: `Checking for @${username.value}`,
  });

  try {
    const res = await (
      await fetch(`api/getAuthorByUsername?username=${username.value}`)
    ).json();
    console.log({ res });

    if (!res.data?.id) throw Error("No author found");

    userId.value = res.data.id;
    name.value = res.data.name;
    authorExists.value = true;

    isLoading.value = false;
    setToastState({
      message: `✅ Found author for @${username.value}`,
      code: "success",
    });

    console.log({ res });
    return res.data;
  } catch (error) {
    console.log({ error });
    authorExists.value = false;

    setToastState({
      message: `No author found for @${username.value}. 
          You can proceed to upload and a new author will be created`,
      code: "error",
    });

    isLoading.value = false;

    return null;
  }
};

/**
 * function to create author
 */
const createAuthor = async (userData) => {
  let { username, name } = userData;

  const res = await (
    await fetch("api/createAuthor", {
      ...headers,
      body: JSON.stringify({ username, name }),
    })
  ).json();

  console.log({ res });

  return res;
};

/**
 * function to handle form submit action
 * @param {Event} e Form event
 */
const handlePhotoSubmit = async (e) => {
  e.preventDefault();

  // check if author with current username exists
  let author = await checkAuthor();
  console.log({ author });

  // activate loading state
  isLoading.value = true;

  // confirm whether to proceed with selected user name
  if (authorExists.value) {
    let confirmUsername = confirm(
      `The username @${username.value} is taken. Is ${name.value} the author of this image?`
    );

    // cancel process if user does not confirm to proceed
    if (!confirmUsername) return null;
  } else {
    // confirm new user creation
    let confirmUsername = confirm(
      `A new user for the username @${username.value} will be created for this photo. Is ${name.value} the author of this image?`
    );

    // cancel process if user does not confirm to proceed
    if (!confirmUsername) return null;

    // update toast state
    setToastState({
      message: `Creating new author for @${username.value}`,
    });

    // set local author state value to newly created author
    author = await createAuthor({
      username: username.value,
      name: name.value,
    });

    console.log({ author });

    // update toast state
    setToastState({
      message: `Author for @${username.value} created successfully`,
      code: "success",
    });
  }

  // get selected file details
  let { name: fileName, type, size } = file.value;
  console.log({ fileName, type, size });

  try {
    // update toast state
    setToastState({
      message: `Uploading file to storage...`,
    });

    // start upload file processes
    // rename destructured values returned by `uploadFile` in order to aviod name conflicts
    const {
      status,
      preSignedPostPayload: {
        file: { key, name: _name, size: _size, type: _type },
      },
    } = await uploadFile({ name: fileName, type, size });

    console.log({ key, _name, _size, _type });

    // throw error if uploadFile status does not return 204 code
    if (status == !204) {
      throw Error("Unable upload. An error occured");
    }

    // update toast state
    setToastState({
      message: `File uploaded successfully!`,
      code: "success",
    });

    // update toast state
    setToastState({
      message: `Adding file to dashboard...`,
    });

    // create file in webiny dashboard
    const file = await createFile({
      key,
      name: _name,
      size: _size,
      type: _type,
    });
    console.log({ file });
    console.log({ username, name, caption });

    // update toast state
    setToastState({
      message: `File added successfully!`,
      code: "success",
    });

    console.log({ caption: caption.value, url: file.src, authorId: author.id });

    // update toast state
    setToastState({
      message: `Creating photo entry...`,
    });

    // create photo entry
    const photo = await createPhoto({
      caption: caption.value,
      url: file.src,
      authorId: author.id,
    });

    console.log({ photo });

    // save final data to state
    data.value = photo;

    console.log({ data });

    // update toast state
    setToastState({
      message: `Photo created successfully!`,
      code: "success",
    });

    // reset form state
    resetForm(e);
  } catch (error) {
    console.log({ error });

    // set data to null
    data.value = null;
    error.value = error;

    // update toast state with error
    setToastState({
      message: `An error occured: ${error}`,
      code: "error",
    });
  }

  // end loading state
  isLoading.value = false;
};
</script>

<template>
  <section class="upload-section">
    <header class="upload-header">
      <slot name="header">
        <h1>Upload a photo</h1>
      </slot>
    </header>

    <!-- Preview the image file with the URL provided -->
    <div class="file-preview">
      <div v-if="file" class="img-cont">
        <img :src="file.url" alt="" />
      </div>
    </div>

    <!-- Form container -->
    <div class="upload-cont">
      <form @submit="handlePhotoSubmit" id="upload-form" class="form">
        <div class="wrapper">
          <div class="form-section form-control upload">
            <input
              @change="handleFileSelect"
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              required
            />
          </div>
          <div class="form-section">
            <div class="form-control">
              <label for="caption">Caption</label>
              <input
                id="caption"
                name="caption"
                type="text"
                class="form-input"
                required
                v-model="caption"
                :disabled="isLoading"
              />
            </div>

            <div class="form-group">
              <div class="form-control">
                <label for="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="form-input"
                  required
                  v-model="username"
                  @change="authorExists = false"
                  :disabled="isLoading"
                />
              </div>
              <div class="form-control">
                <label for="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  class="form-input"
                  required
                  :value="name"
                  @change="(e) => !authorExists && (name = e.target.value)"
                  :disabled="isLoading || authorExists"
                />
              </div>
              <div class="action-cont check-user">
                <button
                  @click="checkAuthor"
                  :class="{ valid: authorExists }"
                  class="cta alt"
                  type="button"
                  :disabled="authorExists"
                >
                  {{ isLoading ? "..." : authorExists ? "✅" : "🔍" }}
                </button>
              </div>
            </div>
          </div>
          <div class="action-cont">
            <button type="submit" class="cta" :disabled="isLoading">
              {{
                isLoading
                  ? "..."
                  : authorExists
                  ? "Upload"
                  : "Upload as new Author"
              }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
