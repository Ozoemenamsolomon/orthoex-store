

export interface EventDataType   { 
  id: number,
  title: string,
  event_format: string,
  start_date: string,
  end_date: string,
  start_time: string,
  end_time: string,
  location: {city: string, state: string},
  price: number,
  contact: {call: string, chat:string}, 
  course_info: {
    course: string,
    instructor: string[]
  },
  refreshment: boolean,
  starter_pack: boolean,
  participants: number,
  booked_spot: number,
}


export const featuredEvents:EventDataType[]  = [
  { 
    id: 1,
    title: "Working with the glass fibre reinforced concrete",
    event_format: "Online",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: {city: "Ikeja", state: "Lagos"},
    price: 10000,
    contact: {call: "", chat: ""}, 
    course_info: {
      course: "In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over",
      instructor: ["Attended the school of fine arts and design in berlin", 'Founded his own miniature label "savage feget minis"', "In 2012 - has since worked for leading companies in the gaming industry" ]
    },
    refreshment: true,
    starter_pack: true,
    participants: 12,
    booked_spot: 3,
  },
  { 
    id: 2,
    title: "Working with the glass fibre reinforced concrete",
    event_format: "Onsite",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: {city: "Badagry", state: "Lagos"},
    price: 10000,
    contact: {call: "", chat: ""}, 
    course_info: {
      course: "In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over",
      instructor: ["Attended the school of fine arts and design in berlin", 'Founded his own miniature label "savage feget minis"', "In 2012 - has since worked for leading companies in the gaming industry" ]
    },
    refreshment: true,
    starter_pack: true,
    participants: 12,
    booked_spot: 3,
  },
  { 
    id: 1,
    title: "Working with the glass fibre reinforced concrete",
    event_format: "Online",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: {city: "Ikeja", state: "Lagos"},
    price: 10000,
    contact: {call: "", chat: ""}, 
    course_info: {
      course: "In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over",
      instructor: ["Attended the school of fine arts and design in berlin", 'Founded his own miniature label "savage feget minis"', "In 2012 - has since worked for leading companies in the gaming industry" ]
    },
    refreshment: true,
    starter_pack: true,
    participants: 12,
    booked_spot: 3,
  },
  { 
    id: 1,
    title: "Working with the glass fibre reinforced concrete",
    event_format: "Online",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    location: {city: "Ikeja", state: "Lagos"},
    price: 10000,
    contact: {call: "", chat: ""}, 
    course_info: {
      course: "In this workshop, the anatomical basics of modeling are taught on the basis of the eye, nose and ear. The right choice of modelling clay will be another component. Important tools and corresponding techniques are discussed.At the end of the seminar, a certificate of participation will be handed over",
      instructor: ["Attended the school of fine arts and design in berlin", 'Founded his own miniature label "savage feget minis"', "In 2012 - has since worked for leading companies in the gaming industry" ]
    },
    refreshment: true,
    starter_pack: true,
    participants: 12,
    booked_spot: 3,
  }
]

