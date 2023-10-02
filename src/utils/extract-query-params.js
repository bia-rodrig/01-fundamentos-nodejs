// vai receber a query e pegar as informações
//Exemplo: ?search=Bianca&page=2

export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=') //quebra e vamos ter ['search', 'Bianca']

        queryParams[key] = value
        
        return queryParams
    }, {})
    //split, separa a query nos &, retornando um array
    //reduce -> percorre o array e transforma em outra coisa -> nesse caso queremos transformar em um novo objeto
    //{} (segundo parametro - estrutura de dados para qual quer transforma) inicia o reduce vazio -> como um objeto vazio
    

}