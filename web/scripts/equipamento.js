const container = document.getElementById("equipamentoDetalhes");
const comentariosDiv = document.getElementById("comentarios");
const form = document.getElementById("formComentario");

const equipamentoId = parseInt(localStorage.getItem("equipamentoSelecionado"));
const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
const equipamento = equipamentos.find(eq => eq.id === equipamentoId);

function renderEquipamento() {
  if (!equipamento) {
    container.innerHTML = "<p>Equipamento não encontrado.</p>";
    return;
  }
  container.innerHTML = `
    <h2>${equipamento.nome}</h2>
    <img src="${equipamento.imagem}" width="200">
    <p>${equipamento.descricao}</p>
    <small>Data de inclusão: ${equipamento.data}</small>
  `;
}

function renderComentarios() {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  const filtro = comentarios.filter(c => c.equipamentoId === equipamentoId);

  comentariosDiv.innerHTML = filtro.length === 0 
    ? "<p>Sem comentários ainda.</p>" 
    : filtro
        .sort((a, b) => new Date(b.data) - new Date(a.data))
        .map(c => `
          <div class="comentario">
            <p><b>${c.usuario}</b> (${c.data})</p>
            <p>${c.texto}</p>
          </div>
        `).join("");
}

// Adicionar comentário
form.addEventListener("submit", e => {
  e.preventDefault();
  const texto = document.getElementById("novoComentario").value.trim();
  if (!texto) return;

  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  comentarios.push({
    id: Date.now(),
    equipamentoId,
    usuario: localStorage.getItem("role"),
    texto,
    data: new Date().toLocaleString()
  });
  localStorage.setItem("comentarios", JSON.stringify(comentarios));

  alert("Sucesso! Comentário cadastrado para o equipamento.");
  document.getElementById("novoComentario").value = "";
  renderComentarios();
});

// Inicializa
renderEquipamento();
renderComentarios();
