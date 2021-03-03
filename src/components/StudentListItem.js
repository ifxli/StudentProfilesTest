import { TagEditor } from './';

function StudentListItem(props) {
  var avg = 0;
  if (props.student.grades) {
    var sum = 0;
    for(var i = 0; i < props.student.grades.length; i++){
      sum += parseInt(props.student.grades[i], 0);
    }
    avg = sum / props.student.grades.length;
  }

  return (
    <li className="student-item">
      <img src={props.student.pic} className="avatar"/>
      <div className="student-details">
        <div>
          <div className="name">{props.student.firstName} {props.student.lastName}</div>
          <div className="profile-row">Email: {props.student.email}</div>
          <div className="profile-row">Company: {props.student.company}</div>
          <div className="profile-row">Skill: {props.student.skill}</div>
          <div className="profile-row">Average: {avg}%</div>
          {
            props.student.id === props.extendedIndex && 
            props.student.grades.map((item, index) => {
              return <div className="profile-row">Test{index + 1}:&nbsp;&nbsp;&nbsp;{item}%</div>
            })
          }
          <TagEditor tags={props.student.tags ? props.student.tags : []} onTagAdded={(tag) => {
            props.addStudentTag(props.student.id, tag);
          }}/>
        </div>
        <button
          className="expand-button"
          onClick={() => props.onClickButton(props.extendedIndex === props.student.id ? -1 : props.student.id)}
        >
          {props.student.id === props.extendedIndex ? "-" : "+"}
        </button>
      </div>
    </li>
  )
}

export default StudentListItem;
