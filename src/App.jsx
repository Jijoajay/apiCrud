import Home from './Components/Home';
import "./App.css";
import AccountMasters from './Components/AccountMasters';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

    const notify = () => toast("Wow so easy!");


    return (
        <div>
            <AccountMasters />
            <ToastContainer />
        </div>
    )
}

export default App
