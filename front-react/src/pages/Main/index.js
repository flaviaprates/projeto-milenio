import { useState } from 'react';
import { Link } from 'react-router-dom';
import FindRoutes from '../../components/FindRoutes';
import GetGraph from '../../components/GetGraph';
import MinDistance from '../../components/MinDistance';
import './style.css';

function Main() {
    const [findRoutesState, setFindRoutesState] = useState(false);
    const [minDistanceState, setMinDistanceState] = useState(false);
    const [getGraphState, setGetGraphState] = useState(false);


    function handleFindRoutes() {
        setFindRoutesState(true);
    }

    function handleMinDistance() {
        setMinDistanceState(true);
    }

    function handleGetGraph() {
        setGetGraphState(true);
    }

    function handleCloseModal() {
        setFindRoutesState(false);
        setMinDistanceState(false);
        setGetGraphState(false);
    }

    return (
        <div className='main-container'>

            <h1>O que você deseja?</h1>

            <div className='main-content'>

                <div className='find-routes'>
                    <button
                        type='button'
                        className='find-routes'
                        onClick={() => handleFindRoutes()}
                    >
                        Encontrar a rota mais adequada dentre algumas opões?
                    </button>

                    {findRoutesState &&
                        <FindRoutes
                            findRoutesState={findRoutesState}
                            handleCloseModal={handleCloseModal}
                        />}
                </div>

                <div className='min-distance'>
                    <button
                        type='button'
                        className='min-distance'
                        onClick={() => handleMinDistance()}
                    >
                        Encontrar a rota mais curta?
                    </button>

                    {minDistanceState &&
                        <MinDistance
                            minDistanceState={minDistanceState}
                            handleCloseModal={handleCloseModal}
                        />}
                </div>

                <div className='get-graph'>
                    <button
                        type='button'
                        className='get-graph'
                        onClick={() => handleGetGraph()}
                    >
                        Ver todas as opções de rotas disponíveis?
                    </button>

                    {getGraphState &&
                        <GetGraph
                            getGraphState={getGraphState}
                            handleCloseModal={handleCloseModal}
                        />}
                </div>

                <div className='save-graph'>
                    <Link
                        to={'/graph'}
                        style={{ textDecoration: 'none' }}
                    >
                        <button
                            type='button'
                            className='save-graph'
                        >
                            Adicionar um novo grupo de rotas?
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Main;