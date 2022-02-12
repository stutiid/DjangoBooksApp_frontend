import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthorDashboard from './AuthorDashboard';
import BookDashboard from './BookDashboard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/author_dashboard/" element={<AuthorDashboard/>}/>
            <Route exact path="/book_dashboard/" element={<BookDashboard/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
