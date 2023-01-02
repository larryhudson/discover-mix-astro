<script setup>

import { onMounted, watchEffect, ref, computed } from "vue";

const props = defineProps({
    genreName: String
})

const {genreName} = props;

const chosenGenres = ref([]);

onMounted(() => {
    function getInitialGenres() {
        try {
            const jsonString = window.localStorage.getItem('chosen-genres-json')
            return JSON.parse(jsonString) || []
        }
        catch (err) {
            return []
        }
    }

    chosenGenres.value = getInitialGenres()
})

const isChoosing = computed(() => chosenGenres.value.includes(genreName))

function toggleGenre() {
    if (isChoosing.value === true) {
        console.log("removing")
        chosenGenres.value = chosenGenres.value.filter(g => g !== genreName)        
    } else {
        console.log("adding to chosen genres")
        chosenGenres.value.push(genreName)
    }
    window.localStorage.setItem('chosen-genres-json', JSON.stringify(chosenGenres.value))
}

</script>

<template>
    <button class="button button-generous primary-highlight-subtle" @click="toggleGenre">
        <span v-if="isChoosing">
          remove <strong v-text="genreName"></strong> from your mix
        </span>
        <span v-else>
            add <strong v-text="genreName"></strong> to your mix
        </span>
    </button>
</template>