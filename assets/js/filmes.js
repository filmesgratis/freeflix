let FILMES_CACHE = [];

function renderFilmes(lista){
  const grid = document.querySelector(".grid");
  if(!grid) return;

  grid.innerHTML = (lista || []).map(f => `
    <div class="card" onclick="window.location.href='player.html?id=${f.id}&titulo=${encodeURIComponent(f.titulo)}'">
      <div class="capa" style="background-image:url('assets/img/capas/${f.capa}')"></div>
      <div class="titulo">${f.titulo}</div>
    </div>
  `).join("");
}

async function carregarFilmes(){
  const grid = document.querySelector(".grid");
  if(!grid) return;

  try{
    const res = await fetch("assets/js/filmes.json");
    FILMES_CACHE = await res.json();
    renderFilmes(FILMES_CACHE);
  }catch(e){
    grid.innerHTML = "<p style='color:#aaa'>Erro ao carregar filmes.</p>";
  }
}

// Botão 🔍 (sem barra visível): abre um prompt e filtra a lista
window.toggleSearch = function(){
  const termo = (prompt("Pesquisar filme:") || "").trim().toLowerCase();

  if(!termo){
    renderFilmes(FILMES_CACHE);
    return;
  }

  const filtrados = FILMES_CACHE.filter(f =>
    (f.titulo || "").toLowerCase().includes(termo)
  );

  renderFilmes(filtrados);

  if(filtrados.length === 0){
    const grid = document.querySelector(".grid");
    if(grid){
      grid.innerHTML = "<p style='color:#aaa'>Nenhum filme encontrado.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", carregarFilmes);
