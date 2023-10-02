
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(()=>{

            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    } 

    select(table, search){
        let data = this.#database[table] ?? []
        //como vamos alterar o valor de data, pois vamos manter somente o que foi filtrado
        //ela não pode mais ser uma constante -> alterado para let (let it change)
        if (search){
            data = data.filter(row => {
                //converte o objeto em um array
                //some -> percorre o array, e ele retornar true, significa que o item deve ser incluido no filtro
                //exemplo do some:
                //{name: 'bianca', email: 'bianca'}
                //o some fica: -> [['name', 'bianca'], ['email', 'bianca']] [key, value]
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase()) //tudo caixa baixa, para não fazer diferença entre maiúsculo ou minúscula
                    //retorna se na linha com a chave, incluir o valor que está procurando
                })
            })
        }
        return data
    }

    insert(table, data){
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex > -1){
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }
    }
}