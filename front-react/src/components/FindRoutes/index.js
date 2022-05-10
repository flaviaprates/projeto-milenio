import { useState } from 'react';
import closeModal from '../../assets/close-modal.svg';
import api from '../../services/api';
import './style.css';

function FindRoutes({ findRoutesState, handleCloseModal }) {
    const [inputData, setInputData] = useState({ id: '', source: '', target: '', maxStops: '' });
    const [responseData, setResponseData] = useState([]);
    const [showResponse, setShowResponse] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!inputData.id || !inputData.source || !inputData.target) {
            return;
        };

        if (!inputData.maxStops) {
            setInputData({ ...inputData, maxStops: '1' });
        }

        try {
            const response = await api.post(`/routes/${inputData.id}/from/${inputData.source}/to/${inputData.target}?maxStops=${inputData.maxStops}`);

            if (response.status > 204) {
                return;
            }

            setResponseData([response.data.routes]);
            setShowResponse(true);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className='modal-container'>
            {findRoutesState &&
                <div className='modal-content'>
                    <img
                        className='close-modal'
                        src={closeModal}
                        alt='Fechar'
                        onClick={() => handleCloseModal()}
                    />

                    <div className='inputs find-routes'>
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

                        <label htmlFor='max-stops'>Máximo de paradas</label>
                        <input
                            name='max-stops'
                            type='text'
                            id='max-stops'
                            value={inputData.maxStops}
                            onChange={(event) => setInputData({ ...inputData, maxStops: event.target.value })}
                        />

                        <button
                            type='submit'
                            onClick={(event) => handleSubmit(event)}
                        >Enviar</button>
                    </div>

                    <div className='response find-routes'>
                        <h1>Resposta</h1>

                        <div className='routes'>
                            {showResponse &&
                                <>
                                    {responseData[0].map((response) => (
                                        <div
                                            className='route'
                                            key={response.route + response.stops}
                                        >
                                            <p>Rota: {response.route}</p>
                                            <p>Paradas: {response.stops}</p>
                                        </div>
                                    ))}
                                </>}
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default FindRoutes;