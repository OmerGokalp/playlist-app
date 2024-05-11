<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Song</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song Title" required v-model="title" />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import useDocument from "../composables/useDocument";
import { useStore } from "vuex";

export default {
  props: ["playlist"],
  setup(props) {
    const state = reactive({
      title: "",
      artist: "",
      showForm: false,
    });

    const { updateDoc } = useDocument("playlists", props.playlist.id);
    const store = useStore();

    const handleSubmit = async () => {
      const matchedSongs = await getSongByTitle(state.title);
      const [matchedSong] = matchedSongs.data.results.trackmatches.track;

      const newSong = {
        title: matchedSong.name,
        artist: matchedSong.artist,
        id: matchedSong.mbid,
        cover: matchedSong.image[2]["#text"],
      };
      await updateDoc({
        songs: [...props.playlist.songs, newSong],
      });
      state.title = "";
    };

    const getSongByTitle = async (title) => {
      return await store.dispatch("fetchSongByTitle", title);
    };

    return { ...toRefs(state), handleSubmit };
  },
};
</script>

<style>
.add-song {
  text-align: center;  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
