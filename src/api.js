//BASE URL - https://demometaway.vps-kinghost.net:8485/
let base_url = `https://demometaway.vps-kinghost.net:8485/`;
const funcoes_api = {
  async Autenticacao(senha, login) {
    // let request = new XMLHttpRequest();
    // request.open("POST", url, true);
    // request.setRequestHeader("Content-type", "application/json");
    // request.send(MyBody);
    // request.onload = async function () {
    //   return await JSON.parse(this.responseText);
    // };
    /////////////////////////////////////////////////////////
    let url = `${base_url}api/auth/login`;
    let MyBody = JSON.stringify({ password: senha, username: login });
    const response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  },
  async ContatosList() {
    //GET
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let UserLogin =
      JSON.parse(sessionStorage.resultLogin) ||
      JSON.parse(sessionStorage.resultLogin);
    let url = `${base_url}api/contato/listar/${UserLogin.id}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
      },
    });
    response = await response.json();
    return response;
  },
  async ContatosSearch(search) {
    //POST
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify({ termo: search });
    let url = `${base_url}api/contato/pesquisar`;
    let response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async ContatosDelete(contato_id) {
    //DELETE
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    //let MyBody = JSON.stringify({ contato_id });
    let url = `${base_url}api/contato/remover/${contato_id}`;
    let response = await fetch(url, {
      method: "DELETE",
      //body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async ContatosInsert(contato_inserir) {
    //POST
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify(contato_inserir);
    let url = `${base_url}api/contato/salvar`;
    let response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async FavoritosGet() {
    //GET
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let url = `${base_url}api/favorito/pesquisar`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
      },
    });
    response = await response.json();
    return response;
  },
  async FavoritosDelete(contato_id) {
    //DELETE
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let url = `${base_url}api/favorito/remover/${contato_id}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
      },
    });
    response = await response.json();
    return response;
  },
  async FavoritosSalvar(contato_favorito) {
    //POST
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify(contato_favorito);
    let url = `${base_url}api/favorito/salvar`;
    let response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async FotoGet(foto_id) {
    //GET
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let url = `${base_url}api/foto/download/${foto_id}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.blob();
    //const fr = new FileReader();
    //fr.readAsDataURL(response);
    // fr.addEventListener("load", () => {
    //   let foto = JSON.parse(localStorage.photos);
    //   foto.push({ photo: fr.result, id: foto_id });
    //   localStorage.photos = JSON.stringify(foto);
    // });
    return response;
  },
  async UsuarioGet(usuario_id) {
    //GET
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let url = `${base_url}api/usuario/buscar/${usuario_id}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async UsuarioList() {
    //POST
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify({ termo: "" });
    let url = `${base_url}api/usuario/pesquisar`;
    let response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async UsuarioInsert(user_obj) {
    //POST
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify(user_obj);
    let url = `${base_url}api/usuario/salvar`;
    let response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async UsuarioAtualizar(usuario_obj) {
    //PUT
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify(usuario_obj);
    let url = `${base_url}api/usuario/atualizar`;
    let response = await fetch(url, {
      method: "PUT",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async PessoaPesquisar() {
    //POST
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify({ nome: "" });
    let url = `${base_url}api/pessoa/pesquisar`;
    let response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async PessoaSalvar(pessoa_obj) {
    //POST
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let MyBody = JSON.stringify(pessoa_obj);
    let url = `${base_url}api/pessoa/salvar`;
    let response = await fetch(url, {
      method: "POST",
      body: MyBody,
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
  async PessoaDeletar(pessoa_id) {
    //DELETE
    let bearerAuth =
      JSON.parse(sessionStorage.resultLogin).accessToken ||
      JSON.parse(sessionStorage.resultLogin).accessToken;
    let url = `${base_url}api/pessoa/remover/${pessoa_id}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${bearerAuth}`,
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    return response;
  },
};

module.exports = funcoes_api;
