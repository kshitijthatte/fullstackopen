import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0);
  return <strong>total of {sum} exercises</strong>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
