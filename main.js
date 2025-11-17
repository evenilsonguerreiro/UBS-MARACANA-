/* eslint-disable @typescript-eslint/no-unused-vars */
async function verificar() {
    const ruaInput = document.getElementById("txtt1").value.toLowerCase().trim();
    const nomeInput = document.getElementById("txtt2").value.trim();
    const res = document.getElementById("res");

    // limpa mensagem anterior
    res.innerHTML = "Buscando...";

    try {
        // 1) Carregar JSON da API
        const request = await fetch("maracanau.json");
        const data = await request.json();

        let bairroEncontrado = null;
        let ruaEncontrada = null;
        let ubsDoBairro = [];

        // 2) Percorrer bairros
        data.bairros.forEach((bairro) => {
            bairro.ruas.forEach((rua) => {
                if (rua.toLowerCase().trim() === ruaInput) {
                    bairroEncontrado = bairro.nome;
                    ruaEncontrada = rua;

                    // Pega UBSs se existirem
                    if (bairro.ubs) {
                        ubsDoBairro = bairro.ubs;
                    }
                }
            });
        });

        // 3) Resposta final
        if (bairroEncontrado) {
            let ubsHtml = "";
            if (ubsDoBairro.length > 0) {
                ubsHtml = "<h5>UBS do bairro:</h5><ul>";
                ubsDoBairro.forEach((ubs) => {
                    ubsHtml += `<li><b>${ubs.nome}</b> - ${ubs.endereco}</li>`;
                });
                ubsHtml += "</ul>";
            }

            res.innerHTML = `
                <div class="alert alert-success">
                    <h4>Resultado Encontrado ✔</h4>
                    <p><b>${nomeInput}</b>, Sua unidade de Saúde Fica <b></b></p>
                    <h5><b>${bairroEncontrado}</b></h5>
                    ${ubsHtml}
                </div>
            `;
        } else {
            res.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Rua não encontrada ❌</h4>
                    <p>Verifique se digitou corretamente o nome da rua.</p>
                </div>
            `;
        }

    } catch (error) {
        res.innerHTML = `
            <div class="alert alert-warning">
                Erro ao carregar dados da API.
            </div>
        `;
        console.error("Erro:", error);
    }
}
