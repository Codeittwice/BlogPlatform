import { Priorities } from "./enums";

export const DUMMY_TASKS = [
  {
    key: "t1",
    id: "t1",
    title: "Learn React",
    description:
      "Watch the course. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit lacus id ante dapibus, a luctus metus ultrices. Vivamus feugiat dapibus lacinia. Duis diam tortor, scelerisque sit amet turpis ac, porta aliquet augue. In sollicitudin risus at velit luctus, quis volutpat est porttitor. Phasellus nibh risus, vehicula eu maximus eleifend, tempor non magna. Sed in tincidunt sapien, id auctor elit. Mauris nisi tellus, ullamcorper id turpis at, consequat interdum sapien. ",
    dueDate: new Date(2023, 7, 10).toDateString(),
    priority: Priorities.low,
    completedStatus: false,
  },
  {
    key: "t2",
    id: "t2",
    title: "Learn JavaScript",
    description:
      "Watch the course. \n Nullam quam lectus, mattis quis lobortis sed, bibendum quis ante. Curabitur sed viverra leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum vulputate leo lectus, eget porttitor lorem facilisis bibendum. Integer ac est commodo, dignissim nulla et, fringilla justo. ",
    dueDate: new Date(2023, 8, 1).toDateString(),
    priority: Priorities.high,
    completedStatus: false,
  },
  {
    key: "t3",
    id: "t3",
    title: "Learn TypeScript",
    description:
      "Watch the course. \n Vivamus euismod maximus orci eu malesuada. Maecenas eu sapien tristique, tincidunt velit sed, maximus lacus. Proin convallis eros vel dui lobortis, quis placerat elit mattis. Integer varius euismod sem ac condimentum.  ",
    dueDate: new Date(2023, 6, 23).toDateString(),
    priority: Priorities.middle,
    completedStatus: false,
  },
];
