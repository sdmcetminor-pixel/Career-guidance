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

type RecommendedVideo = {
  title: string;
  videoId: string;
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
      {
        title: "React Crash Course",
        url: "https://www.youtube.com/embed/w7ejDZ8SWv8",
      },
    ],
  },
  {
    id: "npm",
    title: "NPM",
    description: "Learn package management for JavaScript projects.",
    videos: [
      {
        title: "NPM Tutorial 1",
        url: "https://www.youtube.com/embed/jHDhaSSKmB0",
      },
      {
        title: "NPM Tutorial 2",
        url: "https://www.youtube.com/embed/P3aKRdUyr0s",
      },
    ],
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    description: "Style modern interfaces quickly using utility classes.",
    videos: [
      {
        title: "Tailwind CSS Tutorial 1",
        url: "https://www.youtube.com/embed/dFgzHOX84xQ",
      },
      {
        title: "Tailwind CSS Tutorial 2",
        url: "https://www.youtube.com/embed/lCxcTsOHrjo",
      },
    ],
  },
  {
    id: "git",
    title: "Git",
    description: "Master version control basics and team workflows.",
    videos: [
      {
        title: "Git Tutorial 1",
        url: "https://www.youtube.com/embed/apGV9Kg7ics",
      },
      {
        title: "Git Tutorial 2",
        url: "https://www.youtube.com/embed/RGOj5yH7evk",
      },
    ],
  },
  {
    id: "github",
    title: "GitHub",
    description: "Collaborate, host repositories, and manage projects.",
    videos: [
      {
        title: "GitHub Tutorial 1",
        url: "https://www.youtube.com/embed/w3jLJU7DT5E",
      },
      {
        title: "GitHub Tutorial 2",
        url: "https://www.youtube.com/embed/iv8rSLsi1xo",
      },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js",
    description: "Build backend applications using JavaScript runtime.",
    videos: [
      {
        title: "Node.js Tutorial 1",
        url: "https://www.youtube.com/embed/TlB_eWDSMt4",
      },
      {
        title: "Node.js Tutorial 2",
        url: "https://www.youtube.com/embed/Oe421EPjeBE",
      },
    ],
  },
  {
    id: "cli",
    title: "CLI Apps",
    description: "Create command-line tools and developer utilities.",
    videos: [
      {
        title: "CLI Apps Tutorial 1",
        url: "https://www.youtube.com/embed/9IJ5nX5z5qM",
      },
      {
        title: "CLI Apps Tutorial 2",
        url: "https://www.youtube.com/embed/2d7s3spWAzo",
      },
    ],
  },
  {
    id: "postgres",
    title: "PostgreSQL",
    description: "Learn relational databases and SQL fundamentals.",
    videos: [
      {
        title: "PostgreSQL Tutorial 1",
        url: "https://www.youtube.com/embed/qw--VYLpxG4",
      },
      {
        title: "PostgreSQL Tutorial 2",
        url: "https://www.youtube.com/embed/SpfIwlAYaKk",
      },
    ],
  },
  {
    id: "crud",
    title: "CRUD Apps",
    description: "Build create, read, update, and delete applications.",
    videos: [
      {
        title: "CRUD Apps Tutorial 1",
        url: "https://www.youtube.com/embed/2eqyQy0vZ2Y",
      },
      {
        title: "CRUD Apps Tutorial 2",
        url: "https://www.youtube.com/embed/1NrHkjlWVhM",
      },
    ],
  },
  {
    id: "redis",
    title: "Redis",
    description: "Use in-memory data stores for caching and speed.",
    videos: [
      {
        title: "Redis Tutorial 1",
        url: "https://www.youtube.com/embed/Hbt56gFj998",
      },
      {
        title: "Redis Tutorial 2",
        url: "https://www.youtube.com/embed/jgpVdJB2sKQ",
      },
    ],
  },
  {
    id: "jwt",
    title: "JWT Authentication",
    description: "Secure APIs and sessions using token-based auth.",
    videos: [
      {
        title: "JWT Authentication Tutorial 1",
        url: "https://www.youtube.com/embed/7Q17ubqLfaM",
      },
      {
        title: "JWT Authentication Tutorial 2",
        url: "https://www.youtube.com/embed/mbsmsi7l3r4",
      },
    ],
  },
  {
    id: "rest",
    title: "REST APIs",
    description: "Design and build API endpoints for web apps.",
    videos: [
      {
        title: "REST APIs Tutorial 1",
        url: "https://www.youtube.com/embed/lsMQRaeKNDk",
      },
      {
        title: "REST APIs Tutorial 2",
        url: "https://www.youtube.com/embed/rtWH70_MMHM",
      },
    ],
  },
  {
    id: "linux",
    title: "Linux Basics",
    description: "Understand terminal, files, permissions, and processes.",
    videos: [
      {
        title: "Linux Basics Tutorial 1",
        url: "https://www.youtube.com/embed/IVquJh3DXUA",
      },
      {
        title: "Linux Basics Tutorial 2",
        url: "https://www.youtube.com/embed/sWbUDq4S6Y8",
      },
    ],
  },
  {
    id: "aws",
    title: "Basic AWS Services",
    description: "Get started with core cloud services on AWS.",
    videos: [
      {
        title: "Basic AWS Services Tutorial 1",
        url: "https://www.youtube.com/embed/ulprqHHWlng",
      },
      {
        title: "Basic AWS Services Tutorial 2",
        url: "https://www.youtube.com/embed/k1RI5locZE4",
      },
    ],
  },
  {
    id: "ansible",
    title: "Ansible",
    description: "Automate provisioning and configuration tasks.",
    videos: [
      {
        title: "Ansible Tutorial 1",
        url: "https://www.youtube.com/embed/1id6ERvfozo",
      },
      {
        title: "Ansible Tutorial 2",
        url: "https://www.youtube.com/embed/goclfp6a2IQ",
      },
    ],
  },
  {
    id: "github-actions",
    title: "GitHub Actions",
    description: "Set up CI/CD workflows for automated delivery.",
    videos: [
      {
        title: "GitHub Actions Tutorial 1",
        url: "https://www.youtube.com/embed/R8_veQiYBjI",
      },
      {
        title: "GitHub Actions Tutorial 2",
        url: "https://www.youtube.com/embed/mFFXuXjVgkU",
      },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    description: "Track application health, logs, and metrics.",
    videos: [
      {
        title: "Monitoring Tutorial 1",
        url: "https://www.youtube.com/embed/nm2uG2b7Q3A",
      },
      {
        title: "Monitoring Tutorial 2",
        url: "https://www.youtube.com/embed/2lP1o9t1Uj4",
      },
    ],
  },
  {
    id: "terraform",
    title: "Terraform",
    description: "Manage cloud infrastructure as code.",
    videos: [
      {
        title: "Terraform Tutorial 1",
        url: "https://www.youtube.com/embed/l5k1ai_GBDE",
      },
      {
        title: "Terraform Tutorial 2",
        url: "https://www.youtube.com/embed/SLB_c_ayRMo",
      },
    ],
  },
];

export default function RoadmapPage() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [videos, setVideos] = useState<RecommendedVideo[]>([]);
  const [videosError, setVideosError] = useState<string | null>(null);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const fetchVideos = async (
    topic: string,
    options?: {
      append?: boolean;
      pageToken?: string | null;
      refresh?: boolean;
    },
  ) => {
    setLoadingVideos(true);
    setVideosError(null);

    try {
      const params = new URLSearchParams({
        topic,
        limit: "8",
      });

      if (options?.pageToken) {
        params.set("pageToken", options.pageToken);
      }

      if (options?.refresh) {
        params.set("seed", Date.now().toString());
      }

      const res = await fetch(`/api/videos?${params.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load videos");
      }

      const data = await res.json();
      const incoming: RecommendedVideo[] = Array.isArray(data?.videos)
        ? data.videos
        : [];

      setVideos((prev) => {
        const base = options?.append ? prev : [];
        const merged = [...base, ...incoming];
        return merged.filter(
          (video, index) =>
            merged.findIndex((item) => item.videoId === video.videoId) ===
            index,
        );
      });

      setNextPageToken(
        typeof data?.nextPageToken === "string" ? data.nextPageToken : null,
      );
    } catch (err) {
      console.error(err);
      setVideosError("Could not fetch recommendations. Try refresh.");
      if (!options?.append) {
        setVideos([]);
        setNextPageToken(null);
      }
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleSelectNode = (node: RoadmapNode) => {
    setSelectedNode(node);
    setQuiz(null);
    setQuizError(null);
    setSelectedVideo(null);
    setShowResults(false);
    setUserAnswers({});
    setVideos([]);
    setNextPageToken(null);
    fetchVideos(node.title, { refresh: true });
  };

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
        body: JSON.stringify({ videoUrl: video.url, topic: selectedNode?.title }),
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
                  onClick={() => handleSelectNode(node)}
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

              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <p className="text-sm text-gray-600">
                  {loadingVideos && videos.length === 0
                    ? "Loading recommendations..."
                    : `${videos.length} recommendations loaded`}
                </p>
                <button
                  onClick={() => fetchVideos(selectedNode.title, { refresh: true })}
                  disabled={loadingVideos}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
                >
                  {loadingVideos ? "Refreshing..." : "Refresh Recommendations"}
                </button>
              </div>

              {videosError && (
                <p className="text-sm text-red-600 mb-4">{videosError}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video, idx) => {
                  const embedUrl = `https://www.youtube.com/embed/${video.videoId}`;
                  return (
                  <div
                    key={idx}
                    className="rounded-xl border bg-gray-50 p-4 hover:shadow-md transition flex flex-col"
                  >
                    <p className="font-semibold mb-3 text-gray-800">
                      {video.title}
                    </p>
                    <iframe
                      src={embedUrl}
                      className="w-full h-48 rounded-lg mb-4 flex-1"
                      allowFullScreen
                    />
                    <button
                      onClick={() => handleGenerateQuiz({ title: video.title, url: embedUrl })}
                      disabled={loadingQuiz && selectedVideo?.url === embedUrl}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg text-sm transition"
                    >
                      {loadingQuiz && selectedVideo?.url === embedUrl
                        ? "⏳ Generating Quiz..."
                        : "📝 Generate Quiz"}
                    </button>
                  </div>
                  );
                })}
              </div>

              {videos.length === 0 && !loadingVideos && !videosError && (
                <p className="text-gray-500 mt-6 text-sm">
                  No videos available for this topic yet.
                </p>
              )}

              {nextPageToken && (
                <button
                  onClick={() =>
                    fetchVideos(selectedNode.title, {
                      append: true,
                      pageToken: nextPageToken,
                    })
                  }
                  disabled={loadingVideos}
                  className="w-full mt-6 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                  {loadingVideos ? "Loading more..." : "Load More Videos"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}