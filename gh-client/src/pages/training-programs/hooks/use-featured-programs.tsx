import { FeaturedTrainingProgram } from "@/api/models/training-program";
import { getFeaturedTrainingPrograms } from "@/api/services/training-program-service";
import { useEffect, useState } from "react";

export default function useFeaturedTrainingPrograms() {
  const [loadingFeaturedPrograms, setLoadingFeaturedPrograms] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [featuredPrograms, setFeaturedPrograms] = useState<
    FeaturedTrainingProgram[]
  >([]);

  useEffect(() => {
    setLoadingFeaturedPrograms(true);
    getFeaturedTrainingPrograms()
      .then((programs) => {
        if (programs.length == 0) setIsEmpty(true);
        setFeaturedPrograms(programs);
      })
      .catch((error) => setIsEmpty(true))
      .finally(() => setLoadingFeaturedPrograms(false));
  }, []);

  return { featuredPrograms, loadingFeaturedPrograms, isEmpty };
}
