# REMWaste Frontend Challenge

## 📝 Description

This project is a redesign of the **"Choose Your Skip Size"** page from REMWaste.  
The goal was to improve the **UI/UX**, make the page **responsive**, and keep the **functionality intact**.

✅ Built with **React** using **Create React App**  
✅ Styled with **Tailwind CSS** for fast and responsive UI design  
✅ Data is fetched from this API:  
`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`

---

## 🚀 How to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/LinaBenMoussa/weewantwaste-redesign.git
cd remwaste-skip-selector

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
---

## ✨ Features

- ✅ Clean and modern skip selection page  
- ✅ Fully responsive (mobile + desktop)  
- ✅ Fetches and displays real skip data  
- ✅ Simple and clean component structure


## File Structure
src/
├── components/ # Reusable UI components (e.g. SkipCard, Header)
├── pages/ # Main pages (e.g. SkipSelectionPage)
├── hooks/ # Custom React hooks (e.g. useSkipsByLocation)
├── services/ # API services (e.g. skipApi.js for fetching data)
├── App.js # Root component that handles routes and layout
└── index.js # Entry point for React app
