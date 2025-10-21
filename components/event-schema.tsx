// "use client"

// import { StructuredData } from "./structured-data"
// import { eventSchema } from "../lib/structured-data"

// interface EventSchemaProps {
//   eventName: string
//   startDate: string
//   endDate: string
//   location: string
// }

// export function EventSchema({ 
//   eventName, 
//   startDate, 
//   endDate, 
//   location 
// }: EventSchemaProps) {
//   const eventData = eventSchema(eventName, startDate, endDate, location)
  
//   return <StructuredData data={eventData} />
// }

// // Example usage for upcoming fashion shows
// export function FashionShowSchema() {
//   const upcomingEvent = {
//     eventName: "Studio Miradia Spring Collection Launch",
//     startDate: "2024-03-15T18:00:00+05:30",
//     endDate: "2024-03-15T21:00:00+05:30",
//     location: "Studio Miradia Showroom, Mumbai"
//   }

//   return <EventSchema {...upcomingEvent} />
// }
