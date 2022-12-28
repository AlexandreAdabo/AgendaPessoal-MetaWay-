<template>
  <div class="titulo">Pessoas</div>
  <BtnVoltar />
  <q-table
    class="botoes"
    card-class="bg-grey-4 text-black"
    dense
    bordered
    virtual-scroll
    title="Lista de Pessoas"
    :rows="rows"
    :columns="columns"
    :filter="filter"
    :loading="loading"
    selection="single"
    v-model:selected="row_selected"
    @row-click="onRowClick($event, rows)"
    no-data-label="Não existem pessoas cadastradas"
    no-results-label="Não encontramos resultados"
    row-key="id"
  >
    <template v-slot:top>
      <div class="botoes" style="font-weight: bold; font-size: larger">
        Lista de Pessoas
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
  name: "AppPessoas",
  data() {
    return {
      filter: "",
      loading: false,
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
          name: "miniatura",
          align: "center",
          label: "Foto",
          field: (row) => row.foto,
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
          name: "logradouro",
          label: "Logradouro",
          field: (row) => row.endereco.logradouro,
          sortable: true,
        },
        {
          name: "numero",
          label: "Número",
          field: (row) => row.endereco.numero,
          sortable: true,
        },
        {
          name: "bairro",
          label: "Bairro",
          field: (row) => row.endereco.bairro,
          sortable: true,
        },
        {
          name: "cidade",
          label: "Cidade",
          field: (row) => row.endereco.cidade,
          sortable: true,
        },
        {
          name: "CEP",
          label: "CEP",
          field: (row) => row.endereco.cep,
          sortable: true,
        },
        {
          name: "estado",
          label: "Estado",
          field: (row) => row.endereco.estado,
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
    };
  },
  components: {
    BtnVoltar,
  },
  async created() {
    let pessoas = await api.PessoaPesquisar();
    pessoas.map((e, index) => {
      pessoas[index].delete = false;
    });
    this.rows = pessoas;
  },
  methods: {
    Voltar() {
      this.$router.push("/MenuAcessos");
    },
    async addRow() {
      this.loading = true;
      //Envia a API
      let contato_vazio = {
        id: this.rows.length,
        pessoa: {
          id: this.rows.length,
          nome: "",
          cpf: "",
          endereco: {
            id: 1,
            logradouro: "",
            numero: 752,
            cep: "",
            bairro: "",
            cidade: "",
            estado: "",
            pais: "",
          },
          foto: {
            id: "eb8f1718-50ef-41dd-ab4a-0f3e2292b196",
            name: "foto.png",
            type: "image/png",
          },
        },
        tag: "",
        email: null,
        telefone: "",
        tipoContato: "",
        privado: false,
        usuario: {
          id: 1,
          nome: "Administrador",
          dataNascimento: "1986-12-03",
          cpf: "380.854.570-40",
          email: "suporte@metaway.com.br",
          telefone: "(54) 3055-2577",
          username: "admin",
          password:
            "$2a$10$nFezmH.OppxvpqlroxkP9uERtLWbNyJiRKO/ronjn0AnFEZhqoKLu",
        },
      };
      let insertContact = await api.ContatosInsert(contato_vazio);
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
</style>
