/**
 * Processo de renderizção
 * clientes.html
 */



//Crud Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1- slide (capturar os dados dos imputs do form)
let formFornecedores = document.getElementById('frmSupplier')
let nomeFornecedores = document.getElementById('inputNameSupplier')
let foneFornecedores = document.getElementById('inputPhoneSupplier') 
let siteFornecedores = document.getElementById('inputSiteSupplier')
let cepFornecedores = document.getElementById('inputCepSupplier')
let logradouroFornecedores = document.getElementById('inputLogradouroSupplier')
let bairroFornecedores = document.getElementById('inputBairroSupplier')
let cidadeFornecedores = document.getElementById('inputCidadeSupplier')
let ufFornecedores = document.getElementById('inputUfSupplier')
let numeroFornecedores = document.getElementById('inputNumeroSupplier')
let complementoFornecedores = document.getElementById('inputComplementoSupplier')

//Evento  associado ao botão adicionar (quando o botão for pressionado)
formFornecedores.addEventListener('submit', async (event) => {
    //Evitar o comportamento pradrão de envio em um form
    event.preventDefault()
    //Teste importante! (fluxo de dados)
    //console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    //Passo 2 - slide (envio das informações para o main)
    //Criar um objeto
    const fornecedores = {
        nomeFor: nomeFornecedores.value, 
        foneFor: foneFornecedores.value, 
       siteFor: siteFornecedores.value,
       cepFor: cepFornecedores.value,
       logradouroFor: logradouroFornecedores.value,
       bairroFor: bairroFornecedores.value,
       cidadeFor: cidadeFornecedores.value,
       ufFor: ufFornecedores.value,
       numeroFor: numeroFornecedores.value,
       complementoFor: complementoFornecedores.value,
    }
    api.novoFornecedores(fornecedores)
})
//Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args)=>{
   document.getElementById('inputNameSupplier').value=""
   document.getElementById('inputPhoneSupplier').value=""
   document.getElementById('inputSiteSupplier').value=""
   document.getElementById('inputCepSupplier').value=""
   document.getElementById('inputLogradouroSupplier').value=""
   document.getElementById('inputBairroSupplier').value=""
   document.getElementById('inputCidadeSupplier').value=""
   document.getElementById('inputUfSupplier').value=""
   document.getElementById('inputNumeroSupplier').value=""
   document.getElementById('inputComplementoSupplier').value=""
})

// Função que faz a busca do endereço pelo CEP
async function buscarEndereco() {
    const cep = document.getElementById('inputCepSupplier').value.replace('-', '').replace('.', ''); // Retira caracteres não numéricos

    // Verifica se o CEP tem o formato correto
    if (!cep || cep.length !== 8) {
        alert('CEP inválido.');
        return;
    }

    try {
        // Faz a requisição para a API do ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        // Verifica se o CEP retornou erro
        if (data.erro) {
            alert('CEP não encontrado.');
            return;
        }

        // Preenche os campos do formulário com os dados do endereço
        document.getElementById('inputLogradouroSupplier').value = data.logradouro || '';  // Logradouro
        document.getElementById('inputBairroSupplier').value = data.bairro || '';    // Bairro
        document.getElementById('inputCidadeSupplier').value = data.localidade || ''; // Cidade
        document.getElementById('inputUfSupplier').value = data.uf || '';           // UF

    } catch (error) {
        console.error('Erro ao buscar o endereço:', error);
        alert('Erro ao buscar o endereço. Tente novamente.');
    }
}

//Fim - Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>