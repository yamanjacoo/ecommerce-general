import Link from "next/link"
import {
  Coffee,
  Home,
  Droplet,
  PenToolIcon as Tool,
  Scissors,
  Zap,
  Package,
  Power,
  Flame,
  Waves,
  Tent,
  TreesIcon as Tree,
  Music,
  SpadeIcon as Spa,
} from "lucide-react"

const categories = [
  { name: "Coffee Makers & Espresso Machines", icon: Coffee },
  { name: "Sheds", icon: Home },
  { name: "Pressure Washers", icon: Droplet },
  { name: "Fluke Products", icon: Zap },
  { name: "Mowers", icon: Scissors },
  { name: "Plumbing Tools", icon: Tool },
  { name: "Lasers", icon: Zap },
  { name: "Material Handling", icon: Package },
  { name: "Generators", icon: Power },
  { name: "Grills", icon: Flame },
  { name: "Pools", icon: Waves },
  { name: "Playground Equipment", icon: Tree },
  { name: "Gazebos", icon: Tent },
  { name: "Playhouses", icon: Home },
  { name: "Pro Audio Gear", icon: Music },
  { name: "Spa Showroom", icon: Spa },
]

export default function CategoryGrid() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Browse Help by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/help-center/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <category.icon className="w-8 h-8 mb-2 text-primary" />
            <span className="text-center text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

