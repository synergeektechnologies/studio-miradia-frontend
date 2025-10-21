// "use client"

// import { StructuredData } from "./structured-data"
// import { howToSchema } from "../lib/structured-data"

// export function CareInstructionsSchema() {
//   const careSteps = [
//     {
//       name: "Check the care label",
//       text: "Always check the care label on your garment for specific washing instructions. Our garments are made with natural fabrics that require gentle care.",
//       image: "/care-label.jpg"
//     },
//     {
//       name: "Use cold water",
//       text: "Wash your Studio Miradia garments in cold water (30°C or below) to prevent shrinking and color fading. Cold water is gentler on natural fabrics.",
//       image: "/cold-water.jpg"
//     },
//     {
//       name: "Use mild detergent",
//       text: "Use a mild, eco-friendly detergent that's suitable for delicate fabrics. Avoid harsh chemicals that can damage the natural fibers.",
//       image: "/mild-detergent.jpg"
//     },
//     {
//       name: "Hand wash or gentle cycle",
//       text: "For best results, hand wash your garments or use the gentle/delicate cycle on your washing machine. Avoid wringing or twisting the fabric.",
//       image: "/hand-wash.jpg"
//     },
//     {
//       name: "Air dry flat",
//       text: "Lay your garments flat to dry in a shaded area. Avoid direct sunlight which can fade colors and damage natural fibers.",
//       image: "/air-dry.jpg"
//     },
//     {
//       name: "Iron on low heat",
//       text: "If ironing is needed, use the lowest heat setting and iron on the reverse side. Place a cloth between the iron and fabric for extra protection.",
//       image: "/ironing.jpg"
//     }
//   ]

//   const careData = howToSchema(careSteps)
  
//   return <StructuredData data={careData} />
// }
