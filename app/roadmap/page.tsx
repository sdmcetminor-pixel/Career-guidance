"use client";

import { useState } from "react";

type Video = {
  title: string;
  url: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Quiz = {
  questions: QuizQuestion[];
};

type RoadmapNode = {
  id: string;
  title: string;
  description: string;
  videos: Video[];
};

const roadmapData: RoadmapNode[] = [
  {
    id: "html",
    title: "HTML",
    description: "Learn how to structure web pages using HTML.",
    videos: [
      {
        title: "HTML Tutorial for Beginners",
        url: "https://www.youtube.com/embed/FQdaUv95mR8",
      },
      {
        title: "Forms & Semantic HTML",
        url: "https://www.youtube.com/embed/PlxWf493en4",
      },
    ],
  },
  {
    id: "css",
    title: "CSS",
    description: "Style web pages and create beautiful layouts.",
    videos: [
      {
        title: "CSS Full Course",
        url: "https://www.youtube.com/embed/yfoY53QXEnI",
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Add logic and interactivity to websites.",
    videos: [
      {
        title: "JavaScript Basics",
        url: "https://www.youtube.com/embed/W6NZfCO5SIk",
      },
    ],
  },
  {
    id: "react",
    title: "React",
    description: "Build scalable, component-based user interfaces.",
    videos: [
      {
        title: "React Full Course",
        url: "https://www.youtube.com/embed/bMknfKXIFA8",
      },
    ],
  },
];

export default function RoadmapPage() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleGenerateQuiz = async (video: Video) => {
    setLoadingQuiz(true);
    setQuizError(null);
    setUserAnswers({});
    setShowResults(false);
    setSelectedVideo(video);

    try {
      const response = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: video.url }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate quiz");
      }

      const quizData: Quiz = await response.json();
      setQuiz(quizData);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      setQuizError(message);
      setQuiz(null);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (
        userAnswers[idx] &&
        userAnswers[idx].charAt(0) === q.correctAnswer
      ) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-14">
        Full Stack Developer Learning Journey
      </h1>

      <div className="flex gap-14 max-w-7xl mx-auto">
        {/* LEFT – JOURNEY */}
        <div className="relative w-1/4">
          <div className="absolute left-6 top-0 h-full w-[2px] bg-gray-300" />

          {roadmapData.map((node, index) => {
            const isActive = selectedNode?.id === node.id;

            return (
              <div key={node.id} className="relative flex items-start mb-14">
                {/* DOT */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer font-bold z-10 transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-white border-2 border-gray-300 text-gray-600 hover:border-blue-400"
                    }
                  `}
                >
                  {index + 1}
                </div>

                {/* LABEL */}
                <div className="ml-5">
                  <p
                    className={`text-lg font-semibold ${
                      isActive ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {node.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Step {index + 1}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT – CONTENT */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 max-h-[85vh] overflow-y-auto">
          {!selectedNode ? (
            <p className="text-gray-600 text-center mt-20">
              Select a topic from the left to get started 👈
            </p>
          ) : quiz && selectedVideo ? (
            // QUIZ VIEW
            <div>
              <button
                onClick={() => {
                  setQuiz(null);
                  setUserAnswers({});
                  setShowResults(false);
                  setSelectedVideo(null);
                }}
                className="mb-4 text-blue-600 hover:text-blue-800 underline text-sm font-semibold"
              >
                ← Back to Videos
              </button>

              <h2 className="text-3xl font-bold mb-2">
                {selectedVideo.title} – Quiz
              </h2>
              <p className="text-gray-600 mb-6">
                Test your understanding with AI-generated questions
              </p>

              {quizError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
                  <p className="font-semibold">Error:</p>
                  <p className="text-sm">{quizError}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {quiz.questions.map((q, idx) => (
                    <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="font-semibold mb-4 text-gray-800">
                        {idx + 1}. {q.question}
                      </h3>
                      <div className="space-y-3">
                        {q.options.map((option, optIdx) => (
                          <label
                            key={optIdx}
                            className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-white transition"
                          >
                            <input
                              type="radio"
                              name={`question-${idx}`}
                              value={option}
                              checked={userAnswers[idx] === option}
                              onChange={() =>
                                handleAnswerSelect(idx, option)
                              }
                              className="mr-3 mt-1"
                              disabled={showResults}
                            />
                            <span className="text-gray-700">{option}</span>
                            {showResults && (
                              <span className="ml-auto font-semibold">
                                {option.charAt(0) === q.correctAnswer ? (
                                  <span className="text-green-600">✓ Correct</span>
                                ) : userAnswers[idx] === option ? (
                                  <span className="text-red-600">✗ Wrong</span>
                                ) : null}
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {!showResults && (
                    <button
                      onClick={() => setShowResults(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition mt-6"
                    >
                      Submit Quiz
                    </button>
                  )}

                  {showResults && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-bold text-2xl text-gray-800 mb-2">
                        Score: {calculateScore()} / {quiz.questions.length}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {calculateScore() === quiz.questions.length
                          ? "🎉 Perfect! Excellent understanding!"
                          : calculateScore() >=
                            Math.ceil(quiz.questions.length * 0.7)
                          ? "👍 Good job! You understand the basics."
                          : "📚 Keep studying and try again!"}
                      </p>
                      <button
                        onClick={() => {
                          setQuiz(null);
                          setUserAnswers({});
                          setShowResults(false);
                          setSelectedVideo(null);
                        }}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                      >
                        Try Another Video
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            // VIDEOS VIEW
            <>
              <h2 className="text-3xl font-bold mb-2">
                {selectedNode.title}
              </h2>
              <p className="text-gray-600 mb-8">
                {selectedNode.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedNode.videos.map((video, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border bg-gray-50 p-4 hover:shadow-md transition flex flex-col"
                  >
                    <p className="font-semibold mb-3 text-gray-800">
                      {video.title}
                    </p>
                    <iframe
                      src={video.url}
                      className="w-full h-48 rounded-lg mb-4 flex-1"
                      allowFullScreen
                    />
                    <button
                      onClick={() => handleGenerateQuiz(video)}
                      disabled={loadingQuiz && selectedVideo === video}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg text-sm transition"
                    >
                      {loadingQuiz && selectedVideo === video
                        ? "⏳ Generating Quiz..."
                        : "📝 Generate Quiz"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}