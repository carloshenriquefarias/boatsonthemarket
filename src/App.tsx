import {Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import {theme} from './styles/theme'
import {AuthContextProvider} from './context/AuthContext'

import AboutUs from './pages/aboutUs'
import BoatEdit from './pages/boatEdit'
import CardBoatDetails from './pages/cardBoatDetails'
import ChoosePlan from './pages/choosePlan'
import Dashboard from './pages/dashboard'
import EditProfile from './pages/editprofile'
import Home from './pages/home'
import ListBoat from './pages/listBoat'
import ListBoatByUser from './pages/listBoatByUser'
import Login from './pages/login'
import Profile from './pages/profile'
import RegisterBoatsBasic from './pages/registerBoatsBasic'
import SelectPlans from './pages/selectPlans'
import Admin from './pages/admin'
import Payments from './pages/payments'
import News from './pages/news'
import Ads from './pages/ads'
import Users from './pages/users'
import Plans from './pages/plans'
import RegisterNews from './pages/registerNews'
import RegisterAds from './pages/registerAds'
import RegisterPlans from './pages/registerPlans'
import NewsEdit from './pages/newsEdit'
import PlansEdit from './pages/plansEdit'
import AdsEdit from './pages/adsEdit'
import BoatNews from './pages/boatNews'
import AdsTerms from './pages/adsTerms'
import TermsOfUse from './pages/termsOfUse'
import AdvancedFilter from './pages/advancedFilter'
import ForgotMyPassword from './pages/forgotMyPassword'

function App() {

  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <AuthContextProvider >
      <Router>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/cardBoatDetails/:id'} element={<CardBoatDetails/>} />
          <Route path={'/boatedit/:id'} element={<BoatEdit/>} />
          <Route path={'/editprofile'} element={<EditProfile/>} />
          <Route path={'/choosePlan'} element={<ChoosePlan/>} />
          <Route path={'/listBoat'} element={<ListBoat/>}/>
          <Route path={'/listBoatByUser/:userID'} element={<ListBoatByUser/>}/>
          <Route path={'/selectPlans'} element={<SelectPlans/>}/>
          <Route path={'/registerBoatBasic'} element={<RegisterBoatsBasic/>} />
          <Route path={'/profile'} element={<Profile/>} />
          <Route path={'/dashboard'} element={<Dashboard/>} />
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/aboutUs'} element={<AboutUs/>} />
          <Route path={'/admin'} element={<Admin/>} />
          <Route path={'/payments'} element={<Payments/>} />
          <Route path={'/news'} element={<News/>} />
          <Route path={'/registerNews'} element={<RegisterNews/>} />
          <Route path={'/newsEdit/:id'} element={<NewsEdit/>} />
          <Route path={'/plansEdit'} element={<PlansEdit/>} />
          <Route path={'/boatNews/:id'} element={<BoatNews/>} />
          <Route path={'/ads'} element={<Ads/>} />
          <Route path={'/users'} element={<Users/>} />
          <Route path={'/plans'} element={<Plans/>} />
          <Route path={'/registerAds'} element={<RegisterAds/>} />
          <Route path={'/registerPlans'} element={<RegisterPlans/>} />
          <Route path={'/adsEdit/:id'} element={<AdsEdit/>} />
          <Route path={'/adsTerms'} element={<AdsTerms/>} />
          <Route path={'/termsOfUse'} element={<TermsOfUse/>} />
          <Route path={'/advancedFilter'} element={<AdvancedFilter/>} /> 
          <Route path={'/forgotMyPassword'} element={<ForgotMyPassword/>} />                    
        </Routes>
      </Router>
      </AuthContextProvider>
    </ChakraProvider>    
  )
}

export default App
