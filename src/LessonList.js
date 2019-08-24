import React from 'react'


export const lessons = [
  { title: 'Lesson 1: title', description: 'Lesson 1: description' },
  { title: 'Lesson 2: title', description: 'Lesson 2: description' },
  { title: 'Lesson 3: title', description: 'Lesson 3: description' },
  { title: 'Lesson 4: title', description: 'Lesson 4: description' },
]


const Lesson = ({ lesson: {title, description}, index }) => <>
  <h1 onClick={() => console.log(`${index} - ${title}`)}>{`${index} - ${title}`}</h1>
  <p>{description}</p>
</>


export const LessonList = ({ lessons }) => <>
  {lessons.map((lsn, i) => <Lesson key={i} index={i} lesson={lsn} />)}
</>

