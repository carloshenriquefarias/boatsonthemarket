import LinkMenu from './LinkMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
// import MenuContainer from './Language';
// import MenuContainer from './MenuDrop';
// import { Box } from '@chakra-ui/react';

type MenuProps = {
  color: string;
}

export default function Menu({ color }: MenuProps) {

  const navigate = useNavigate();
  const { user } = useAuth();

  function isValidUser(user: any) {
    return user !== null && user.id !== '' && user.name !== '' && user.email !== '';
  }

  function isNotValidUser(user: any): boolean {
    return user === null || user.id === '' || user.name === '' || user.email === '';
  }

  function handleClickGoHome() {
    navigate('/');
  }

  const handleClickGoListBoatByType = (boatType: string) => {
    localStorage.setItem('boatType', boatType);
    navigate('/listBoat');
  };

  function handleSelectListPlans() {
    navigate('/selectPlans');
  }

  function handleLogin() {
    { isValidUser(user) ? navigate('/registerBoatBasic') : navigate('/login'); }
  }

  function handleGoToDashboard() {
    { user && navigate('/dashboard') }
  }

  function handleGoToAdmin() {
    { user?.is_admin && navigate('/admin') }
  }

  function handleGoToPayments() {
    { user?.is_admin && navigate('/payments') }
  }

  function handleGoToNews() {
    { user && navigate('/news') }
  }

  // function handleGoToBoatNews() {
  //   navigate('/boatNews')
  // }

  function handleGoToAds() {
    navigate('/ads')
  }

  function handleGoToPlans() {
    navigate('/plans')
  }

  function handleClickGoAboutUs() {
    navigate('/aboutUs');
  }

  function handleClickGoUsers() {
    navigate('/users');
  }

  function handleClickAdsTerms() {
    navigate('/adsTerms');
  }

  function handleClickTermsOfUse() {
    navigate('/termsOfUse');
  }

  return (
    <>
      <LinkMenu titleMenu='Home' fontColorLink={color} onClick={handleClickGoHome} />
      <LinkMenu titleMenu='Boats for Sale' fontColorLink={color} onClick={() => handleClickGoListBoatByType('')} />
      <LinkMenu titleMenu='Sell a Boat' fontColorLink={color} onClick={handleLogin} />

      {isNotValidUser(user) && ( <LinkMenu titleMenu='Our Plans' fontColorLink={color} onClick={handleSelectListPlans} />)}

      <LinkMenu titleMenu='About Us' fontColorLink={color} onClick={handleClickGoAboutUs} />
      <LinkMenu titleMenu='Privacy Police' fontColorLink={color} onClick={handleClickAdsTerms} />
      <LinkMenu titleMenu='Terms of Use' fontColorLink={color} onClick={handleClickTermsOfUse} />
      
      {/* <Box mt={0}>
        <MenuContainer/>
      </Box> */}
      {isValidUser(user) && (<LinkMenu titleMenu='Dashboard' fontColorLink={color} onClick={handleGoToDashboard} />)}

      {user && user.is_admin == '1' && (
        <>
          {isValidUser(user) && (<LinkMenu titleMenu='Admin' fontColorLink={color} onClick={handleGoToAdmin} />)}
          {isValidUser(user) && (<LinkMenu titleMenu='Payments' fontColorLink={color} onClick={handleGoToPayments} />)}
          {isValidUser(user) && (<LinkMenu titleMenu='News' fontColorLink={color} onClick={handleGoToNews} />)}
          {isValidUser(user) && (<LinkMenu titleMenu='Ads' fontColorLink={color} onClick={handleGoToAds} />)}
          {isValidUser(user) && (<LinkMenu titleMenu='Users' fontColorLink={color} onClick={handleClickGoUsers} />)}
          {isValidUser(user) && (<LinkMenu titleMenu='Plans' fontColorLink={color} onClick={handleGoToPlans} />)}
        </>
      )}

      {isNotValidUser(user) && (<LinkMenu titleMenu='Login' fontColorLink={color} onClick={handleLogin} />)}
      {/* <MenuContainer/> */}
    </>
  )
}