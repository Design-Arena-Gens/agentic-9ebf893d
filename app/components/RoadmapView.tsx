'use client'

import { useState } from 'react'
import {
  BookOpen, Code, Brain, Cpu, Target, Award, Briefcase,
  CheckCircle2, Circle, ChevronDown, ChevronUp, RotateCcw,
  Calendar, Clock, TrendingUp, ExternalLink
} from 'lucide-react'

interface RoadmapViewProps {
  userProfile: any
  onReset: () => void
}

export function RoadmapView({ userProfile, onReset }: RoadmapViewProps) {
  const [activePhase, setActivePhase] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev)
      if (newSet.has(taskId)) {
        newSet.delete(taskId)
      } else {
        newSet.add(taskId)
      }
      return newSet
    })
  }

  const roadmap = generateRoadmap(userProfile)

  return (
    <div className="space-y-8">
      {/* Profile Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Personalized Roadmap</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-500" size={16} />
                <span className="text-gray-600">{userProfile.timeAvailable}h/week</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-purple-500" size={16} />
                <span className="text-gray-600">{userProfile.timeline} timeline</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-gray-600 capitalize">{userProfile.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="text-orange-500" size={16} />
                <span className="text-gray-600">{userProfile.domains.length} domains</span>
              </div>
            </div>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <RotateCcw size={16} />
            Restart
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Progress Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {roadmap.phases.map((phase, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-2xl font-bold">{phase.duration}</div>
              <div className="text-sm opacity-90">{phase.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Goal */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-start gap-3">
          <Target className="text-green-600 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Target Career Goal</h3>
            <p className="text-gray-700">{userProfile.careerGoal}</p>
          </div>
        </div>
      </div>

      {/* Roadmap Phases */}
      <div className="space-y-4">
        {roadmap.phases.map((phase, phaseIdx) => (
          <div key={phaseIdx} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => setActivePhase(activePhase === phaseIdx ? -1 : phaseIdx)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${phase.color}`}>
                  {phase.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{phase.title}</h3>
                  <p className="text-sm text-gray-600">{phase.duration} • {phase.description}</p>
                </div>
              </div>
              {activePhase === phaseIdx ? <ChevronUp /> : <ChevronDown />}
            </button>

            {activePhase === phaseIdx && (
              <div className="px-6 pb-6 space-y-6">
                {/* Weekly Breakdown */}
                {phase.weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="border-l-2 border-gray-200 pl-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Week {weekIdx + 1}: {week.focus}</h4>
                    <div className="space-y-2">
                      {week.tasks.map((task, taskIdx) => {
                        const taskId = `${phaseIdx}-${weekIdx}-${taskIdx}`
                        const isCompleted = completedTasks.has(taskId)
                        return (
                          <button
                            key={taskIdx}
                            onClick={() => toggleTask(taskId)}
                            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                            ) : (
                              <Circle className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                            )}
                            <div className="flex-1">
                              <p className={`text-sm ${isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {task.task}
                              </p>
                              {task.resource && (
                                <a
                                  href={task.resource}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Resource <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}

                {/* Milestone Project */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Award className="text-orange-500 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Milestone Project</h4>
                      <p className="text-sm text-gray-700">{phase.project}</p>
                    </div>
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Recommended Resources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all"
                      >
                        <BookOpen className="text-blue-500" size={20} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{resource.name}</p>
                          <p className="text-xs text-gray-500">{resource.type}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Career Enablement Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-purple-600" size={28} />
          <h3 className="text-2xl font-bold text-gray-800">Career Enablement Plan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-3">Portfolio Building</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Create standout GitHub profile</li>
              <li>• Document 5+ production-quality projects</li>
              <li>• Write technical blog posts</li>
              <li>• Contribute to open source</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-3">Certifications</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• AWS/Azure Cloud Practitioner</li>
              <li>• TensorFlow Developer Certificate</li>
              <li>• ROS Industrial Training</li>
              <li>• Meta Frontend Developer</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-800 mb-3">Job Search Strategy</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Optimize LinkedIn profile</li>
              <li>• Network on X/Twitter</li>
              <li>• Apply to internships</li>
              <li>• Join tech communities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-3">🚀 Your Next Actions</h3>
        <ol className="space-y-2 text-sm">
          <li>1. Review Week 1 tasks in the Foundation Phase</li>
          <li>2. Set up your development environment</li>
          <li>3. Create a GitHub account and portfolio repository</li>
          <li>4. Join relevant Discord/Slack communities</li>
          <li>5. Block dedicated learning time on your calendar</li>
        </ol>
      </div>
    </div>
  )
}

function generateRoadmap(profile: any) {
  const isAIFocused = profile.domains.includes('AI/Machine Learning')
  const isRoboticsFocused = profile.domains.includes('Robotics')
  const isWebFocused = profile.domains.includes('Web Development')

  return {
    phases: [
      {
        title: 'Foundation Phase',
        duration: '4-8 weeks',
        description: 'Core programming fundamentals and tools',
        color: 'bg-blue-100',
        icon: <Code className="text-blue-600" size={24} />,
        weeks: [
          {
            focus: 'Programming Basics',
            tasks: [
              { task: 'Learn Python fundamentals: variables, loops, functions', resource: 'https://www.python.org/about/gettingstarted/' },
              { task: 'Complete 20 easy problems on LeetCode/HackerRank' },
              { task: 'Set up VS Code, Git, and GitHub' },
              { task: 'Build: Simple CLI calculator with error handling' }
            ]
          },
          {
            focus: 'Data Structures',
            tasks: [
              { task: 'Study arrays, linked lists, stacks, queues', resource: 'https://www.geeksforgeeks.org/data-structures/' },
              { task: 'Implement each data structure from scratch' },
              { task: 'Solve 15 DSA problems' },
              { task: 'Build: Custom implementation of ArrayList/LinkedList' }
            ]
          }
        ],
        project: 'Build a text-based task manager with file persistence (save/load tasks)',
        resources: [
          { name: 'Python for Everybody', type: 'Course', url: 'https://www.py4e.com/' },
          { name: 'Git & GitHub Crash Course', type: 'Video', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' },
          { name: 'The Algorithm Design Manual', type: 'Book', url: 'https://www.algorist.com/' },
          { name: 'LeetCode Study Plans', type: 'Practice', url: 'https://leetcode.com/studyplan/' }
        ]
      },
      {
        title: 'Core Skills Development',
        duration: '8-16 weeks',
        description: 'Advanced programming, algorithms, and domain fundamentals',
        color: 'bg-purple-100',
        icon: <Brain className="text-purple-600" size={24} />,
        weeks: [
          {
            focus: 'Advanced Algorithms',
            tasks: [
              { task: 'Master sorting, searching, graph algorithms' },
              { task: 'Learn dynamic programming and greedy algorithms' },
              { task: 'Solve 30 medium-level problems' },
              { task: 'Study time/space complexity analysis' }
            ]
          },
          {
            focus: isAIFocused ? 'Math for ML' : 'System Design Basics',
            tasks: isAIFocused ? [
              { task: 'Linear algebra: vectors, matrices, eigenvalues', resource: 'https://www.khanacademy.org/math/linear-algebra' },
              { task: 'Calculus: derivatives, gradients, chain rule' },
              { task: 'Probability & statistics fundamentals' },
              { task: 'Practice with NumPy/Pandas' }
            ] : [
              { task: 'Learn REST API design principles' },
              { task: 'Study database fundamentals (SQL/NoSQL)' },
              { task: 'Build CRUD applications' },
              { task: 'Deploy app to cloud (Vercel/Heroku)' }
            ]
          },
          {
            focus: isWebFocused ? 'Web Development' : 'Domain Specialization',
            tasks: isWebFocused ? [
              { task: 'Master HTML, CSS, JavaScript ES6+' },
              { task: 'Learn React/Next.js fundamentals' },
              { task: 'Build responsive, accessible UI components' },
              { task: 'Deploy portfolio site' }
            ] : [
              { task: 'Start domain-specific coursework' },
              { task: 'Build 2-3 small projects in your domain' },
              { task: 'Read industry papers/documentation' },
              { task: 'Join domain-specific communities' }
            ]
          }
        ],
        project: isWebFocused
          ? 'Full-stack web app: Todo app with auth, database, and deployment'
          : 'Algorithm visualizer web app showing sorting/graph algorithms in action',
        resources: [
          { name: 'Neetcode 150', type: 'Practice', url: 'https://neetcode.io/' },
          { name: 'System Design Primer', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' },
          { name: 'Mathematics for ML', type: 'Book', url: 'https://mml-book.github.io/' },
          { name: 'Full Stack Open', type: 'Course', url: 'https://fullstackopen.com/' }
        ]
      },
      {
        title: 'Advanced Specialization',
        duration: '12-24 weeks',
        description: 'Deep dive into your chosen domains',
        color: 'bg-green-100',
        icon: isAIFocused ? <Brain className="text-green-600" size={24} /> : <Cpu className="text-green-600" size={24} />,
        weeks: [
          {
            focus: isAIFocused ? 'Machine Learning Fundamentals' : 'Advanced Development',
            tasks: isAIFocused ? [
              { task: 'Complete ML course (Andrew Ng or fast.ai)', resource: 'https://www.coursera.org/learn/machine-learning' },
              { task: 'Implement algorithms: linear/logistic regression, SVM, decision trees' },
              { task: 'Learn scikit-learn library thoroughly' },
              { task: 'Work on Kaggle beginner competitions' }
            ] : [
              { task: 'Master advanced framework patterns' },
              { task: 'Learn testing (unit, integration, E2E)' },
              { task: 'Study CI/CD pipelines' },
              { task: 'Optimize app performance' }
            ]
          },
          {
            focus: isAIFocused ? 'Deep Learning' : isRoboticsFocused ? 'Robotics Core' : 'Production Systems',
            tasks: isAIFocused ? [
              { task: 'Neural networks: CNNs, RNNs, Transformers', resource: 'https://pytorch.org/tutorials/' },
              { task: 'Master PyTorch or TensorFlow' },
              { task: 'Build image classifier, NLP model' },
              { task: 'Fine-tune pre-trained models' }
            ] : isRoboticsFocused ? [
              { task: 'Learn ROS (Robot Operating System)', resource: 'https://www.ros.org/documentation/' },
              { task: 'Study sensors, actuators, kinematics' },
              { task: 'Work with Arduino/Raspberry Pi' },
              { task: 'Simulate robots in Gazebo' }
            ] : [
              { task: 'Learn Docker & Kubernetes basics' },
              { task: 'Implement caching strategies' },
              { task: 'Study microservices architecture' },
              { task: 'Monitor and debug production issues' }
            ]
          },
          {
            focus: 'Real-World Projects',
            tasks: [
              { task: 'Build 2 substantial portfolio projects' },
              { task: 'Contribute to open-source projects' },
              { task: 'Write technical blog posts' },
              { task: 'Present project to communities' }
            ]
          }
        ],
        project: isAIFocused
          ? 'End-to-end ML project: Custom model trained on real data, deployed as web API'
          : isRoboticsFocused
          ? 'Autonomous robot: Navigation, obstacle avoidance, ROS integration'
          : 'Production-grade application with authentication, payments, analytics, monitoring',
        resources: [
          { name: 'Fast.ai Practical DL', type: 'Course', url: 'https://www.fast.ai/' },
          { name: 'PyTorch Tutorials', type: 'Docs', url: 'https://pytorch.org/tutorials/' },
          { name: 'ROS Tutorials', type: 'Docs', url: 'https://wiki.ros.org/ROS/Tutorials' },
          { name: 'AWS/GCP Free Tier', type: 'Platform', url: 'https://aws.amazon.com/free/' }
        ]
      },
      {
        title: 'Job-Ready Mastery',
        duration: '8-12 weeks',
        description: 'Interview prep, portfolio polish, job search',
        color: 'bg-orange-100',
        icon: <Briefcase className="text-orange-600" size={24} />,
        weeks: [
          {
            focus: 'Interview Preparation',
            tasks: [
              { task: 'Solve 100+ LeetCode problems (easy to hard)' },
              { task: 'Practice system design interviews', resource: 'https://www.youtube.com/c/SystemDesignInterview' },
              { task: 'Mock interviews on Pramp/Interviewing.io' },
              { task: 'Study behavioral interview questions' }
            ]
          },
          {
            focus: 'Portfolio & Personal Brand',
            tasks: [
              { task: 'Polish GitHub: READMEs, documentation, demos' },
              { task: 'Create personal website/portfolio' },
              { task: 'Write 3-5 technical blog posts' },
              { task: 'Build active presence on X/LinkedIn' }
            ]
          },
          {
            focus: 'Job Search & Networking',
            tasks: [
              { task: 'Apply to 50+ positions' },
              { task: 'Network at meetups/conferences' },
              { task: 'Reach out to engineers for coffee chats' },
              { task: 'Consider internships and contract work' }
            ]
          }
        ],
        project: 'Capstone project showcasing end-to-end skills: complex problem, clean code, deployment, documentation',
        resources: [
          { name: 'Blind 75 Problems', type: 'List', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions' },
          { name: 'Grokking System Design', type: 'Course', url: 'https://www.designgurus.io/course/grokking-the-system-design-interview' },
          { name: 'Pramp (Mock Interviews)', type: 'Platform', url: 'https://www.pramp.com/' },
          { name: 'Hired/Wellfound', type: 'Job Board', url: 'https://wellfound.com/' }
        ]
      }
    ]
  }
}
