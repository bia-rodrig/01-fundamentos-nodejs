import {Readable, Transform, Writable} from 'node:stream'

class OneToHundredStream extends Readable{
    index = 1
    //toda readable tem um método obrigatório: read - que vai retornar os dados da stream
    _read(){
        const i = this.index++

        setTimeout(() => {
            if (i > 100){
                this.push(null) //push fornece informações para quem está consumingo ela
            }else{
                //stream não pode ser string, int, bool... tem que ser o formato buffer
    
                const buf = Buffer.from(String(i))//converte o i para string, pois o buffer só aceita string e depois converte o i para buffer
    
                this.push(buf) 
            }
        },1000)
    }
}

class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
        //callback tem como primeiro parametro o erro
        // o segundo, foi sucesso
    }
}

class MultiplyByTenStream extends Writable{
    //vai pegar o número da stream de leitura e vai multiplicar por 10
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        //chunk vem em buffer
        //converte pra string
        //converte pra número e multiplica por 10
        callback() //chama após fazer tudo o que tiver que fazer
    }
}

new OneToHundredStream() //só le dados dela
.pipe(new InverseNumberStream()) //le dado de algum lugar e escreve para outro lugar
.pipe(new MultiplyByTenStream()) //so escreve dados pra ela