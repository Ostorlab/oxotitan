<template>
  <v-footer
    class="footer py-3"
  >
    <v-row
      align="center"
      no-gutters
    >
      <v-col
        cols="12"
        class="d-flex align-center text-left mb-2"
      >
        <v-btn
          icon="mdi-github"
          density="compact"
          variant="text"
          color="black"
          href="https://github.com/Ostorlab/oxo"
          target="blank"
          aria-label="OXO GitHub Repository"
          class="mr-2"
        />
        <v-btn
          icon="mdi-notebook-outline"
          density="compact"
          variant="text"
          color="black"
          href="https://oxo.ostorlab.co/docs"
          target="blank"
          aria-label="OXO Documentation Website"
        />
      </v-col>
      <v-col
        cols="12"
        class="text-left"
      >
        Made by Ostorlab with ❤️
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped lang="scss">
.footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #F5F5F5;
    font-size: 13px !important;
    color: #474747;

    &-link {
        color: inherit !important;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
