export type Category = {
  title: string;
  id: number;
};

export default class CategoryService {
  private categories: Category[] = [
    {
      id: 0,
      title: "All",
    },
    {
      id: 1,
      title: "JS",
    },
    {
      id: 2,
      title: "React",
    },
    {
      id: 3,
      title: "TS",
    },
    {
      id: 4,
      title: "CSS",
    },
    {
      id: 5,
      title: "HTML",
    },
    {
      id: 6,
      title: "Jest",
    },
  ];

  public async get(): Promise<Category[]> {
    return this.categories;
  }
}
