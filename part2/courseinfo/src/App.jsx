const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Part = ({course}) => {
  return (
    <p>{course.name}</p>
  );
};

const Content = ({content}) => {
  return (
      <div>
          {content.map(course =>
            <Part key={course.id} course={course}/>
          )}
      </div>
  );
};


const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
    </div>
  );
};

// const Total = (props) => {
//   return (
//     <div>
//       <p>
//         Number of exercises:{" "}
//         {props.parts[0].exercises +
//           props.parts[1].exercises +
//           props.parts[2].exercises}
//       </p>
//     </div>
//   );
// };



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}


export default App