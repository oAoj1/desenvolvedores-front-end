import './Desenvolvedores.css'
import IDevs from '../../interfaces/IDevs'
import Api from '../../services/Api.js'
import { BiRightArrowAlt } from 'react-icons/bi'
import { MdPriorityHigh } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useState } from 'react'

export default function Desenvolvedores({data,deletar,mudarPrioridade}:IDevs){

    const [nomeAlterado,setNomeAlterado] = useState<string>('')
    const [cargoAlterado,setCargoAlterado] = useState<string>('')
    const [nivelAlterado,setNivelAlterado] = useState<string>('')

    async function alterarNome(nomeSalvo:string, nomeDados:string){

        if(nomeAlterado !== nomeDados){
            await Api.put(`/dev/${data._id}`, {
                nome: nomeSalvo
            })
        }

    }

    async function alterarCargo(cargoSalvo:string, cargoDados:string){

        if(cargoAlterado !== cargoDados){
            await Api.put(`/dev/${data._id}`, {
                cargo: cargoSalvo
            })
        }

    }

    async function alterarNivel(nivelSalvo:string, nivelDados:string){

        if(nivelAlterado !== nivelDados){
            await Api.put(`/dev/${data._id}`, {
                nivel: nivelSalvo
            })
        }

    }

    return(
        <li className={
            data.prioridade ? 
            "desenvolvedoresContainerTrue" : 
            "desenvolvedoresContainerFalse"
        }>
            <div className="devsContent">
                <div className="prioridadeContent">
                    <textarea 
                        maxLength={15}
                        spellCheck='false'
                        className='nome'
                        onChange={nome => setNomeAlterado(nome.target.value)}
                        onBlur={e => alterarNome(e.target.value, data.nome)}>
                            {data.nome}
                    </textarea>
                    <MdPriorityHigh 
                        onClick={() => mudarPrioridade(data._id)}
                        title='Prioridade'
                    />
                </div>
                
                <textarea 
                    maxLength={15}
                    spellCheck='false'
                    className='cargo' 
                    onChange={cargo => setCargoAlterado(cargo.target.value)}
                    onBlur={cargo => alterarCargo(cargo.target.value, data.cargo)}>
                        {data.cargo}
                </textarea>

                <div className="nivelExcluirContent">
                    <div className="nivelContent">
                        <BiRightArrowAlt/>
                        <textarea 
                            maxLength={10}
                            spellCheck='false'
                            className='nivel' 
                            onChange={nivel => setNivelAlterado(nivel.target.value)}
                            onBlur={nivel => alterarNivel(nivel.target.value, data.nivel)}>
                                {data.nivel}
                        </textarea>
                    </div>

                    <div className="excluirContent">
                        <RiDeleteBin6Line 
                            onClick={() => deletar(data._id)}
                            title='Excluir'/>
                    </div>

                </div>

            </div>
        </li>
    )
}