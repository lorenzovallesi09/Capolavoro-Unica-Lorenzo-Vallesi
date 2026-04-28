"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function PersonalSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-border/50 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Quote className="h-5 w-5 text-emerald-400" />
              </div>
              <CardTitle className="text-2xl">La Mia Esperienza</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Creare questo simulatore mi ha fatto capire quanto le nostre abitudini quotidiane siano interconnesse. Quando ho iniziato a monitorare i miei schemi di sonno e esercizio fisico, ho notato miglioramenti significativi nella mia concentrazione durante le ore scolastiche.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I dati non mentono &mdash; piccoli cambiamenti costanti nelle nostre routine quotidiane possono portare a miglioramenti notevoli in come ci sentiamo e nelle nostre prestazioni. Spero che questo strumento ti aiuti a scoprire il tuo percorso verso uno stile di vita più sano.
            </p>
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground italic">
                &mdash; Un progetto scolastico per capire meglio noi stessi
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
