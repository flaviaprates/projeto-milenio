import { useState } from 'react';
import closeModal from '../../assets/close-modal.svg';
import api from '../../services/api';
import './style.css';

function GetGraph({ getGraphState, handleCloseModal }) {
    const [inputData, setInputData] = useState({ id: '' });
    const [responseData, setResponseData] = useState([]);
    const [showResponse, setShowResponse] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!inputData.id) {
            return;
        };

        try {
            const response = await api.get(`/graph/${inputData.id}`);

            if (response.status > 204) {
                return;
            }

            setResponseData(response.data.data);
            setShowResponse(true);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className='modal-container'>
            {getGraphState &&
                <div className='modal-content'>
                    <img
                        className='close-modal'
                        src={closeModal}
                        alt='Fechar'
                        onClick={() => handleCloseModal()}
                    />

                    <div className='inputs get-graph'>
                        <label htmlFor='id'>Id das rotas</label>
                        <input
                            name='id'
                            type='text'
                            id='id'
                            value={inputData.id}
                            onChange={(event) => setInputData(({ ...inputData, id: event.target.value }))}
                        />

                        <button
                            type='submit'
                            onClick={(event) => handleSubmit(event)}
                        >Enviar</button>
                    </div>

                    <div className='response get-graph'>
                        <h1>Resposta</h1>

                        <div className='routes'>
                            {showResponse &&
                                <>
                                    {responseData.map((response) => (
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
                    </div>
                </div>}
        </div>
    );
}

export default GetGraph;