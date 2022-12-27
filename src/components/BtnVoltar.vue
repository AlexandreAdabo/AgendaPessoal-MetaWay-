<template>
  <q-btn
    class="botoes"
    @click="Voltar()"
    round
    color="primary"
    icon="keyboard_return"
    ><q-tooltip class="bg-primary">Voltar</q-tooltip></q-btn
  >
</template>

<script>
export default {
  name: "BtnVoltar",
  methods: {
    Voltar() {
      this.$router.push("/MenuAcessos");
    },
  },
};
</script>

<style scoped>
.botoes {
  margin: 1% 1%;
}
</style>
