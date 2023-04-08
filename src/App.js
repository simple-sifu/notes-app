import './App.css';
import NotesApp from './NotesApp';
import 'h8k-components';

function App() {
  return (
    <div>
      <h8k-navbar header={"Notes App"} />
      <NotesApp initial={50}/>
    </div>

  );
}

export default App;
 