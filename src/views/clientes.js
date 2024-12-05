/**
 * Processo de renderizção
 * clientes.html
 */



//Crud Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1- slide (capturar os dados dos imputs do form)
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient') 
let emailCliente = document.getElementById('inputEmailClient')
let cepCliente = document.getElementById('inputCepClient')
let logradouroCliente = document.getElementById('inputLogradouroClient')
let bairroCliente = document.getElementById('inputBairroClient')
let cidadeCliente = document.getElementById('inputCidadeClient')
let ufCliente = document.getElementById('inputUfClient')
let numeroCliente = document.getElementById('inputNumeroClient')
let complementoCliente = document.getElementById('inputComplementoClient')



//Evento  associado ao botão adicionar (quando o botão for pressionado)
formCliente.addEventListener('submit', async (event) => {
    //Evitar o comportamento pradrão de envio em um form
    event.preventDefault()
    //Teste importante! (fluxo de dados)
    //console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    //Passo 2 - slide (envio das informações para o main)
    //Criar um objeto
    const cliente = {
        nomeCli: nomeCliente.value, 
        foneCli: foneCliente.value, 
        emailCli: emailCliente.value,
        cepCli: cepCliente.value,
        logradouroCli: logradouroCliente.value,
        bairroCli: bairroCliente.value,
        cidadeCli: cidadeCliente.value,
        ufCli: ufCliente.value,
        numeroCli: numeroCliente.value,
        complementoCli: complementoCliente.value
    }
    api.novoCliente(cliente)
})
//Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args)=>{
   document.getElementById('inputNameClient').value=""
   document.getElementById('inputPhoneClient').value=""
   document.getElementById('inputEmailClient').value=""
   document.getElementById('inputCepClient').value=""
   document.getElementById('inputLogradouroClient').value=""
   document.getElementById('inputBairroClient').value=""
   document.getElementById('inpuCidadeClient').value=""
   document.getElementById('inpuUfClient').value=""
   document.getElementById('inpuNumeroClient').value=""
   document.getElementById('inpuComplementoClient').value=""
})

// Função que faz a busca do endereço pelo CEP
async function buscarEndereco() {
    const cep = document.getElementById('inputCepClient').value.replace('-', '').replace('.', ''); // Retira caracteres não numéricos

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
        document.getElementById('inputLogradouroClient').value = data.logradouro || '';  // Logradouro
        document.getElementById('inputBairroClient').value = data.bairro || '';    // Bairro
        document.getElementById('inputCidadeClient').value = data.localidade || ''; // Cidade
        document.getElementById('inputUfClient').value = data.uf || '';           // UF

    } catch (error) {
        console.error('Erro ao buscar o endereço:', error);
        alert('Erro ao buscar o endereço. Tente novamente.');
    }
}


//Fim - Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>