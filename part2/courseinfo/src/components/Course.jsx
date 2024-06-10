const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    );
  };
  
  const Part = ({course}) => {
    return (
      <p>{course.name} {course.exercises}</p>
    );
  };
  
  const Total = ({exercises}) => {
  
    const result = exercises.map(exercise => exercise.exercises);
    const totalExercises = result.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    
    return (
      <div>
        <h4>
          Total of {totalExercises} exercises
        </h4>
      </div>
    );
  };
  
  
  const Content = ({content}) => {
    return (
        <div>
            {content.map(course =>
              <Part key={course.id} course={course}/>
            )}
            <Total exercises={content} />
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
    
export default Course;