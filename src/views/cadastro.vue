<template>
  <div class="titulo">Meu cadastro</div>
  <BtnVoltar />
  <!--Formulário para alterar os dados cadastrais do usuário logado. Deve permitir alterar todos os dados cadastrais, exceto o tipo de usuário.  -->
  <div class="margin_input borda-bloco shadow-2">
    <div class="row">
      <q-input class="col margin_input" v-model="login" label="Login">
        <template v-slot:prepend>
          <q-icon name="login"></q-icon>
        </template>
      </q-input>
      <q-input
        class="col margin_input"
        v-model="senha"
        type="password"
        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$"
        label="Senha"
        hint="A senha deve ter pelo menos 8 caracteres, com letras e números"
      >
        <template v-slot:prepend>
          <q-icon name="password"></q-icon>
        </template>
      </q-input>
      <q-input
        class="col margin_input"
        mask="###.###.###-##"
        v-model="cpf"
        label="CPF"
      >
        <template v-slot:prepend>
          <q-icon name="face"></q-icon>
        </template>
      </q-input>
    </div>
    <div class="row">
      <q-input
        class="col margin_input"
        v-model="dt_nascimento"
        mask="##/##/####"
        label="Data de Nascimento"
      >
        <template v-slot:prepend>
          <q-icon name="event"></q-icon>
        </template>
      </q-input>
      <q-input
        class="col margin_input"
        type="email"
        v-model="email"
        label="E-mail"
      >
        <template v-slot:prepend>
          <q-icon name="email"></q-icon>
        </template>
      </q-input>
      <q-input
        class="col margin_input"
        mask="(##)#####-####"
        v-model="telefone"
        label="Telefone"
      >
        <template v-slot:prepend>
          <q-icon name="smartphone"></q-icon>
        </template>
      </q-input>
    </div>
    <div class="row">
      <q-input class="col margin_input" v-model="username" label="Username">
        <template v-slot:prepend>
          <q-icon name="person"></q-icon>
        </template>
      </q-input>
    </div>
    <q-btn
      label="Salvar"
      class="margin_input"
      rounded
      color="green"
      @click="onSave()"
    />
  </div>
</template>

<script>
import BtnVoltar from "@/components/BtnVoltar.vue";
import api from "../api";
import functionJS from "../function";

export default {
  name: "AppCadastro",
  data() {
    return {
      login: "",
      senha: "",
      cpf: "",
      dt_nascimento: "",
      email: "",
      telefone: "",
      username: "",
    };
  },
  components: {
    BtnVoltar,
  },
  async created() {
    let UsuarioLogado = await api.UsuarioGet(
      JSON.parse(sessionStorage.resultLogin).id,
    );
    this.login = UsuarioLogado.object.usuario.nome;
    this.senha = sessionStorage.password;
    this.cpf = UsuarioLogado.object.usuario.cpf;
    this.dt_nascimento = await functionJS.formataData(
      UsuarioLogado.object.usuario.dataNascimento,
    );
    this.email = UsuarioLogado.object.usuario.email;
    this.telefone = UsuarioLogado.object.usuario.telefone;
    this.username = UsuarioLogado.object.usuario.username;
  },
  methods: {
    async onSave() {
      //Validações
      if (this.senha.length < 7) {
        this.$q.notify({
          message: "A senha deve ter no mínimo 8 dígitos",
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
        return;
      }
      var validacaoSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[0-9]).{8,20}$/;
      var resultadoValidacao = validacaoSenha.test(this.senha);
      if (!resultadoValidacao) {
        this.$q.notify({
          message: "A senha deve ter no mínimo uma letra e um número",
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
        return;
      }
      if (this.cpf.length != 14) {
        this.$q.notify({
          message: "O CPF não foi digitado completamente",
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
        return;
      }
      if (this.telefone.length != 14) {
        this.$q.notify({
          message: "O Telefone não foi digitado completamente",
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
        return;
      }
      if (!this.email.includes("@")) {
        this.$q.notify({
          message: "O E-mail não foi digitado corretamente",
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
        return;
      }
      var dia = this.dt_nascimento.substring(0, 2);
      var mes = this.dt_nascimento.substring(3, 5);
      var ano = this.dt_nascimento.substring(6, 10);
      if (dia > 31) {
        this.$q.notify({
          message: "O dia digitado é inválido",
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
        return;
      }
      if (mes > 12) {
        this.$q.notify({
          message: "O Mês digitado é inválido",
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
        return;
      }
      if (ano < 1900) {
        this.$q.notify({
          message: "O Ano digitado é inválido",
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
        return;
      }
      //PUT da API
      let objeto_usuario = {
        cpf: this.cpf,
        dataNascimento: this.dt_nascimento,
        email: this.email,
        id: JSON.parse(sessionStorage.resultLogin).id,
        nome: this.login,
        password: this.senha,
        telefone: this.telefone,
        username: this.username,
      };
      let UsuarioAtt = await api.UsuarioAtualizar(objeto_usuario);
      this.$q.notify({
        message: UsuarioAtt.message || "Não foi possível atualizar o Usuário",
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
    },
  },
};
</script>

<style scoped>
.titulo {
  display: flex;
  margin: 0.5vw;
  font-weight: bold;
  font-size: x-large;
  justify-content: center;
}
.margin_input {
  margin: 1% 1%;
}
.borda-bloco {
  border: solid 1px #000;
  border-radius: 10px;
}
</style>
