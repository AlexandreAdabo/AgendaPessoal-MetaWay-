<template>
  <div class="titulo">Pessoas</div>
  <BtnVoltar />
  <q-dialog v-model="FormNewPerson" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white"></q-avatar>
        <span class="q-ml-sm" style="font-weight: bold"
          >Formulário de Nova Pessoa</span
        >
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="row">
          <q-input class="col margin_input" v-model="nome" label="Nome">
            <template v-slot:prepend>
              <q-icon name="person"></q-icon>
            </template>
          </q-input>

          <q-file class="col margin_input" v-model="foto" label="Foto">
            <template v-slot:prepend>
              <q-icon name="image"></q-icon>
            </template>
          </q-file>
        </div>
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
            v-model="logradouro"
            label="Logradouro"
          >
            <template v-slot:prepend>
              <q-icon name="house"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <q-input
            class="col margin_input"
            v-model="numero"
            type="number"
            label="Número"
          >
            <template v-slot:prepend>
              <q-icon name="pin"></q-icon>
            </template>
          </q-input>
          <q-input class="col margin_input" v-model="bairro" label="Bairro">
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="cidade" label="Cidade">
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
            </template>
          </q-input>
          <q-input
            class="col margin_input"
            v-model="cep"
            mask="#####-###"
            label="CEP"
          >
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="estado" label="Estado">
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
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
          @click="onSaveNewPerson"
        ></q-btn>
        <q-btn rounded label="Cancelar" color="negative" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="rowEdit" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white"></q-avatar>
        <span class="q-ml-sm" style="font-weight: bold">Editar Pessoa</span>
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="row">
          <q-input class="col margin_input" v-model="nome" label="Nome">
            <template v-slot:prepend>
              <q-icon name="person"></q-icon>
            </template>
          </q-input>

          <q-file class="col margin_input" v-model="foto" label="Foto">
            <template v-slot:prepend>
              <q-icon name="image"></q-icon>
            </template>
          </q-file>
        </div>
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
            v-model="logradouro"
            label="Logradouro"
          >
            <template v-slot:prepend>
              <q-icon name="house"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <q-input
            class="col margin_input"
            v-model="numero"
            type="number"
            label="Número"
          >
            <template v-slot:prepend>
              <q-icon name="pin"></q-icon>
            </template>
          </q-input>
          <q-input class="col margin_input" v-model="bairro" label="Bairro">
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="cidade" label="Cidade">
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
            </template>
          </q-input>
          <q-input
            class="col margin_input"
            v-model="cep"
            mask="#####-###"
            label="CEP"
          >
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
            </template>
          </q-input>
        </div>
        <div class="row">
          <q-input class="col margin_input" v-model="estado" label="Estado">
            <template v-slot:prepend>
              <q-icon name="apartment"></q-icon>
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
          @click="onSaveNewPerson"
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
      FormNewPerson: false,
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
      nome: "",
      foto: "",
      cpf: "",
      logradouro: "",
      numero: "",
      bairro: "",
      cidade: "",
      cep: "",
      estado: "",
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
    async onSaveNewPerson() {
      //Chamada da API
      let pessoa_obj = {
        cpf: this.cpf,
        endereco: {
          bairro: this.bairro,
          cep: this.cep,
          cidade: this.cidade,
          estado: this.estado,
          id: this.rows.length,
          logradouro: this.logradouro,
          numero: this.numero,
          pais: "Brasil",
        },
        foto: {
          id: this.foto.lastModified,
          name: this.foto.name,
          type: this.foto.type,
        },
        id: this.rows.length,
        nome: this.nome,
      };
      let SaveContact = await api.PessoaSalvar(pessoa_obj);
      this.$q.notify({
        message: SaveContact.message || "Contato Salvo",
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
    async addRow() {
      this.loading = true;
      //Envia a API
      this.nome = "";
      this.foto = "";
      this.cpf = "";
      this.logradouro = "";
      this.numero = "";
      this.bairro = "";
      this.cidade = "";
      this.cep = "";
      this.estado = "";
      this.FormNewPerson = true;
      this.loading = false;
    },
    async DeleteRow(e) {
      this.loading = true;
      //Envia a API
      let deleteContact = await api.PessoaDeletar(e);
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
        this.foto = JSON.parse(JSON.stringify(this.row_selected))[0].foto;
        this.cpf = JSON.parse(JSON.stringify(this.row_selected))[0].cpf;
        this.bairro = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].endereco.bairro;
        this.cidade = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].endereco.cidade;
        this.cep = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].endereco.cep;
        this.estado = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].endereco.estado;
        this.logradouro = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].endereco.logradouro;
        this.numero = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].endereco.numero;
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
