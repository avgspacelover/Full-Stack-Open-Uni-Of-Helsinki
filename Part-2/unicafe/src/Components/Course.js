const Header = (c) => {
  
  const { name } = c.course;

  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};


const Part = (p) => {

  return (
    <p>
      {p.part} , {p.exercise}
    </p>
  );
};

const Content = (props) => {
  
  const { parts } = props.parts;

  return (
    <div>
      {parts.map((item) => {
        return <Part key={item.id} part={item.name} exercise={item.exercises} />;
      })}
    </div>
  );
};


const Total = (props) => {
  
  const { parts } = props.parts;
  const exercises = parts.map(part => part.exercises)
  const totalExercises = exercises.reduce((sum, item) => sum += item)

  return (
    <div>
      <p>Total no. of exercises, {totalExercises}</p>
    </div>
  );
};


const Course = (props) => {
  

  return (
    <div>
      {props.course.map((item) => {
        return (
          <div>
            <Header key={item.id} course={item} />

            <Content key={item.id} parts={item} />

            <Total key={item.id} parts={item} />
          </div>
        );
      })}
    </div>
  );
};


export default Course