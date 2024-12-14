export function atualizarRanking(vencedor) {
    let ranking = JSON.parse(localStorage.getItem("ranking")) || {};

    if (!ranking[vencedor]) {
        ranking[vencedor] = 1;
    } else {
        ranking[vencedor]++;
    }

    localStorage.setItem("ranking", JSON.stringify(ranking));
    alert(`${vencedor} venceu! Ranking atualizado.`);
}

export function exibirRanking() {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || {};
    console.log("Ranking Atual:");
    for (let jogador in ranking) {
        console.log(`${jogador}: ${ranking[jogador]} vitórias`);
    }
}
