const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.details[0].part}
        exercises={props.details[0].exercises}
      />
      <Part
        part={props.details[1].part}
        exercises={props.details[1].exercises}
      />
      <Part
        part={props.details[2].part}
        exercises={props.details[2].exercises}
      />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exerciseTotal}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const details = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content details={details} />
      <Total
        exerciseTotal={
          details[0].exercises + details[1].exercises + details[2].exercises
        }
      />
    </div>
  );
};

export default App;
