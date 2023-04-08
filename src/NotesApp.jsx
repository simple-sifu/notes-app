import React, {useState}  from "react";
import "./index.css";

function NotesApp () {
    const [titleInputValue, setTitleInputValue] = useState('');
    const [statusInputValue, setStatusInputValue] = useState('');
    const [completedNotes, setCompletedNotes] = useState([]);
    const [activeNotes, setActiveNotes] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [selectedTab, setSelectedTab] = useState('All');

    const onTitleHandler = (event) => {
        setTitleInputValue(event.target.value)
    }

    const onStatusHandler = (event) => {
        setStatusInputValue(event.target.value)
    }

    const addNotesHandler = () => {

        // array is used in case more status conditions are needed,
        // like pending, in progress might be added to active status.
        if (['active'].includes(statusInputValue.toLowerCase())){
            setActiveNotes((curr) =>  [...curr, ...[{
                title: titleInputValue,
                status: statusInputValue
            }]]);
        }else if (['completed'].includes(statusInputValue.toLowerCase())){
            setCompletedNotes((curr) =>  [...curr, ...[{
                title: titleInputValue,
                status: statusInputValue
            }]]);
        }else {
            setAllNotes((curr) =>  [...curr, ...[{
                title: titleInputValue,
                status: statusInputValue
            }]]);
        }
    
        setTitleInputValue('');
        setStatusInputValue('');
    }

    const selectTabHandler = (tabName) => {
        setSelectedTab(tabName);
    }

    let displayNotes = []
    if (selectedTab === 'All'){
        displayNotes = ([...activeNotes, ...completedNotes, ...allNotes])
    } else if (selectedTab === 'Active'){
        displayNotes = ([...activeNotes])
    } else if (selectedTab === 'Completed'){
        displayNotes = ([...completedNotes])
    }

  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <input 
            data-testid="input-note-name" 
            type="text" 
            className="large mx-8"
            placeholder="Note Title"
            value={titleInputValue}
            onChange={
                (event) => {
                    return onTitleHandler(event)
                }
            }
        />
        <input 
            data-testid="input-note-status" 
            type="text" 
            className="large mx-8"
            placeholder="Note Status"
            value={statusInputValue}
            onChange={
                (event) => {
                    return onStatusHandler(event)
                }
            }
        />
        <button 
            className="" 
            data-testid="submit-button"
            onClick={
                () => {
                    return addNotesHandler()
                }
            }
        >
            Add Note
        </button>
      </section>

      <div className="mt-50">
        <ul className="tabs">
          <li 
            className="tab-item slide-up-fade-in" 
            data-testid="allButton"
            onClick = {() => selectTabHandler("All")}
           >
            All
           </li>
          <li
            className="tab-item slide-up-fade-in" 
            data-testid="activeButton"
            onClick = {() => selectTabHandler("Active")}
           >
            Active
           </li>
          <li 
            className="tab-item slide-up-fade-in" 
            data-testid="completedButton"
            onClick = {() => selectTabHandler("Completed")}
          >
            Completed
          </li>
        </ul>
      </div>
      <div className="card w-40 pt-30 pb-8">
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody data-testid="noteList">
            { 
              displayNotes.map((note) => {
                return (
                    <tr key={note.title}>
                        <td>{note.title}</td>
                        <td>{note.status}</td>
                    </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotesApp