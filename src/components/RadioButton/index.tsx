import './RadioButton.css'

export default function RadioButton({valorSelecionado,cliqueFiltrarDev}:any){
    return(
        <div className='radioButtonContainer'>
            <div className="inputsRadioContainer">
                <h3>Filtre por:</h3>

                <label htmlFor="">Todos</label>
                <input 
                    checked={valorSelecionado === 'all'}
                    onChange={valor => cliqueFiltrarDev(valor.target)}
                    type="radio" 
                    name="filtro" 
                    id="" 
                    value='all'
                />

                <label htmlFor="">Prioridade</label>
                <input 
                    checked={valorSelecionado === 'true'}
                    onChange={valor => cliqueFiltrarDev(valor.target)}
                    type="radio" 
                    name="filtro" 
                    id="" 
                    value='true'
                />

                <label htmlFor="">Normal</label>
                <input   
                    checked={valorSelecionado === 'false'}
                    onChange={valor => cliqueFiltrarDev(valor.target)}
                    type="radio" 
                    name="filtro" 
                    id="" 
                    value='false'
                />

            </div>

        </div>
    )
}