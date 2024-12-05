/**
 * Processo de renderizção
 * clientes.html
 */



//Crud Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Passo 1- slide (capturar os dados dos imputs do form)
let formProdutos = document.getElementById('frmProduct')
let nomeProdutos = document.getElementById('inputNameProduct')
let precoProdutos = document.getElementById('inputPrecoProduct') 
let codigoProdutos = document.getElementById('inputCodigoProduct')

//Evento  associado ao botão adicionar (quando o botão for pressionado)
formProdutos.addEventListener('submit', async (event) => {
    //Evitar o comportamento pradrão de envio em um form
    event.preventDefault()
    //Teste importante! (fluxo de dados)
    //console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    //Passo 2 - slide (envio das informações para o main)
    //Criar um objeto
    const produtos = {
        nomePro: nomeProdutos.value, 
        precoPro: precoProdutos.value, 
        codigoPro: codigoProdutos.value
    }
    api.novoProdutos(produtos)
})
//Fim CRUD Create <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
api.resetarFormulario((args)=>{
   document.getElementById('inputNameProduct').value=""
   document.getElementById('inputPrecoProduct').value=""
   document.getElementById('inputCodigoProduct').value=""
})

//Fim - Reset Form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>