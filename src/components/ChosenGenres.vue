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

function isChoosing(genreName) {
    return chosenGenres.value.includes(genreName)
}

function toggleGenre(genreName) {
    if (isChoosing(genreName) === true) {
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

    <ul class="genres" v-if="chosenGenres.length > 0">
        <li class="primary-highlight-subtle" v-bind:key="genre" v-for="genre in chosenGenres">

            <a :href="`/app/genre/${encodeURIComponent(genre)}/`" class="no-underline">
                <span class="genre-name">{{genre}} &rarr;</span>
            </a>
            <button class="toggle-button" @click="toggleGenre(genre)">
                <span>
                    × remove
                </span>
            </button>
        </li>
    </ul>
    <p v-else>
        You haven't chosen any genres yet.
    </p>
</template>