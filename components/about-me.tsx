"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, GraduationCap, Heart, Target, Code } from "lucide-react"

export function AboutMe() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Chi{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Sono
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scopri qualcosa su di me e sul perché ho creato questo progetto.
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                <User className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-2xl">Lorenzo</CardTitle>
                <p className="text-muted-foreground text-sm">Studente e creatore di questo progetto</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Info principali */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <GraduationCap className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scuola</p>
                  <p className="font-medium">Liceo Scientifico - Scienze Applicate</p>
                  <p className="text-sm text-muted-foreground mt-1">Attualmente a metà percorso</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Code className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Materie preferite</p>
                  <p className="font-medium">Matematica, Fisica, Informatica</p>
                  <p className="text-sm text-muted-foreground mt-1">Tutto ciò che mette alla prova la logica</p>
                </div>
              </div>
            </div>

            {/* Presentazione */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-foreground/90 leading-relaxed">
                Sono Lorenzo, uno studente del Liceo Scientifico con indirizzo Scienze Applicate, 
                attualmente a metà del mio percorso. Fin dai primi anni ho sviluppato una forte 
                inclinazione per le materie che richiedono rigore, metodo e ragionamento: matematica, 
                fisica, informatica — tutto ciò che mette alla prova la logica.
              </p>
            </div>

            {/* Passioni */}
            <div className="pt-6 border-t border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Heart className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="font-semibold text-lg">Passioni</h3>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                La programmazione è per me molto più di una materia scolastica: è un modo di pensare 
                e risolvere problemi concreti. Ho una grande passione per l&apos;intelligenza artificiale, 
                che rappresenta il campo in cui voglio specializzarmi. In generale, tutto ciò che 
                richiede pensiero analitico e logica mi appassiona profondamente.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                  Programmazione
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium">
                  Intelligenza Artificiale
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">
                  Problem Solving
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium">
                  Pensiero Analitico
                </span>
              </div>
            </div>

            {/* Obiettivi futuri */}
            <div className="pt-6 border-t border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Target className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-lg">Obiettivi Futuri</h3>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                Dopo il diploma, voglio proseguire all&apos;università — preferibilmente in un ateneo 
                prestigioso — per specializzarmi in informatica o ingegneria informatica con focus 
                sull&apos;AI. Ma il mio obiettivo non si ferma lì: aspiro a costruire qualcosa di mio, 
                un business nel settore tecnologico che unisca la mia passione per la programmazione 
                e l&apos;intelligenza artificiale con la voglia di creare qualcosa di concreto e innovativo.
              </p>

            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
