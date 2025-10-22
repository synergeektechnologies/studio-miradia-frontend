import { Heart, Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#8B5A4A]/5 via-white to-[#8B5A4A]/10 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Heart */}
        <div className="relative mb-8">
          <div className="animate-bounce">
            <Heart className="h-12 w-12 text-[#8B5A4A] mx-auto" />
          </div>
          <div className="absolute -top-2 -left-2 animate-pulse">
            <Sparkles className="h-4 w-4 text-[#8B5A4A]/60" />
          </div>
          <div className="absolute -top-1 -right-3 animate-pulse delay-150">
            <Sparkles className="h-3 w-3 text-[#8B5A4A]/40" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-serif text-[#8B5A4A]">
            Loading...
          </h2>
          <p className="text-sm text-gray-600">
            Preparing something beautiful for you
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-[#8B5A4A] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#8B5A4A] rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-[#8B5A4A] rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  )
}
