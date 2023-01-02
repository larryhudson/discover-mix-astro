<script setup>
import { ref, watchEffect } from "vue";

let chosenTypes = ref([]);

watchEffect(() => {
  try {
    const jsonString = window.localStorage.getItem("chosen-types-json") || "[]";
    chosenTypes.value = JSON.parse(jsonString);
  } catch (err) {}
});

const playlistTypes = [
  {
    name: "Sound",
    description: "Songs new and old that define the genre",
  },
  {
    name: "Intro",
    description: "An attempt at an introduction to the genre",
  },
  {
    name: "Pulse",
    description: "What fans of the genre are listening to now",
  },
  {
    name: "Edge",
    description:
      "Recently released music that fans of the genre are checking out",
  },
  {
    name: "♀Filter",
    description:
      "An attempt to find music in the genre made wholly or partly by women",
  },
  {
    name: "2022",
    description: "Music from the genre that came out in 2022",
  },
];

function isChoosing(playlistTypeName) {
  return chosenTypes.value.includes(playlistTypeName);
}

function updateLocalStorage() {
  window.localStorage.setItem(
    "chosen-types-json",
    JSON.stringify(chosenTypes.value)
  );
}

function toggleType(playlistTypeName) {
  if (isChoosing(playlistTypeName)) {
    chosenTypes.value = chosenTypes.value.filter(
      (type) => type !== playlistTypeName
    );
  } else {
    chosenTypes.value.push(playlistTypeName);
  }
  updateLocalStorage();
}
</script>

<template>
  <div class="playlist-types">
    <label
      v-for="playlistType in playlistTypes"
      v-bind:key="playlistType.name"
      :class="{ chosen: isChoosing(playlistType.name) }"
    >
      <p>
        <input
          type="checkbox"
          @change="toggleType(playlistType.name)"
          :checked="isChoosing(playlistType.name)"
        />
        <strong>{{ playlistType.name }}</strong>
        &ndash; {{ playlistType.description }}
      </p>
    </label>
  </div>
</template>