<template>
  <v-footer
    app
    class="footer py-3"
  >
    <v-row align="center">
      <v-col
        cols="12"
        md="5"
        class="text-center text-md-left"
      >
        <v-icon size="x-small">
          mdi-copyright
        </v-icon>
        <code>{{ new Date().getFullYear() }} Ostorlab. All Rights Reserved.</code>
      </v-col>
      <v-col
        cols="12"
        md="5"
        class="text-center text-md-left"
      >
        <NuxtLink
          href="https://oxo.ostorlab.co/"
          target="_blank"
          class="footer-link d-block d-md-inline"
        >
          <code class="mr-2">Documentation</code>
        </NuxtLink>
        <span class="d-none d-md-inline">•</span>
        <NuxtLink
          href="https://docs.ostorlab.co/terms/"
          target="_blank"
          class="footer-link d-block d-md-inline mt-2 mt-md-0"
        >
          <code class="mx-2">Terms & Conditions</code>
        </NuxtLink>
        <span class="d-none d-md-inline">•</span>
        <NuxtLink
          href="https://docs.ostorlab.co/privacy/"
          target="_blank"
          class="footer-link ml-2 mt-2 mt-md-0 d-block d-md-inline"
        >
          <code>Privacy Policy</code>
        </NuxtLink>
      </v-col>
      <v-col
        cols="12"
        md="auto"
        align-self="end"
        class="ml-auto text-center"
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
          icon="mdi-web"
          density="compact"
          variant="text"
          color="black"
          href="https://oxo.ostorlab.co/docs"
          target="blank"
          aria-label="OXO Documentation Website"
        />
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped lang="scss">
.footer {
    background: #F5F5F5;
    font-size: 14px;
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
