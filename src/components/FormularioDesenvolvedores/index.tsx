import './FormularioDesenvolvedores.css'
import Api from '../../services/Api.ts'
import { useEffect, useState } from 'react'
import Desenvolvedores from '../Desenvolvedores'
import RadioButton from '../RadioButton/index.js'

export default function FormularioDesenvolvedores(){

    const qualificacoes = [
        '',
        'Estagiário',
        'Júnior',
        'Pleno',
        'Sênior'
    ]

    const [valorSelecionado, setValorSelecionado] = useState<string>('all')
    const [nome, setNome] = useState<string>('')
    const [cargo, setCargo] = useState<string>('')
    const [nivel, setNivel] = useState<string>('')
    const [listaDevs, setListaDevs] = useState<any>([])

    useEffect(() => {
        pegarTodosDevs()
        
    },[])

    useEffect(() => {
        function botaoLiberarDados(){
            let botao = document.getElementById('botaoEnviar')
            
            if(nome && cargo && nivel){
                botao.style.backgroundColor = '#fff'
                botao.style.color = '#000'
            }
        }

        botaoLiberarDados()

    },[nome,cargo,nivel])

    async function pegarTodosDevs(){
        const response = await Api.get('/dev',)
        setListaDevs(response.data)
    }

    async function filtrarDevs(opcoes:any){
        const params = { prioridade: opcoes }
        const response = await Api.get('/priority', {params})

        if(response){
            setListaDevs(response.data)
        }
    }

    function cliqueFiltrarDev(e:any){
        setValorSelecionado(e.value)

        if(e.checked && e.value !== 'all'){
            filtrarDevs(e.value)
        }else{
            pegarTodosDevs()
        }
    }

    async function enviar(){
        const response = await Api.post('/dev', {
            nome,
            cargo,
            nivel,
            prioridade:false
        })

        setNome('')
        setCargo('')
        setNivel('')

    }

    async function deletar(id:string){
        const deletarDev = await Api.delete(`/dev/${id}`)

        if(deletarDev){
            setListaDevs(listaDevs.filter((devs:any) => devs._id !== id))
        }

    }

    async function mudarPrioridade(id:string){
        const mudarPrioridade = await Api.post(`/priority/${id}`)

        if(mudarPrioridade && valorSelecionado !== 'all'){
            filtrarDevs(valorSelecionado)

        }else if(mudarPrioridade){
            pegarTodosDevs()

        }

    }

    return(
        <main>
            <form 
                className='formDev' 
                onSubmit={enviar}
            >
                <h2>Registre os desenvolvedores</h2>

                <div className="inputsContainer">
                    <input
                        maxLength={20}
                        required
                        onChange={nome => setNome(nome.target.value)}
                        value={nome} 
                        type="text" 
                        name="" 
                        id="" 
                        placeholder="Digite o nome"
                    /> 
                    
                    <br />

                    <input 
                        maxLength={15}
                        required
                        onChange={cargo => setCargo(cargo.target.value)}
                        value={cargo} 
                        type="text" 
                        name="" 
                        id="" 
                        placeholder="Digite o cargo"
                    />

                    <select 
                        onChange={niveis => setNivel(niveis.target.value)}
                        required
                        name="" 
                        id="">
                        {qualificacoes.map(niveis => (
                            <option value={niveis} key={niveis}>
                                {niveis}
                            </option>
                        ))}
                    </select>
                    
                </div>

                <button 
                    type='submit' 
                    id='botaoEnviar'>
                        Enviar
                </button>
                
            </form>

            <div className="filtroContainer">
                <RadioButton
                    valorSelecionado={valorSelecionado}
                    cliqueFiltrarDev={cliqueFiltrarDev}
                />
            </div>

            <ul className="devsInerithContent">
                {listaDevs.map((data:any) => (
                    <Desenvolvedores 
                        key={data._id} 
                        data={data} 
                        deletar={deletar}
                        mudarPrioridade={mudarPrioridade}
                    />
                ))}
            </ul>
            
        </main>
    )
}