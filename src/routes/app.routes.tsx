import { Route, Routes} from 'react-router-dom';

import Home from '../pages/home';
import ChoosePlan from '../pages/choosePlan';
import CardBoatDetails from '../pages/cardBoatDetails';
import ListBoat from '../pages/listBoat';
// import SignIn from '../pages/login';
import RegisterBoatBasic from '../pages/registerBoatsBasic';
import Dashboard from '../pages/dashboard';

export default function AppRoutes() {
  <Routes>
    <Route path={'/'} element={<Home/>} />
    <Route path={'/cardBoatDetails'} element={<CardBoatDetails/>} />
    <Route path={'/choosePlan'} element={<ChoosePlan/>} />
    <Route path={'/listBoat'} element={<ListBoat/>}/>
    <Route path={'/dashboard'} element={<Dashboard/>}/>
    <Route path={'/registerBoatBasic'} element={<RegisterBoatBasic/>} />
  </Routes>
};