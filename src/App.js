import { useState, useEffect } from 'react';
import { StudentListItem } from './components';
import './App.css';

function getFilteredProfiles(profiles, filterString, tagFilterString) {
  var filteredProfiles = [];
  for(var i = 0; i < profiles.length; i++) {
    let nameFilter = profiles[i].firstName.toLowerCase().includes(filterString) 
                  || profiles[i].lastName.toLowerCase().includes(filterString);
    let tagFilter = tagFilterString === "" || (
                    tagFilterString !== "" && profiles[i].tags && 
                    (profiles[i].tags.filter(tag => tag.includes(tagFilterString))).length > 0
                  );
    if (nameFilter && tagFilter) {
      filteredProfiles.push(profiles[i]);
    }
  }
  return filteredProfiles;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [extendedIndex, setExpandedIndex] = useState(-1);
  const [filterString, setFilterString] = useState('');
  const [tagFilterString, setTagFilterString] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("https://api.hatchways.io/assessment/students")
      const json = await res.json()
      setIsLoaded(true)
      setProfiles(json.students)
      setFilteredProfiles(json.students)
    }
    fetchStudents()
  }, []);

  return (
    <div className="app">
      {!isLoaded 
        ? <div>Loading...</div> 
        : <div className="content">
            <input
              className="search-input"
              placeholder="Search by name"
              onChange={(e) => {
                setFilterString(e.target.value.toLowerCase());
                setFilteredProfiles(getFilteredProfiles(profiles, e.target.value.toLowerCase(), tagFilterString))
              }}
            />
            <input
              className="search-input"
              placeholder="Search by tag"
              onChange={e => {
                setTagFilterString(e.target.value.toLowerCase());
                setFilteredProfiles(getFilteredProfiles(profiles, filterString, e.target.value.toLowerCase()))
              }}
            />
            <ul className="list">
              {filteredProfiles.map((item, index) => {
                  return (
                    <StudentListItem
                      key={index}
                      student={item}
                      extendedIndex={extendedIndex}
                      onClickButton={(studentId) => {
                        setExpandedIndex(studentId);
                      }}
                      addStudentTag={(studentId, tag) => {
                        let tempData = [...profiles];
                        let student = tempData.filter(student => student.id === studentId)[0];

                        let tags = student.tags ? student.tags : [];
                        tags.push(tag);
                        student.tags = tags;

                        setProfiles(tempData);
                        setFilteredProfiles(getFilteredProfiles(tempData, filterString, tagFilterString));
                      }}
                    />
                  )
              })}
            </ul>
          </div>
      }
    </div>
  );
}

export default App;
