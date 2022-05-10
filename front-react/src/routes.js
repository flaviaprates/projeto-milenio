import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import SaveGraph from './pages/SaveGraph';


function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />

            <Route path='/graph' element={<SaveGraph />} />
        </Routes>
    );
}

export default MainRoutes;