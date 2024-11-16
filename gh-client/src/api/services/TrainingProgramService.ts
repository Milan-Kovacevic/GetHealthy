export type TrainingProgram = {
  title: string;
  description: string;
  id: number;
  category: string;
};

export default class TrainingProgramService {
  private programs: TrainingProgram[] = [
    {
      id: 1,
      title: "JavaScript Basics",
      description: "Introductory course on JavaScript.",
      category: "JS",
    },
    {
      id: 2,
      title: "React Fundamentals",
      description: "Learn the fundamentals of React.",
      category: "React",
    },
    {
      id: 3,
      title: "TypeScript Essentials",
      description: "Learn the basics of TypeScript.",
      category: "TS",
    },
    {
      id: 4,
      title: "Advanced React",
      description: "Deep dive into React's advanced concepts.",
      category: "React",
    },
    {
      id: 5,
      title: "Node.js for Beginners",
      description: "Learn server-side JavaScript with Node.js.",
      category: "JS",
    },
    {
      id: 6,
      title: "Express.js Crash Course",
      description: "Learn to build REST APIs with Express.js.",
      category: "JS",
    },
    {
      id: 7,
      title: "Full-Stack JavaScript",
      description: "End-to-end web development with JavaScript.",
      category: "JS",
    },
    {
      id: 8,
      title: "Data Structures in JavaScript",
      description: "Master data structures using JavaScript.",
      category: "JS",
    },
    {
      id: 9,
      title: "CSS Mastery",
      description: "Become proficient in CSS and responsive design.",
      category: "CSS",
    },
    {
      id: 10,
      title: "Modern HTML5",
      description: "Explore the latest features of HTML5.",
      category: "HTML",
    },
    {
      id: 11,
      title: "Functional Programming in JavaScript",
      description: "Learn functional programming concepts with JavaScript.",
      category: "JS",
    },
    {
      id: 12,
      title: "JavaScript Algorithms",
      description: "Sharpen your algorithm skills using JavaScript.",
      category: "JS",
    },
    {
      id: 13,
      title: "Vue.js Essentials",
      description: "Get started with Vue.js for front-end development.",
      category: "JS",
    },
    {
      id: 14,
      title: "Angular Basics",
      description: "Introduction to Angular and its ecosystem.",
      category: "Angular",
    },
  ];

  public async getFilteredPrograms(
    searchString: string,
    category: string,
    sortType: string
  ): Promise<TrainingProgram[]> {
    console.log(searchString, category, sortType);
    return Promise.resolve(
      this.programs
        .filter((item) => {
          if (category === "All") return true;
          return category.toLowerCase() === item.category.toLowerCase();
        })
        .filter((item) => {
          if (searchString.length === 0) return true;
          return item.title.toLowerCase().includes(searchString.toLowerCase());
        })
        .sort((x, y) => {
          return sortType === "asc"
            ? x.title.localeCompare(y.title)
            : y.title.localeCompare(x.title);
        })
    );
  }
}
