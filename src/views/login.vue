<template>
  <div class="form-login">
    <div class="login-header">
      <div class="title">{{ title }}</div>
      <div style="font-weight: bold">Faça seu Login</div>
    </div>
    <q-input
      filled
      rounded
      v-model="login"
      label="Login *"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Digite o login']"
    ></q-input>
    <q-input
      filled
      rounded
      type="password"
      v-model="password"
      label="Senha *"
      lazy-rules
      :rules="[(val) => (val !== null && val !== '') || 'Digite a senha']"
    ></q-input>
    <q-toggle v-model="remember" label="Lembrar senha"></q-toggle>
    <div class="botoes">
      <q-btn label="Entrar" rounded color="green" @click="onLogin()" />
      <q-btn
        label="Limpar"
        rounded
        color="primary"
        flat
        @click="(login = ''), (password = '')"
      />
    </div>
  </div>
</template>

<script>
import api from "../api";

export default {
  name: "AppLogin",
  data() {
    return {
      title: "Agenda Pessoal",
      login: "",
      password: "",
      remember: false,
    };
  },
  created() {
    if (localStorage.resultLogin || sessionStorage.resultLogin) {
      this.$router.push("/MenuAcessos");
    }
  },
  methods: {
    async onLogin() {
      let resultado = await api.Autenticacao(this.password, this.login);
      this.remember
        ? (localStorage.resultLogin = JSON.stringify(resultado))
        : (sessionStorage.resultLogin = JSON.stringify(resultado));
      if (resultado.accessToken) {
        this.$q.notify({
          message: "Login feito com sucesso !",
          color: "positive",
          icon: "check",
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
        this.$router.push("/MenuAcessos");
        localStorage.password = this.password;
        sessionStorage.password = this.password;
        return true;
      } else {
        this.$q.notify({
          message: "Login ou senha incorretos !",
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
        return false;
      }
    },
  },
};
</script>

<style scoped>
.form-login {
  background-color: skyblue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 80px;
  border-radius: 10%;
  border: 2px solid black;
}
.login-header {
  text-align: center;
  margin-bottom: 40px;
}
.title {
  color: rgb(44, 44, 44);
  font-weight: bold;
  font-size: 30px;
  margin: 0;
}
.botoes {
  margin: 1% 5%;
}
</style>
