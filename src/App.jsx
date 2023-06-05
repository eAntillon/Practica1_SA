import { useState } from 'react';
import Nav from './components/Nav';
import RestPage from './RestPage';
import SoapPage from './SoapPage';

function App() {
    const [page, setPage] = useState('rest');

    return (
        <div className="w-full bg-blue-50 h-full flex justify-center overflow-y-auto">
            <div className="w-full md:max-w-screen-xl">
                <Nav page={page} setPage={setPage} />
                {page === 'rest' ? <RestPage /> : <SoapPage />}
            </div>
        </div>
    );
}

export default App;
