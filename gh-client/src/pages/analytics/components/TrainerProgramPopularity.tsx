import HorizontalBarChart from "./HorizontalBarChart";

// Mock data for training programs
const trainingData = [
  { program: "Leadership Skills", averageRating: 4.5, totalParticipants: 150 },
  { program: "Technical Writing", averageRating: 4.2, totalParticipants: 120 },
  { program: "Project Management", averageRating: 4.7, totalParticipants: 200 },
  { program: "Data Analysis", averageRating: 4.3, totalParticipants: 180 },
  { program: "Public Speaking", averageRating: 4.1, totalParticipants: 100 },
];

export default function TrainerProgramPopularity() {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HorizontalBarChart
          data={trainingData}
          dataKey="averageRating"
          title="Average Ratings"
          config={{
            averageRating: {
              label: "Average Ratings",
              color: "hsl(var(--chart-1)/0.6)",
            },
          }}
          yDataKey="program"
          yType="category"
          description="Average ratings for each training program"
        />
        <HorizontalBarChart
          data={trainingData}
          dataKey="totalParticipants"
          title="Total Participants"
          config={{
            totalParticipants: {
              label: "Total Participants",
              color: "hsl(var(--chart-2)/0.6)",
            },
          }}
          yDataKey="program"
          yType="category"
          description="Total participants for each training program"
        />
      </div>
    </div>
  );
}
