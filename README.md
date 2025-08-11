# 🚗 Rental Car - Frontend for car rental service

Web only Frontend application for booking a car with express filters by brand, price, and mileage.

## ⚙️ Technologies

<table>
<tr>
<td valign="top" width="50%">

#### 🖥 Framework & Core

[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)  
[![React DOM](https://img.shields.io/badge/React_DOM-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)  
[![React Router DOM](https://img.shields.io/badge/React_Router_DOM-CA4245?style=flat&logo=react-router&logoColor=white)](https://reactrouter.com/)

#### 📦 State & Data Management

[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)  
[![React Redux](https://img.shields.io/badge/React_Redux-764ABC?style=flat&logo=redux&logoColor=white)](https://react-redux.js.org/)  
[![Redux Persist](https://img.shields.io/badge/Redux_Persist-764ABC?style=flat&logo=redux&logoColor=white)](https://github.com/rt2zz/redux-persist)

#### 🛠 Utils

[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat)](https://axios-http.com/)  
[![date-fns](https://img.shields.io/badge/date--fns-770C56?style=flat)](https://date-fns.org/)  
[![clsx](https://img.shields.io/badge/clsx-2F4F4F?style=flat)](https://github.com/lukeed/clsx)  
[![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FFDD00?style=flat)](https://react-hot-toast.com/)

</td>
<td valign="top" width="50%">

#### 🎨 UI & Styling

[![modern-normalize](https://img.shields.io/badge/modern--normalize-000000?style=flat)](https://github.com/sindresorhus/modern-normalize)  
[![React Select](https://img.shields.io/badge/React_Select-61DAFB?style=flat&logo=react&logoColor=black)](https://react-select.com/)

#### 📝 Forms & Validation

[![Formik](https://img.shields.io/badge/Formik-FF5733?style=flat)](https://formik.org/)  
[![Yup](https://img.shields.io/badge/Yup-4B8BBE?style=flat)](https://github.com/jquense/yup)  
[![React Datepicker](https://img.shields.io/badge/React_Datepicker-4A90E2?style=flat)](https://reactdatepicker.com/)

</td>
</tr>
</table>

### 📦 Installation

```bash
git clone https://github.com/di-zinevych02/RentalCar-App.git
cd car-rental-app
npm install
npm run dev
```

### 💡 Usage:

- Go to pages:
  - / - Home page.
    Main page or by clicking on Home in the site header
  - /catalog - Catalog page.
    Using the "View Catalog" button on the main page or by clicking on "Catalog" in the site header
  - /catalog/:id - Individual car page.
    Using the "Read more" button on the vehicle card on the catalog page.
- Filtering vehicles by:
  car brand(one brand can be selected)
  price(one price can be selected)
  car mileage(can be selected "from" and "to" separately or simultaneously).
- Adding vehicles to the list of favorites and saving them when refreshing the page.
- Loading cards(pagination) using the "Load More" button taking into account the selected filters, notification when all cards are loaded.
- Filling out the car rental form with the necessary fields on the individual car page, with a notification displayed upon successful submission.

#### Backend documentation:

https://car-rental-api.goit.global/api-docs/

### 👨‍💻 Author

Diana Zinevych
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/diana-zinevych/)
