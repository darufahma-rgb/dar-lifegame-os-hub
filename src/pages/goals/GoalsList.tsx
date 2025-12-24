import { Helmet } from "react-helmet-async";
import SubpageLayout from "@/components/layout/SubpageLayout";
import { Target, Plus, Calendar, CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  category: string;
  categoryColor: string;
  milestones: { title: string; completed: boolean }[];
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Launch Side Project",
    description: "Build and launch my SaaS product to first 100 users",
    progress: 65,
    deadline: "2024-06-01",
    category: "Career",
    categoryColor: "bg-purple-500",
    milestones: [
      { title: "Complete MVP design", completed: true },
      { title: "Build core features", completed: true },
      { title: "Beta testing", completed: false },
      { title: "Launch marketing", completed: false },
    ],
  },
  {
    id: "2",
    title: "Run Half Marathon",
    description: "Complete a 21km half marathon under 2 hours",
    progress: 40,
    deadline: "2024-09-15",
    category: "Health",
    categoryColor: "bg-pink-500",
    milestones: [
      { title: "Run 5km consistently", completed: true },
      { title: "Run 10km", completed: true },
      { title: "Run 15km", completed: false },
      { title: "Complete half marathon", completed: false },
    ],
  },
  {
    id: "3",
    title: "Read 24 Books",
    description: "Read 24 books this year (2 per month)",
    progress: 33,
    deadline: "2024-12-31",
    category: "Growth",
    categoryColor: "bg-cyan-500",
    milestones: [
      { title: "Read 8 books (Q1)", completed: true },
      { title: "Read 16 books (Q2)", completed: false },
      { title: "Read 20 books (Q3)", completed: false },
      { title: "Read 24 books (Q4)", completed: false },
    ],
  },
];

const GoalsList = () => {
  const [goals] = useState(mockGoals);

  return (
    <>
      <Helmet>
        <title>Goals - Dar Lifegame OS</title>
        <meta name="description" content="Track your life goals and milestones with Dar Lifegame OS." />
      </Helmet>

      <SubpageLayout 
        title="Goals" 
        subtitle="Your main quests and objectives"
        breadcrumbs={[{ label: "Goals", href: "/goals/list" }, { label: "List", href: "/goals/list" }]}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="w-5 h-5 text-primary" />
            <span>{goals.length} active goals</span>
          </div>
          <Button variant="hero" size="sm">
            <Plus className="w-4 h-4" />
            New Goal
          </Button>
        </div>

        {/* Goals */}
        <div className="space-y-6">
          {goals.map((goal) => (
            <div 
              key={goal.id}
              className="bg-card/30 rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${goal.categoryColor}`} />
                  <span className="text-sm text-muted-foreground">{goal.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {goal.title}
              </h3>
              <p className="text-muted-foreground mb-6">{goal.description}</p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-primary">{goal.progress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-neon-purple rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Milestones
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {goal.milestones.map((milestone, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
                    >
                      {milestone.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm ${milestone.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SubpageLayout>
    </>
  );
};

export default GoalsList;
