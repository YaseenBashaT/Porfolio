import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './index.scss';

const Layout = () => {
    return <div className='App'>
                <Sidebar/>
                <div className='page'>
                    <span className='tags top-tags'>&lt;body&gt;</span>

                    <Outlet />
                    <br></br>
                    <span className='tags bottom-tags-body'>&lt;/body&gt;</span>
                    <br></br>
                    <span className='tags bottom-tags-html'>&lt;/html&gt;</span>
                </div>
         </div>
}

export default Layout