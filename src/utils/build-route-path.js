
export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    //?<id> é o nome do grupo vai ser id
    //?<$1> é o primeiro valor


    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    // ?<> cria um novo grupo - a rota pode ter ou não query
    // \\? -> pra indicar que vai pegar a partir do ponto de interrogação.
    // (.*) -> pega todo o conteúdo após o ponto de interrogação  qualquer caractere e inumeras vezes
    // ? (após os parenteses) -> informa que pode ter os parâmetros ou não
    // $ após os parâmetros - informa que é a última coisa após eles não tem mais nada



    return pathRegex

}