<template>
  <div class="titulo">Usuários</div>
  <BtnVoltar />
  <q-dialog v-model="rowEdit" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white"></q-avatar>
        <span class="q-ml-sm" style="font-weight: bold">Editar Usuário</span>
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="row">
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
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="nome" label="Nome">
            <template v-slot:prepend>
              <q-icon name="person"></q-icon>
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
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="username" label="Username">
            <template v-slot:prepend>
              <q-icon name="person"></q-icon>
            </template>
          </q-input>
          <q-input
            class="col margin_input"
            v-model="senha"
            type="password"
            label="Senha"
            hint="A senha deve ter pelo menos 8 caracteres, com letras e números"
          >
            <template v-slot:prepend>
              <q-icon name="password"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
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
          <q-toggle
            class="col margin_input"
            v-model="ic_admin"
            true-value="ROLE_ADMIN"
            false-value="ROLE_USER"
            label="Administrador"
          />
        </div>
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions align="right">
        <q-btn
          rounded
          label="Salvar"
          color="green"
          @click="onSaveNewUser"
        ></q-btn>
        <q-btn rounded label="Cancelar" color="negative" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="FormNewUser" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white"></q-avatar>
        <span class="q-ml-sm" style="font-weight: bold"
          >Formulário de Novo Usuário</span
        >
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="row">
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
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="nome" label="Nome">
            <template v-slot:prepend>
              <q-icon name="person"></q-icon>
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
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="username" label="Username">
            <template v-slot:prepend>
              <q-icon name="person"></q-icon>
            </template>
          </q-input>
          <q-input
            class="col margin_input"
            v-model="senha"
            type="password"
            label="Senha"
            hint="A senha deve ter pelo menos 8 caracteres, com letras e números"
          >
            <template v-slot:prepend>
              <q-icon name="password"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
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
          <q-toggle
            class="col margin_input"
            v-model="ic_admin"
            true-value="ROLE_ADMIN"
            false-value="ROLE_USER"
            label="Administrador"
          />
        </div>
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions align="right">
        <q-btn
          rounded
          label="Salvar"
          color="green"
          @click="onSaveNewUser"
        ></q-btn>
        <q-btn rounded label="Cancelar" color="negative" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-table
    class="botoes"
    card-class="bg-grey-4 text-black"
    dense
    bordered
    virtual-scroll
    title="Lista de Usuários"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :loading="loading"
    selection="single"
    v-model:selected="row_selected"
    @row-click="onRowClick($event, rows)"
    no-data-label="Não existem contatos cadastrados"
    no-results-label="Não encontramos resultados"
    row-key="id"
  >
    <template v-slot:top>
      <div class="botoes" style="font-weight: bold; font-size: larger">
        Lista de Usuários
      </div>
      <q-btn
        round
        icon="add"
        color="green"
        :disable="loading"
        @click="addRow"
      ></q-btn>
      <q-space></q-space>
      <q-input
        borderless
        dense
        debounce="300"
        color="primary"
        label="Pesquisar"
        v-model="filter"
        @blur="onFilter(filter)"
      >
        <template v-slot:append>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary"></q-inner-loading>
    </template>
    <template v-slot:body-cell-deletar="props">
      <q-td :props="props">
        <div>
          <q-checkbox
            v-model="props.row.delete"
            @update:model-value="DeleteRow(props.row.id)"
            checked-icon="delete"
            unchecked-icon="delete_border"
            indeterminate-icon="delete"
            color="negative"
          />
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import BtnVoltar from "@/components/BtnVoltar.vue";
import api from "../api";
import functionJS from "../function";

export default {
  name: "AppUsuarios",
  data() {
    return {
      filter: "",
      loading: false,
      FormNewUser: false,
      rowEdit: false,
      row_selected: [],
      columns: [
        {
          name: "nome",
          required: true,
          label: "Nome",
          align: "center",
          field: (row) => row.nome,
          sortable: true,
        },
        {
          name: "email",
          label: "E-mail",
          field: "email",
          align: "center",
          sortable: true,
        },
        {
          name: "dataNascimento",
          label: "Data de Nascimento",
          field: "dataNascimento",
          sortable: true,
        },
        {
          name: "cpf",
          label: "CPF",
          align: "center",
          field: (row) => row.cpf,
          sortable: true,
        },
        {
          name: "telefone",
          label: "Telefone",
          field: "telefone",
          sortable: true,
        },
        {
          name: "deletar",
          label: "Deletar",
          field: "deletar",
          sortable: true,
        },
      ],
      rows: [],
      nome: "",
      senha: "",
      cpf: "",
      dt_nascimento: "",
      email: "",
      telefone: "",
      username: "",
      ic_admin: "ROLE_USER",
    };
  },
  components: {
    BtnVoltar,
  },
  async created() {
    let usuarios = await api.UsuarioList();
    usuarios.map((e, index) => {
      usuarios[index].delete = false;
    });
    this.rows = usuarios;
  },
  methods: {
    Voltar() {
      this.$router.push("/MenuAcessos");
    },
    async onSaveNewUser() {
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
      this.dt_nascimento = await functionJS.formataDataAPI(this.dt_nascimento);
      let newUser = {
        tipos: [this.ic_admin],
        usuario: {
          cpf: this.cpf,
          dataNascimento: this.dt_nascimento,
          email: this.email,
          id: this.rows.length,
          nome: this.nome,
          password: this.senha,
          telefone: this.telefone,
          username: this.username,
        },
      };
      let insertUser = await api.UsuarioInsert(newUser);
      this.$q.notify({
        message: insertUser.message || "Não foi possível inserir o Usuário",
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
      this.FormNewUser = false;
    },
    async addRow() {
      this.loading = true;
      //Envia a API
      this.nome = "";
      this.senha = "";
      this.cpf = "";
      this.dt_nascimento = "";
      this.email = "";
      this.telefone = "";
      this.username = "";
      this.FormNewUser = true;
      this.loading = false;
    },
    async DeleteRow(e) {
      this.loading = true;
      //Envia a API
      let deleteContact = await api.ContatosDelete(e);
      this.$q.notify({
        message: deleteContact.message || "Contato deletado",
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
      this.loading = false;
    },
    async onFilter() {
      let filtrado = await api.ContatosSearch(this.filter);
      this.rows = filtrado;
    },
    async onRowClick() {
      if (JSON.parse(JSON.stringify(this.row_selected)).length > 0) {
        this.nome = JSON.parse(JSON.stringify(this.row_selected))[0].nome;
        this.email = JSON.parse(JSON.stringify(this.row_selected))[0].email;
        this.cpf = JSON.parse(JSON.stringify(this.row_selected))[0].cpf;
        this.dt_nascimento = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].dataNascimento;
        this.dt_nascimento = await functionJS.formataData(this.dt_nascimento);
        this.telefone = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].telefone;
        this.rowEdit = true;
      }
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
.botoes {
  margin: 1% 1%;
}
.margin_input {
  margin: 1% 1%;
}
</style>
