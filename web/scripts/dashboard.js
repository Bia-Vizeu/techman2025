
const role = localStorage.getItem("role");

const lista = document.getElementById("equipamentos");
const btnNovo = document.getElementById("btnNovoEquipamento");

if (role === "admin") {
  btnNovo.style.display = "block";
  btnNovo.addEventListener("click", () => {
    const nome = prompt("Nome do equipamento:");
    const descricao = prompt("Descrição:");
    const imagem = prompt("URL da imagem:");
    const ativo = confirm("Ativar equipamento?");

    if (nome && descricao && imagem) {
      const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
      equipamentos.push({
        id: Date.now(),
        nome,
        descricao,
        imagem,
        ativo,
        data: new Date().toLocaleString()
      });
      localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
      renderEquipamentos();
    }
  });
}
function renderEquipamentos() {
  const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
  lista.innerHTML = "";

  equipamentos.filter(eq => eq.ativo).forEach(eq => {
    const div = document.createElement("div");
    div.className = "equipamento";

    div.innerHTML = `
      <img src="${eq.imagem}" alt="${eq.nome}" width="100">
      <h3>${eq.nome}</h3>
      <p>${eq.descricao}</p>
      <button onclick="abrirComentarios(${eq.id})">Comentários</button>
      ${role === "admin" ? `<button onclick="excluirEquipamento(${eq.id})">Excluir</button>` : ""}
    `;
    lista.appendChild(div);
  });
}

function abrirComentarios(id) {
  localStorage.setItem("equipamentoSelecionado", id);
  window.location.href = "equipamento.html";
}

function excluirEquipamento(id) {
  if (confirm("Atenção! Tem certeza que deseja excluir o equipamento? Essa ação não poderá ser desfeita.")) {
    let equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
    equipamentos = equipamentos.filter(eq => eq.id !== id);
    localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
    renderEquipamentos();
  }
}

renderEquipamentos();
