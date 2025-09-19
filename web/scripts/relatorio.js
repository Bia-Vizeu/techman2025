const relatorioDiv = document.getElementById("relatorio");

function renderRelatorio() {
  const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  relatorioDiv.innerHTML = equipamentos.map(eq => {
    const comentariosEq = comentarios.filter(c => c.equipamentoId === eq.id);

    return `
      <div class="equipamento-relatorio">
        <h3>${eq.nome}</h3>
        <p>${eq.descricao}</p>
        <small>Data de inclusão: ${eq.data}</small>
        <h4>Comentários:</h4>
        ${comentariosEq.length === 0 ? "<p>Nenhum comentário.</p>" :
          "<ul>" + comentariosEq.map(c => `<li><b>${c.usuario}</b> (${c.data}): ${c.texto}</li>`).join("") + "</ul>"}
      </div>
    `;
  }).join("");
}

renderRelatorio();
