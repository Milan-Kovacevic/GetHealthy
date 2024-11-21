export type TrainingProgram = {
  title: string;
  description: string;
  id: number;
  category: string;
  difficulty: string;
};

export default class TrainingProgramService {
  private programs: TrainingProgram[] = [
    {
      id: 1,
      title: "JavaScript Basics",
      description: "Introductory course on JavaScript.",
      category: "JS",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "React Fundamentals",
      description: "Learn the fundamentals of React.",
      category: "React",
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "TypeScript Essentials",
      description: "Learn the basics of TypeScript.",
      category: "TS",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Advanced React",
      description: "Deep dive into React's advanced concepts.",
      category: "React",
      difficulty: "Advanced",
    },
    {
      id: 5,
      title: "Node.js for Beginners",
      description: "Learn server-side JavaScript with Node.js.",
      category: "JS",
      difficulty: "Beginner",
    },
    {
      id: 6,
      title: "Express.js Crash Course",
      description: "Learn to build REST APIs with Express.js.",
      category: "JS",
      difficulty: "Advanced",
    },
    {
      id: 7,
      title: "Full-Stack JavaScript",
      description: "End-to-end web development with JavaScript.",
      category: "JS",
      difficulty: "Beginner",
    },
    {
      id: 8,
      title: "Data Structures in JavaScript",
      description: "Master data structures using JavaScript.",
      category: "JS",
      difficulty: "Beginner",
    },
    {
      id: 9,
      title: "CSS Mastery",
      description: "Become proficient in CSS and responsive design.",
      category: "CSS",
      difficulty: "Intermediate",
    },
    {
      id: 10,
      title: "Modern HTML5",
      description: "Explore the latest features of HTML5.",
      category: "HTML",
      difficulty: "Advanced",
    },
    {
      id: 11,
      title: "Functional Programming in JavaScript",
      description: "Learn functional programming concepts with JavaScript.",
      category: "JS",
      difficulty: "Intermediate",
    },
    {
      id: 12,
      title: "JavaScript Algorithms",
      description: "Sharpen your algorithm skills using JavaScript.",
      category: "JS",
      difficulty: "Advanced",
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
