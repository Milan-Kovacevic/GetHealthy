import { FeaturedTrainingProgram } from "@/api/models/training-program";
import { getFeaturedTrainingPrograms } from "@/api/services/training-program-service";
import { useEffect, useState } from "react";

export default function useFeaturedTrainingPrograms() {
  const [loadingFeaturedPrograms, setLoadingFeaturedPrograms] = useState(false);
  const [featuredPrograms, setFeaturedPrograms] = useState<
    FeaturedTrainingProgram[]
  >([]);

  useEffect(() => {
    setLoadingFeaturedPrograms(true);
    getFeaturedTrainingPrograms()
      .then((programs) => {
        setFeaturedPrograms(programs);
      })
      .finally(() => setLoadingFeaturedPrograms(false));
  }, []);

  return { featuredPrograms, loadingFeaturedPrograms };
}
