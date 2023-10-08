# Goshen Portal

This project is developed with a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## todos

### Components

- [ ] Transaction invoice
- [ ] Transaction receipt
- [ ] Result sheet

### Screens / Pages

- [ ] Payment page
- [ ] Home Page

Student selects Invoice
Sees previous invoice generated, if any
Click Generate nee invoice
Select session, term, payment purpose and payment method.

For any new invoice generate, and 'I've made payment button have not been clicked, the button appears and the student clicks.

It triggers a Modal component that the student uploads payment confirmation and submits.

Admin gets notification to confirm transaction that reciept will be available on students portal for printing whilst the student is informed to check back to print reciept
