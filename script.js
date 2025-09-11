let postInfos = 'https://geracao-de-proposta-backend.onrender.com/proposta';

let selectPlaca = document.getElementById('PlacaCliente');
let inputDePlaca = document.getElementById('PlacaInput');
let valorPlaca = document.getElementById('ValorPlaca');

selectPlaca.addEventListener('change', () => {
    if (selectPlaca.value !== '') {
        if (selectPlaca.value === 'Sim') {
            inputDePlaca.hidden = false;
        } else {
            inputDePlaca.hidden = true;
            valorPlaca.value = 0;
        }
    }
    else {
        inputDePlaca.hidden = true;
        valorPlaca.value = 0;
    }
});

let form = document.getElementById('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let razao = document.getElementById('RazaoSocial').value;
    let total = document.getElementById('TotalConsumo').value;
    let classe = document.getElementById('ClasseCliente').value;
    let placa = document.getElementById('ValorPlaca').value;
    let desconto = document.getElementById('DescontoMes').value;
    let kwh = document.getElementById('KwhUnit').value;
    let json;
    json = {
        RazaoSocial: String(razao),
        TotalConsumo: Number(total),
        ClasseCliente: Number(classe),
        PlacaCliente: Number(placa),
        DescontoMes: Number(desconto),
        KwhUnit: Number(kwh)
    }

    console.log(json)

    const response = await fetch(postInfos, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    });

    console.log(response);

    if (response.ok) {
        const blob = await response.blob();

        let filename = 'Proposta.pdf';

        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        a.remove();

        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

        form.reset();
    }
});

