import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function SaveGraph() {
    const [inputData, setInputData] = useState({ source: '', target: '', distance: '' });
    const [addRoute, setAddRoute] = useState(false);
    const [saveData, setSaveData] = useState([]);

    function handleAddRoute() {
        setAddRoute(true);
    }

    function handleSubmitRoute() {

        setSaveData([...saveData, { ...inputData }]);

        setInputData({ source: '', target: '', distance: '' });

        setAddRoute(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!saveData[0]) {
            return;
        }

        try {
            const response = await api.post('/graph', {
                data: saveData
            });

            if (response.status > 204) {
                return;
            }

            setSaveData([]);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className='save-graph-container'>
            <h1>Salvar novas rotas</h1>

            <div className='save-graph-content'>

                <div className='save-graph-inputs'>
                    <h2>Adicionar rota</h2>

                    {!addRoute &&
                        <button
                            type='button'
                            onClick={() => handleAddRoute()}
                        >
                            Adicionar nova rota
                        </button>}

                    {addRoute &&
                        <>
                            <label htmlFor='source'>Partida</label>
                            <input
                                name='source'
                                type='text'
                                id='source'
                                value={inputData.source}
                                onChange={(event) => setInputData({ ...inputData, source: event.target.value.toUpperCase() })}
                            />

                            <label htmlFor='target'>Destino</label>
                            <input
                                name='target'
                                type='text'
                                id='target'
                                value={inputData.target}
                                onChange={(event) => setInputData({ ...inputData, target: event.target.value.toUpperCase() })}
                            />

                            <label htmlFor='distance'>Distância</label>
                            <input
                                name='distance'
                                type='text'
                                id='distance'
                                value={inputData.distance}
                                onChange={(event) => setInputData({ ...inputData, distance: event.target.value })}
                            />

                            <button
                                type='button'
                                onClick={() => handleSubmitRoute()}
                            >Enviar</button>
                        </>}
                </div>

                <div className='save-graph-response'>
                    <h2>Resposta</h2>

                    <div className='save-graph-routes'>
                        {saveData &&
                            <>
                                {saveData.map((response) => (
                                    <div
                                        className='route'
                                        key={response.source + response.target + response.distance}
                                    >
                                        <p>Partida: {response.source}</p>
                                        <p>Destino: {response.target}</p>
                                        <p>Distância: {response.distance}</p>
                                    </div>
                                ))}
                            </>}
                    </div>

                    <button
                        type='submit'
                        onClick={(event) => handleSubmit(event)}
                    >
                        Salvar rotas
                    </button>
                </div>
            </div>

            <div className='back-to-main'>
                <Link
                    to={'/'}
                    style={{ textDecoration: 'none' }}
                >
                    <button
                        type='button'
                        className='back-to-main'
                    >
                        Pesquisar entre as rotas salvas
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default SaveGraph;