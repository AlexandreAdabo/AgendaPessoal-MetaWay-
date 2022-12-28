<template>
  <div class="titulo">Home</div>
  <BtnVoltar />
  <q-btn
    color="primary"
    rounded
    label="Favoritos"
    @click="onClickFavoritos()"
  />
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
          <q-file
            class="col margin_input"
            v-model="miniatura"
            label="Miniatura"
          >
            <template v-slot:prepend>
              <q-icon name="content_copy"></q-icon>
            </template>
          </q-file>
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
  <q-dialog v-model="rowEdit" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="person" color="primary" text-color="white"></q-avatar>
        <span class="q-ml-sm" style="font-weight: bold">Editar Contato</span>
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
          <q-file
            class="col margin_input"
            v-model="miniatura"
            label="Miniatura"
          >
            <template v-slot:prepend>
              <q-icon name="content_copy"></q-icon>
            </template>
          </q-file>
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
  <Transition name="slide-fade">
    <div v-if="MostraFavoritos">
      <tr v-for="(a, index) in this.lista_favoritos.length" :key="index">
        <td>{{ ` ID do Contato: ${this.lista_favoritos[index].id} | ` }}</td>
        <td>
          {{
            ` E-mail do Contato: ${
              this.lista_favoritos[index].email
                ? this.lista_favoritos[index].email
                : "Sem cadastro"
            } | `
          }}
        </td>
        <td>
          {{
            ` Telefone do Contato: ${this.lista_favoritos[index].telefone} | `
          }}
        </td>
        <td>
          {{ ` CPF do Contato: ${this.lista_favoritos[index].pessoa.cpf} | ` }}
        </td>
        <td>
          {{ ` Nome do Contato: ${this.lista_favoritos[index].pessoa.nome}` }}
        </td>
      </tr>
    </div>
  </Transition>
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
    <template v-slot:body-cell-miniatura="props">
      <q-td :props="props">
        <div>
          <q-img
            src="https://placeimg.com/500/300/nature"
            spinner-color="white"
            style="height: 80px; max-width: 70px"
          ></q-img>
        </div>
      </q-td>
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
  name: "AppHome",
  data() {
    return {
      filter: "",
      loading: false,
      MostraFavoritos: false,
      FormNewContact: false,
      rowEdit: false,
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
          name: "miniatura",
          align: "center",
          label: "Miniatura",
          field: (row) => row.pessoa.foto.name,
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
      nome: "",
      miniatura: "",
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
      contatos[index].favoritos = false;
      contatos[index].delete = false;
    });
    this.rows = contatos;
    //let foto = await api.FotoGet(contatos[0].id);
  },
  methods: {
    Voltar() {
      this.$router.push("/MenuAcessos");
    },
    async onSaveNewContact() {
      //Envia a API
      let contato_obj = {
        email: this.email,
        id: this.rows.length,
        pessoa: {
          cpf: this.cpf,
          endereco: {
            bairro: "",
            cep: "",
            cidade: "",
            estado: "",
            id: this.rows.length,
            logradouro: "",
            numero: 0,
            pais: "",
          },
          foto: {
            id: this.miniatura.lastModified,
            name: this.miniatura.name,
            type: this.miniatura.type,
          },
          id: this.rows.length,
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
          id: 2,
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
    async addRow() {
      this.loading = true;
      this.nome = "";
      this.email = "";
      this.cpf = "";
      this.miniatura = "";
      this.tag = "";
      this.telefone = "";
      this.FormNewContact = true;
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
      }
    },
    async onFilter() {
      let filtrado = await api.ContatosSearch(this.filter);
      this.rows = filtrado;
    },
    async onClickFavoritos() {
      this.lista_favoritos = await api.FavoritosGet();
      this.lista_favoritos = JSON.parse(JSON.stringify(this.lista_favoritos));
      this.MostraFavoritos = !this.MostraFavoritos;
    },
    onRowClick() {
      if (JSON.parse(JSON.stringify(this.row_selected)).length > 0) {
        this.nome = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].pessoa.nome;
        this.email = JSON.parse(JSON.stringify(this.row_selected))[0].email;
        this.cpf = JSON.parse(JSON.stringify(this.row_selected))[0].pessoa.cpf;
        this.miniatura = JSON.parse(
          JSON.stringify(this.row_selected),
        )[0].pessoa.foto.name;
        this.tag = JSON.parse(JSON.stringify(this.row_selected))[0].tag;
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
</style>
