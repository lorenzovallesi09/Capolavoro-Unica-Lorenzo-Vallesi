"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Moon, Dumbbell, Apple, Smartphone } from "lucide-react"

interface SimulatorProps {
  sleep: number
  workout: number
  diet: number
  screenTime: number
  onSleepChange: (value: number) => void
  onWorkoutChange: (value: number) => void
  onDietChange: (value: number) => void
  onScreenTimeChange: (value: number) => void
}

export function Simulator({
  sleep,
  workout,
  diet,
  screenTime,
  onSleepChange,
  onWorkoutChange,
  onDietChange,
  onScreenTimeChange,
}: SimulatorProps) {
  const getDietLabel = (value: number) => {
    if (value <= 25) return "Cibo Spazzatura"
    if (value <= 50) return "Misto"
    if (value <= 75) return "Equilibrato"
    return "Sano e Pulito"
  }

  const sliders = [
    {
      icon: Moon,
      label: "Sonno",
      value: sleep,
      onChange: onSleepChange,
      min: 0,
      max: 10,
      displayValue: `${sleep} ore`,
      color: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-400",
    },
    {
      icon: Dumbbell,
      label: "Frequenza Allenamento",
      value: workout,
      onChange: onWorkoutChange,
      min: 0,
      max: 7,
      displayValue: `${workout} giorni/settimana`,
      color: "from-orange-500 to-red-500",
      iconColor: "text-orange-400",
    },
    {
      icon: Apple,
      label: "Qualità Alimentazione",
      value: diet,
      onChange: onDietChange,
      min: 0,
      max: 100,
      displayValue: getDietLabel(diet),
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-400",
    },
    {
      icon: Smartphone,
      label: "Tempo Schermo",
      value: screenTime,
      onChange: onScreenTimeChange,
      min: 0,
      max: 10,
      displayValue: `${screenTime} ore`,
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-400",
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Regola le Tue Abitudini Quotidiane
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {sliders.map((slider) => (
          <div key={slider.label} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${slider.color} bg-opacity-20`}>
                  <slider.icon className={`h-5 w-5 ${slider.iconColor}`} />
                </div>
                <span className="font-medium">{slider.label}</span>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {slider.displayValue}
              </span>
            </div>
            <Slider
              value={[slider.value]}
              onValueChange={(value) => slider.onChange(value[0])}
              min={slider.min}
              max={slider.max}
              step={1}
              className="cursor-pointer"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
