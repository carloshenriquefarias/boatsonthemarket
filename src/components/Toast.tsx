// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const toastApiResponse = (response: any, customTitle = '') => {
//   if (!response) {
//     toast.success(customTitle || 'Success', {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//     return;
//   }

//   if (response.status === 200) {
//     const apiSuccess = response.data.message || 'Success';
//     toast.success(apiSuccess, {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   } else {
//     const title = customTitle || 'Error occurred';
//     toast.error(title, {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   }
// };
import { toast, ToastPosition, Theme } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastApiResponse = (response: any, customTitle = '', type = 'success') => {
  const baseOptions = {
    position: "top-center" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored" as Theme,
  };

  let message = customTitle;

  if (!response) {
    switch (type) {
      case 'success':
        toast.success(customTitle || 'Success', baseOptions);
        break;
      case 'warning':
        toast.warning(customTitle || 'Warning', baseOptions);
        break;
      case 'error':
        toast.error(customTitle || 'Error', baseOptions);
        break;
      default:
        toast.info(customTitle || 'Info', baseOptions);
    }
    return;
  }

  if (response.status === 200) {
    message = response.data.message || 'Success';
    toast.success(message, baseOptions);
  } else {
    message = response.data.error || customTitle || 'Error occurred';
    toast.error(message, baseOptions);
  }
};
