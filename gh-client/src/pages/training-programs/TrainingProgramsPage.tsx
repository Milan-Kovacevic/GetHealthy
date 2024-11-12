import { useState } from "react";
import InfiniteScroll from "@/components/ui/infnite-scroll";
import { Search } from "../shared/Search";
import { TrainingProgramCard } from "./components/TrainingProgramCard";

const TrainingProgramsPage = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // Simulate fetching more data
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...Array.from({ length: 20 })]);
    }, 1500);
  };

  return (
    <section className="relative overflow-hidden px-2 h-full">
      <div className="container mx-auto my-auto h-full">
        <div className="mx-auto flex max-w-5xl flex-col items-center py-10">
          <Search></Search>
          <InfiniteScroll
            next={fetchMoreData} // Function to fetch more data
            hasMore={hasMore} // Boolean to track if more data is available
            isLoading={false}
          >
            {items.map((_, index) => (
              <TrainingProgramCard
                title={"Trening program" + index.toString()}
                description="Nesto"
                key={index}
                img="https://cdn-icons-png.flaticon.com/512/9584/9584876.png"
              ></TrainingProgramCard>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};

export default TrainingProgramsPage;
