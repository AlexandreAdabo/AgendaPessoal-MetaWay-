<template>
  <div class="titulo">Contatos</div>
  <BtnVoltar />
  <q-dialog v-model="FormNewContact" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white"></q-avatar>
        <span class="q-ml-sm" style="font-weight: bold"
          >Formulário de Novo Contato</span
        >
      </q-card-section>

      <q-card-section class="row items-center">
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
          <q-input class="col margin_input" v-model="tag" label="Tag">
            <template v-slot:prepend>
              <q-icon name="bookmark"></q-icon>
            </template>
          </q-input>
          <q-input
            class="col margin_input"
            v-model="telefone"
            mask="(##)#####-####"
            label="Telefone"
          >
            <template v-slot:prepend>
              <q-icon name="call"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <q-input
            class="col margin_input"
            mask="###.###.###-##"
            v-model="cpf"
            label="CPF"
          >
            <template v-slot:prepend>
              <q-icon name="list"></q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions align="right">
        <q-btn
          rounded
          label="Salvar"
          color="green"
          @click="onSaveNewContact"
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
    title="Lista de Contatos"
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
        Lista de Contatos
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

export default {
  name: "AppContatos",
  data() {
    return {
      filter: "",
      loading: false,
      FormNewContact: false,
      row_selected: [],
      columns: [
        {
          name: "nome",
          required: true,
          label: "Nome",
          align: "center",
          field: (row) => row.pessoa.nome,
          sortable: true,
        },
        {
          name: "email",
          label: "E-mail",
          field: "email",
          align: "center",
          sortable: true,
        },
        { name: "tag", label: "Tag", field: "tag", sortable: true },
        {
          name: "cpf",
          label: "CPF",
          align: "center",
          field: (row) => row.pessoa.cpf,
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
      email: "",
      tag: "",
      cpf: "",
      telefone: "",
    };
  },
  components: {
    BtnVoltar,
  },
  async created() {
    let contatos = await api.ContatosList();
    contatos.map((e, index) => {
      contatos[index].delete = false;
    });
    this.rows = contatos;
  },
  methods: {
    Voltar() {
      this.$router.push("/MenuAcessos");
    },
    async addRow() {
      this.loading = true;
      //Envia a API
      this.nome = "";
      this.email = "";
      this.tag = "";
      this.cpf = "";
      this.telefone = "";
      this.FormNewContact = true;
      this.loading = false;
    },
    async onSaveNewContact() {
      //Envia a API
      let contato_obj = {
        email: this.email,
        id: parseFloat(this.rows.length),
        pessoa: {
          cpf: this.cpf,
          endereco: {
            bairro: "",
            cep: "",
            cidade: "",
            estado: "",
            id: parseFloat(this.rows.length),
            logradouro: "",
            numero: 0,
            pais: "",
          },
          foto: {
            id: "",
            name: "",
            type: "",
          },
          id: parseFloat(this.rows.length),
          nome: this.nome,
        },
        privado: true,
        tag: this.tag,
        telefone: this.telefone,
        tipoContato: "CELULAR",
        usuario: {
          cpf: "380.854.570-40",
          dataNascimento: "1986-12-03",
          email: "suporte@metaway.com.br",
          id: 1,
          nome: "Administrador",
          password: "12345678",
          telefone: "(54)30552-577",
          username: "admin",
        },
      };
      let insertContact = await api.ContatosInsert(contato_obj);
      this.$q.notify({
        message: insertContact.message || "Não foi possível inserir o contato",
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
    onRowClick() {},
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
