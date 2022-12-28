<template>
  <div class="titulo">Menu de acessos</div>
  <div class="row">
    <q-card class="my-card col">
      <q-img src="https://cdn-icons-png.flaticon.com/512/2641/2641242.png">
      </q-img>
      <q-card-section
        @click="onClickCard('home')"
        class="bg-positive text-white"
        style="cursor: pointer"
      >
        <div class="text-h6">Home</div>
        <div class="text-subtitle2">{{ text }}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card col">
      <q-img src="https://cdn-icons-png.flaticon.com/512/753/753210.png">
      </q-img>
      <q-card-section
        @click="onClickCard('cadastro')"
        class="bg-secondary text-white"
        style="cursor: pointer"
      >
        <div class="text-h6">Meu Cadastro</div>
        <div class="text-subtitle2">{{ text }}</div>
      </q-card-section>
    </q-card>
    <q-card v-if="typeUser == 'ROLE_ADMIN'" class="my-card col">
      <q-img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">
      </q-img>
      <q-card-section
        @click="onClickCard('usuarios')"
        class="bg-accent text-white"
        style="cursor: pointer"
      >
        <div class="text-h6">Usuários</div>
        <div class="text-subtitle2">{{ text }}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card col">
      <q-img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png">
      </q-img>
      <q-card-section
        @click="onClickCard('pessoas')"
        class="bg-indigo text-white"
        style="cursor: pointer"
      >
        <div class="text-h6">Pessoas</div>
        <div class="text-subtitle2">{{ text }}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card col">
      <q-img src="https://cdn-icons-png.flaticon.com/512/2098/2098298.png">
      </q-img>
      <q-card-section
        @click="onClickCard('contatos')"
        class="bg-orange text-white"
        style="cursor: pointer"
      >
        <div class="text-h6">Contatos</div>
        <div class="text-subtitle2">{{ text }}</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card col">
      <q-img src="https://cdn-icons-png.flaticon.com/512/9204/9204165.png">
      </q-img>
      <q-card-section
        @click="onClickCard('logout')"
        class="bg-negative text-white"
        style="cursor: pointer"
      >
        <div class="text-h6">Logout</div>
        <div class="text-subtitle2">{{ text }}</div>
      </q-card-section>
    </q-card>
  </div>
  <div class="titulo">Selecione uma opção para continuar</div>
  <q-img
    src="../assets/escrevendo.gif"
    alt="Iagem"
    style="
      display: flex;
      justify-content: center;
      height: 200px;
      max-width: 200px;
    "
  ></q-img>
</template>

<script>
export default {
  name: "MenuAcessos",
  data() {
    return {
      text: "Clique para acessar",
      typeUser: "",
    };
  },
  created() {
    this.typeUser = JSON.parse(sessionStorage.resultLogin).tipos[0];
  },
  methods: {
    onClickCard(e) {
      if (e !== "logout") {
        this.$router.push(`/${e}`);
      } else {
        //LogOut
        localStorage.resultLogin = undefined;
        sessionStorage.resultLogin = undefined;
        this.$router.push(`/login`);
        this.$q.notify({
          message: "LogOut feito com sucesso!",
          color: "negative",
          icon: "close",
          actions: [
            {
              label: "Fechar",
              color: "white",
              handler: () => {
                /* ... */
              },
            },
          ],
        });
      }
    },
  },
};
</script>

<style scoped>
.my-card {
  max-width: 13vw;
  margin: 2vw;
}
.titulo {
  display: flex;
  margin: 0.5vw;
  font-weight: bold;
  font-size: x-large;
  justify-content: center;
}
</style>
