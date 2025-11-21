'use client'

import { useState } from 'react'
import { DiagnosticForm } from './components/DiagnosticForm'
import { RoadmapView } from './components/RoadmapView'
import { GraduationCap } from 'lucide-react'

export default function Home() {
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)

  const handleFormSubmit = (data: any) => {
    setUserProfile(data)
    setShowRoadmap(true)
  }

  const handleReset = () => {
    setShowRoadmap(false)
    setUserProfile(null)
  }

  return (
    <main className="min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <GraduationCap size={40} />
            <div>
              <h1 className="text-4xl font-bold">Tech Mentor</h1>
              <p className="text-blue-100 mt-1">Your Personalized Path to Tech Mastery</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showRoadmap ? (
          <DiagnosticForm onSubmit={handleFormSubmit} />
        ) : (
          <RoadmapView userProfile={userProfile} onReset={handleReset} />
        )}
      </div>

      <footer className="bg-gray-800 text-gray-300 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Tech Mentor - Empowering your journey to tech excellence</p>
        </div>
      </footer>
    </main>
  )
}
