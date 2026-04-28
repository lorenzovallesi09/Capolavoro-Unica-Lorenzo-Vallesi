"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Moon, Dumbbell, Apple, Smartphone } from "lucide-react"

const factors = [
  {
    icon: Moon,
    title: "Sonno",
    description: "Un sonno di qualità è essenziale per la memoria, l'apprendimento e il recupero fisico. Gli adolescenti hanno bisogno di 8-10 ore per un funzionamento cerebrale ottimale.",
    color: "from-indigo-500 to-purple-500",
    iconColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Dumbbell,
    title: "Esercizio Fisico",
    description: "L'attività fisica regolare migliora l'umore, aumenta l'energia e potenzia le funzioni cognitive grazie a un migliore afflusso di sangue al cervello.",
    color: "from-orange-500 to-red-500",
    iconColor: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Apple,
    title: "Alimentazione",
    description: "Una dieta equilibrata alimenta corpo e mente. I cibi integrali forniscono energia costante, mentre il cibo spazzatura causa cali energetici e confusione mentale.",
    color: "from-green-500 to-emerald-500",
    iconColor: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Smartphone,
    title: "Tempo Schermo",
    description: "Un uso eccessivo degli schermi influisce sulla qualità del sonno, riduce l'attività fisica e può impattare sulla salute mentale e sulla capacità di attenzione.",
    color: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
]

export function EducationalSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perché Questi Fattori{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Sono Importanti
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprendere la scienza dietro le tue abitudini quotidiane può aiutarti a fare scelte migliori per una vita più sana e produttiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {factors.map((factor, index) => (
            <Card 
              key={factor.title}
              className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-border transition-all duration-300 hover:scale-[1.02] group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className={`p-3 rounded-xl ${factor.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <factor.icon className={`h-6 w-6 ${factor.iconColor}`} />
                </div>
                <CardTitle className="text-xl">{factor.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {factor.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
