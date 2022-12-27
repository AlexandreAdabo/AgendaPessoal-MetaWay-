<template>
  <div class="titulo">Contatos</div>
  <BtnVoltar />
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
    <template v-slot:body-cell-favoritos="props">
      <q-td :props="props">
        <div>
          <q-checkbox
            v-model="props.row.favoritos"
            @update:model-value="
              onFavoritos(JSON.parse(JSON.stringify(props.row)))
            "
            checked-icon="star"
            unchecked-icon="star_border"
            indeterminate-icon="star_border"
          />
        </div>
      </q-td>
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
      MostraFavoritos: false,
      row_selected: [],
      lista_favoritos: [],
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
          name: "favoritos",
          label: "Favoritos",
          field: "favoritos",
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
    let contatos = await api.ContatosList();
    contatos.map((e, index) => {
      contatos[index].favoritos = false;
      contatos[index].delete = false;
    });
    this.rows = contatos;
    console.log(contatos, "LISTA DE CONTATOS");
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
        favoritos: false,
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
    async onFavoritos(e) {
      if (e.favoritos) {
        let insert_favorito = await api.FavoritosSalvar(e);
        this.$q.notify({
          message: insert_favorito.message || "Contato inserido em Favoritos",
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
        console.log(e, insert_favorito, "INSERE NOS FAVORITOS");
      } else {
        let delete_favorito = await api.FavoritosDelete(e.id);
        this.$q.notify({
          message: delete_favorito.message || "Contato deletado dos Favoritos",
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
        console.log(e, delete_favorito, "DELETA DOS FAVORITOS");
      }
    },
    async onFilter() {
      let filtrado = await api.ContatosSearch(this.filter);
      this.rows = filtrado;
      console.log(filtrado, "ESCREVEU");
    },
    onRowClick(evt, row) {
      console.log(
        JSON.parse(JSON.stringify(this.row_selected)),
        "ROW SELECTED",
      );
      console.log(JSON.parse(JSON.stringify(row)), "row");
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
</style>
