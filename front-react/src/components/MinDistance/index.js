import { useState } from 'react';
import closeModal from '../../assets/close-modal.svg';
import api from '../../services/api';
import './style.css';

function MinDistance({ minDistanceState, handleCloseModal }) {
    const [inputData, setInputData] = useState({ id: '', source: '', target: '' });
    const [responseData, setResponseData] = useState({});
    const [showResponse, setShowResponse] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!inputData.id || !inputData.source || !inputData.target) {
            return;
        };

        try {
            const response = await api.post(`/distance/${inputData.id}/from/${inputData.source}/to/${inputData.target}`);

            if (response.status > 204) {
                return;
            }

            setResponseData({ ...response.data });
            setShowResponse(true);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className='modal-container min-distance'>
            {minDistanceState &&
                <div className='modal-content'>
                    <img
                        className='close-modal'
                        src={closeModal}
                        alt='Fechar'
                        onClick={() => handleCloseModal()}
                    />

                    <div className='inputs min-distance'>
                        <label htmlFor='id'>Id das rotas</label>
                        <input
                            name='id'
                            type='text'
                            id='id'
                            value={inputData.id}
                            onChange={(event) => setInputData(({ ...inputData, id: event.target.value }))}
                        />

                        <label htmlFor='source'>Partida</label>
                        <input
                            name='source'
                            type='text'
                            id='source'
                            value={inputData.source}
                            onChange={(event) => setInputData({ ...inputData, source: event.target.value })}
                        />

                        <label htmlFor='target'>Destino</label>
                        <input
                            name='target'
                            type='text'
                            id='target'
                            value={inputData.target}
                            onChange={(event) => setInputData({ ...inputData, target: event.target.value })}
                        />

                        <button
                            type='submit'
                            onClick={(event) => handleSubmit(event)}
                        >Enviar</button>
                    </div>

                    <div className='response min-distance'>
                        <h1>Resposta</h1>
                        {showResponse &&
                            <div>
                                <p>Distância: {responseData.distance}</p>
                                <p>Rota: {responseData.path}</p>
                            </div>}
                    </div>
                </div>}
        </div>
    );
}

export default MinDistance;