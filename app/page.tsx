"use client"

import { useState, useRef } from "react"
import { Hero } from "@/components/hero"
import { AboutMe } from "@/components/about-me"
import { Simulator } from "@/components/simulator"
import { ResultsCard } from "@/components/results-card"
import { EducationalSection } from "@/components/educational-section"
import { PersonalSection } from "@/components/personal-section"

export default function Home() {
  const [sleep, setSleep] = useState(8)
  const [workout, setWorkout] = useState(5)
  const [diet, setDiet] = useState(100)
  const [screenTime, setScreenTime] = useState(0)
  
  const simulatorRef = useRef<HTMLDivElement>(null)

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      <Hero onStartSimulation={scrollToSimulator} />
      
      {/* Chi Sono Section */}
      <AboutMe />
      
      {/* Simulator Section */}
      <section 
        ref={simulatorRef}
        className="py-20 px-4 bg-gradient-to-b from-background to-background/95"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simulatore{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Scelte di Vita
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Regola i cursori qui sotto per vedere come le tue abitudini quotidiane influenzano la tua energia, concentrazione e benessere fisico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Simulator
              sleep={sleep}
              workout={workout}
              diet={diet}
              screenTime={screenTime}
              onSleepChange={setSleep}
              onWorkoutChange={setWorkout}
              onDietChange={setDiet}
              onScreenTimeChange={setScreenTime}
            />
            <ResultsCard
              sleep={sleep}
              workout={workout}
              diet={diet}
              screenTime={screenTime}
            />
          </div>
        </div>
      </section>

      <EducationalSection />
      <PersonalSection />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            Simulatore Scelte di Vita &mdash; Un progetto scolastico per capire come le abitudini quotidiane plasmano le nostre vite.
          </p>
        </div>
      </footer>
    </main>
  )
}
