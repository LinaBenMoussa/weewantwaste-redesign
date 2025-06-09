import { Routes, Route } from 'react-router-dom';
import { SelectSkipPage } from './pages/SelectSkipPage';
import Layout from './components/layout/Layout';
import { WasteTypePage } from './pages/WasteTypePage';
import { PostCodePage } from './pages/PostCodePage';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SelectSkipPage />} />
        <Route path="/select-skip" element={<SelectSkipPage />} />
         <Route path="/waste-type" element={<WasteTypePage />} />
          <Route path="/postcode" element={<PostCodePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
