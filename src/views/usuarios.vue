<template>
  <div class="titulo">Usuários</div>
  <BtnVoltar />
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
          <q-input class="col botoes" v-model="text" label="CPF" />
          <q-input
            class="col botoes"
            v-model="text"
            label="Data de Nascimento"
          />
          <q-input class="col botoes" v-model="text" label="E-mail" />
        </div>
        <div class="row">
          <q-input class="col botoes" v-model="text" label="Nome" />
          <q-input class="col botoes" v-model="text" label="Senha" />
          <q-input class="col botoes" v-model="text" label="Telefone" />
          <q-input class="col botoes" v-model="text" label="Username" />
        </div>
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions align="right">
        <q-btn
          rounded
          label="Salvar"
          color="green"
          v-close-popup="cancelEnabled"
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
  name: "AppUsuarios",
  data() {
    return {
      filter: "",
      loading: false,
      FormNewUser: false,
      row_selected: [],
      lista_favoritos: [],
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
    };
  },
  components: {
    BtnVoltar,
  },
  async created() {
    let usuarios = await api.UsuarioList();
    // usuarios.map((e, index) => {
    //   usuarios[index].delete = false;
    // });
    this.rows = usuarios;
    console.log(usuarios, "LISTA DE usuarios");
  },
  methods: {
    Voltar() {
      this.$router.push("/MenuAcessos");
    },
    async addRow() {
      this.loading = true;
      //Envia a API
      this.FormNewUser = true;
      //let insertUser = await api.UsuarioInsert();

      // this.$q.notify({
      //   message: insertUser.message || "Não foi possível inserir o Usuário",
      //   color: "positive",
      //   icon: "check",
      //   actions: [
      //     {
      //       label: "Fechar",
      //       color: "white",
      //       handler: () => {
      //         /* ... */
      //       },
      //     },
      //   ],
      // });
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
