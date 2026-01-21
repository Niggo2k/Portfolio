import { cn } from "@/lib/utils"
import { IconPush, IconGamepad, IconSuitcaseSticker, IconAudio, IconSoccer, IconDumbell } from "@central-icons-react/round-filled-radius-3-stroke-2"

export interface Interest {
  icon: typeof IconPush | typeof IconGamepad | typeof IconSuitcaseSticker | typeof IconAudio
  label: string
}

interface InterestsSectionProps {
  className?: string
}

// Static interests data
const interestsData: Interest[] = [
  { icon: IconPush, label: "Building side projects" },
  { icon: IconGamepad, label: "Gaming" },
  { icon: IconSuitcaseSticker, label: "Travel" },
  { icon: IconAudio, label: "Music" },
  { icon: IconDumbell, label: "Fitness" },
  { icon: IconSoccer, label: "Soccer" },
]

export function InterestsSection({ className }: InterestsSectionProps) {
  return (
    <section
      className={cn(
        "scroll-reveal w-full px-16 max-md:px-8 py-8",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className=" font-medium text-foreground text-2xl mb-6">
          When I&apos;m not coding
        </h2>
        <div className="flex flex-wrap gap-3">
          {interestsData.map((interest, index) => {
            const Icon = interest.icon
            return (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-muted/50 border border-border rounded-full px-4 py-2 transition-colors hover:bg-muted"
              >
                {Icon && (
                  <Icon
                    size={20}
                    className="text-muted-foreground fill-current"
                  />
                )}
                <span className=" text-sm text-muted-foreground">
                  {interest.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
