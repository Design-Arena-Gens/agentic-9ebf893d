'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface DiagnosticFormProps {
  onSubmit: (data: any) => void
}

export function DiagnosticForm({ onSubmit }: DiagnosticFormProps) {
  const [formData, setFormData] = useState({
    background: '',
    currentSkills: '',
    experience: 'beginner',
    timeAvailable: '5-10',
    careerGoal: '',
    domains: [] as string[],
    learningStyle: 'project-based',
    timeline: '6-12'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const toggleDomain = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain]
    }))
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Let's Build Your Roadmap</h2>
        <p className="text-gray-600">Answer these questions so I can architect your personalized learning journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Background */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            1. What's your educational/professional background?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="e.g., Computer Science student, mechanical engineer, self-taught developer..."
            value={formData.background}
            onChange={e => setFormData({ ...formData, background: e.target.value })}
            required
          />
        </div>

        {/* Current Skills */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            2. What technical skills do you currently have?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="e.g., Basic Python, HTML/CSS, Arduino projects, linear algebra..."
            value={formData.currentSkills}
            onChange={e => setFormData({ ...formData, currentSkills: e.target.value })}
            required
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            3. Overall technical experience level?
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.experience}
            onChange={e => setFormData({ ...formData, experience: e.target.value })}
          >
            <option value="absolute-beginner">Absolute Beginner (No coding experience)</option>
            <option value="beginner">Beginner (Some basics)</option>
            <option value="intermediate">Intermediate (Can build simple projects)</option>
            <option value="advanced">Advanced (Professional experience)</option>
          </select>
        </div>

        {/* Time Available */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            4. How many hours per week can you dedicate?
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.timeAvailable}
            onChange={e => setFormData({ ...formData, timeAvailable: e.target.value })}
          >
            <option value="0-5">0-5 hours (Part-time, busy schedule)</option>
            <option value="5-10">5-10 hours (Moderate commitment)</option>
            <option value="10-20">10-20 hours (High commitment)</option>
            <option value="20+">20+ hours (Full-time learning)</option>
          </select>
        </div>

        {/* Domains of Interest */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            5. Which domains interest you? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Software Development', 'AI/Machine Learning', 'Robotics', 'Data Science', 'Web Development', 'Mobile Development'].map(domain => (
              <button
                key={domain}
                type="button"
                onClick={() => toggleDomain(domain)}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  formData.domains.includes(domain)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Career Goal */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            6. What's your primary career goal?
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="e.g., Get a job as ML engineer, build robotics startup, freelance as full-stack developer..."
            value={formData.careerGoal}
            onChange={e => setFormData({ ...formData, careerGoal: e.target.value })}
            required
          />
        </div>

        {/* Learning Style */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            7. Preferred learning style?
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.learningStyle}
            onChange={e => setFormData({ ...formData, learningStyle: e.target.value })}
          >
            <option value="theory-first">Theory First (Understand concepts deeply, then apply)</option>
            <option value="project-based">Project-Based (Learn by building)</option>
            <option value="balanced">Balanced (Mix of theory and practice)</option>
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            8. Target timeline to become job-ready?
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.timeline}
            onChange={e => setFormData({ ...formData, timeline: e.target.value })}
          >
            <option value="3-6">3-6 months (Intensive)</option>
            <option value="6-12">6-12 months (Moderate pace)</option>
            <option value="12-24">12-24 months (Gradual, thorough)</option>
            <option value="24+">24+ months (Long-term mastery)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 mt-8"
        >
          Generate My Personalized Roadmap
          <ChevronRight size={20} />
        </button>
      </form>
    </div>
  )
}
