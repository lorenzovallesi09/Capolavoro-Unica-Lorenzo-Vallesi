"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Brain, User, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useMemo } from "react"

interface ResultsCardProps {
  sleep: number
  workout: number
  diet: number
  screenTime: number
}

// Bell curve function: returns 0-1 based on how close value is to optimal range
function bellCurve(value: number, optimalMin: number, optimalMax: number, minVal: number, maxVal: number): number {
  if (value >= optimalMin && value <= optimalMax) {
    return 1 // Perfect score in optimal range
  } else if (value < optimalMin) {
    // Penalty for being below optimal
    const distance = optimalMin - value
    const maxDistance = optimalMin - minVal
    return Math.max(0, 1 - (distance / maxDistance) * 1.2)
  } else {
    // Penalty for being above optimal
    const distance = value - optimalMax
    const maxDistance = maxVal - optimalMax
    return Math.max(0, 1 - (distance / maxDistance) * 0.8)
  }
}

// Screen time curve: slight penalty at 0, optimal at 1-2, rapid increase penalty above 4
function screenCurve(value: number): number {
  if (value === 0) return 0.9 // Slight penalty for 0
  if (value >= 1 && value <= 2) return 1 // Optimal
  if (value <= 4) return 1 - (value - 2) * 0.1 // Gradual decrease
  // Rapid penalty above 4
  return Math.max(0, 0.8 - (value - 4) * 0.15)
}

export function ResultsCard({ sleep, workout, diet, screenTime }: ResultsCardProps) {
  const isOvertraining = workout >= 7
  const isSleepDeprived = sleep < 4

  const results = useMemo(() => {
    // Bell curve scores for each factor
    const sleepCurveScore = bellCurve(sleep, 7, 8, 0, 12) // Optimal 7-8h, penalty below 6 and above 9
    const workoutCurveScore = bellCurve(workout, 3, 5, 0, 7) // Optimal 3-5 days
    const dietScore = diet / 100 // Linear: more is better
    const screenCurveScore = screenCurve(screenTime)

    // Severe sleep deprivation penalty
    const severeSleepPenalty = sleep < 4 ? 0.4 : 1

    // Calculate energy level (0-100)
    const energyBase = (
      sleepCurveScore * 35 +
      workoutCurveScore * 25 +
      dietScore * 25 +
      screenCurveScore * 15
    )
    const energy = Math.min(100, energyBase * severeSleepPenalty)

    // Calculate focus level (0-100)
    const focusBase = (
      sleepCurveScore * 35 +
      screenCurveScore * 30 +
      dietScore * 20 +
      workoutCurveScore * 15
    )
    const focus = Math.min(100, focusBase * severeSleepPenalty)

    // Calculate physical score (0-100)
    const physicalBase = (
      workoutCurveScore * 40 +
      dietScore * 30 +
      sleepCurveScore * 20 +
      screenCurveScore * 10
    )
    const physical = Math.min(100, physicalBase * severeSleepPenalty)

    return { energy, focus, physical }
  }, [sleep, workout, diet, screenTime])

  // Generate specific advice for each metric
  const getEnergyAdvice = (): string => {
    if (results.energy >= 85) return "Energia al massimo! Stai gestendo bene sonno e attività."
    if (sleep < 6) return "Dormire di più aumenterebbe significativamente la tua energia."
    if (sleep > 9) return "Dormire troppo può causare stanchezza. Prova 7-8 ore."
    if (workout === 0) return "Un po' di movimento ti darebbe più energia durante il giorno."
    if (screenTime > 6) return "Troppo schermo affatica. Riduci per sentirti più energico."
    if (diet < 50) return "Una dieta migliore ti darebbe più carburante per la giornata."
    return "Bilancia meglio sonno, movimento e alimentazione."
  }

  const getFocusAdvice = (): string => {
    if (results.focus >= 85) return "Concentrazione ottimale! Continua con queste abitudini."
    if (screenTime > 5) return "Lo schermo framenta l'attenzione. Riducilo per concentrarti meglio."
    if (sleep < 7) return "Il sonno insufficiente compromette la concentrazione."
    if (sleep > 9) return "Troppo sonno può rendere la mente annebbiata."
    if (diet < 40) return "Il cervello ha bisogno di nutrienti. Migliora l'alimentazione."
    if (workout === 0) return "L'esercizio migliora la chiarezza mentale."
    return "Riduci le distrazioni e migliora il riposo."
  }

  const getPhysicalAdvice = (): string => {
    if (results.physical >= 85) return "Forma fisica eccellente! Ottimo equilibrio."
    if (workout < 2) return "Aumenta l'allenamento ad almeno 3-4 giorni a settimana."
    if (workout >= 7) return "Inserisci almeno 1-2 giorni di riposo per il recupero muscolare."
    if (diet < 50) return "L'alimentazione è fondamentale per i risultati fisici."
    if (sleep < 6) return "Il corpo si ripara durante il sonno. Dormi di più."
    return "Mantieni costanza nell'allenamento e nell'alimentazione."
  }

  // Dynamic combination-based feedback
  const getDynamicFeedback = (): { text: string; type: "success" | "neutral" | "warning" | "danger" } => {
    const overallScore = (results.energy + results.focus + results.physical) / 3

    // Specific problematic combinations
    if (sleep < 6 && screenTime > 5) {
      return {
        text: "Il tuo sonno è probabilmente compromesso dallo schermo. La luce blu e la stimolazione mentale prima di dormire riducono la qualità del riposo.",
        type: "warning"
      }
    }

    if (workout >= 5 && diet < 40) {
      return {
        text: "Stai allenando tanto ma il carburante non è adeguato. Senza una buona alimentazione, i tuoi sforzi in palestra non daranno i risultati sperati.",
        type: "warning"
      }
    }

    if (sleep >= 7 && workout >= 3 && diet >= 60 && screenTime > 4) {
      return {
        text: "Ottimo equilibrio generale! L'unico punto debole è il tempo schermo. Riducilo e raggiungerai l'eccellenza.",
        type: "neutral"
      }
    }

    if (workout >= 5 && sleep < 6) {
      return {
        text: "Ti alleni molto ma dormi poco. I muscoli crescono durante il riposo, non durante l'allenamento!",
        type: "warning"
      }
    }

    if (diet >= 80 && workout === 0) {
      return {
        text: "Mangi bene ma non ti muovi. L'alimentazione sana ha bisogno di essere supportata dall'attività fisica.",
        type: "neutral"
      }
    }

    // Score-based feedback
    if (overallScore >= 80) {
      return {
        text: "Stai costruendo uno stile di vita sano e forte! Le tue abitudini sono in perfetto equilibrio.",
        type: "success"
      }
    } else if (overallScore >= 60) {
      return {
        text: "Sei sulla strada giusta! Concentrati sull'area più debole per fare il salto di qualità.",
        type: "neutral"
      }
    } else if (overallScore >= 40) {
      return {
        text: "Le tue abitudini necessitano di attenzione. Inizia con piccoli cambiamenti: anche 30 minuti di sonno in più fanno la differenza.",
        type: "warning"
      }
    } else {
      return {
        text: "Il tuo corpo sta chiedendo aiuto. Non serve stravolgere tutto: scegli UNA cosa da migliorare questa settimana e parti da lì.",
        type: "danger"
      }
    }
  }

  const overallScore = (results.energy + results.focus + results.physical) / 3
  const feedback = getDynamicFeedback()

  const getFeedbackIcon = () => {
    if (feedback.type === "success") return TrendingUp
    if (feedback.type === "danger") return TrendingDown
    return Minus
  }

  const FeedbackIcon = getFeedbackIcon()

  const getProgressColor = (value: number) => {
    if (value >= 70) return "bg-emerald-500"
    if (value >= 50) return "bg-yellow-500"
    if (value >= 30) return "bg-orange-500"
    return "bg-red-500"
  }

  const metrics = [
    {
      icon: Zap,
      label: "Livello Energia",
      value: results.energy,
      color: "text-yellow-400",
      advice: getEnergyAdvice(),
    },
    {
      icon: Brain,
      label: "Livello Concentrazione",
      value: results.focus,
      color: "text-purple-400",
      advice: getFocusAdvice(),
    },
    {
      icon: User,
      label: "Punteggio Fisico",
      value: results.physical,
      color: "text-cyan-400",
      advice: getPhysicalAdvice(),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Card */}
      <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            I Tuoi Risultati
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="font-medium">{metric.label}</span>
                </div>
                <span className="text-lg font-bold">{Math.round(metric.value)}%</span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full transition-all duration-500 ease-out rounded-full ${getProgressColor(metric.value)}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground italic">{metric.advice}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback Card */}
      <Card className={`border-border/50 shadow-2xl transition-all duration-500 ${
        feedback.type === "success" ? "bg-emerald-500/10 border-emerald-500/30" :
        feedback.type === "neutral" ? "bg-yellow-500/10 border-yellow-500/30" :
        feedback.type === "warning" ? "bg-orange-500/10 border-orange-500/30" :
        "bg-red-500/10 border-red-500/30"
      }`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${
              feedback.type === "success" ? "bg-emerald-500/20" :
              feedback.type === "neutral" ? "bg-yellow-500/20" :
              feedback.type === "warning" ? "bg-orange-500/20" :
              "bg-red-500/20"
            }`}>
              <FeedbackIcon className={`h-6 w-6 ${
                feedback.type === "success" ? "text-emerald-400" :
                feedback.type === "neutral" ? "text-yellow-400" :
                feedback.type === "warning" ? "text-orange-400" :
                "text-red-400"
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Punteggio Totale: {Math.round(overallScore)}/100
              </h3>
              <p className="text-muted-foreground">{feedback.text}</p>
              {isSleepDeprived && (
                <p className="mt-3 text-red-400 font-medium text-sm">
                  Mi raccomando, il sonno è la parte più importante, non trascurarlo!
                </p>
              )}
              {isOvertraining && (
                <p className="mt-3 text-orange-400 font-medium text-sm">
                  Attenzione: allenarsi tutti i giorni senza riposo è controproducente! Il corpo ha bisogno di recuperare per crescere.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
