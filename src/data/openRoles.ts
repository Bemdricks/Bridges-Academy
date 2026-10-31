export interface OpenRole {
  title: string;
  type: string;
  department: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  schedule?: string;
}

export const openRolesIntro = {
  headline: 'Join our team',
  body: 'Carmel Academy is hiring educators and leaders who believe every child can belong and become. We teach strong academics alongside social-emotional skills, leadership, entrepreneurship, financial literacy, and real-world experience, so students leave each grade confident, capable, and ready for what comes next.',
  close: 'If you want to help build a school from the ground up, in a small community where every adult knows every child, we would love to meet you.',
};

export const openRoles: OpenRole[] = [
  {
    title: 'Lead Teacher',
    type: 'Full-time',
    department: 'Academics',
    summary: 'The Lead Teacher is the primary educator for a small, close-knit classroom at Carmel Academy. You will plan and deliver rigorous, personalized instruction while teaching students the life skills that help them thrive: asking for help, managing emotions, resolving conflict, and speaking up for themselves. You will build a classroom where every child feels known, valued, and challenged to grow.',
    responsibilities: [
      'Plan and teach daily lessons in reading, writing, math, science, and social studies aligned to our standards and curriculum.',
      'Personalize instruction using regular assessment so each student is met where they are and moved forward.',
      'Lead the weekly life skills block and weave social-emotional learning into the school day.',
      'Create a warm, structured classroom culture built on belonging, respect, and high expectations.',
      'Guide student leadership opportunities, student ventures, and monthly real-world experiences.',
      'Track student progress and share it with families through conferences, written updates, and regular communication.',
      'Partner with the Assistant Teacher, School Coordinator, and trade instructors to deliver a connected student experience.',
      'Take part in family workshops, school events, and staff planning and training.',
    ],
    qualifications: [
      'Bachelor\'s degree in education or a related field (required).',
      'Valid teaching certification preferred.',
      'Two or more years of classroom teaching experience, ideally in elementary grades.',
      'Demonstrated success supporting students who are working below grade level and helping them accelerate.',
      'Working knowledge of social-emotional learning, project-based learning, or applied learning approaches.',
      'Strong communication skills and a genuine commitment to partnering with families.',
      'Comfort working in a startup environment: flexible, resourceful, and eager to help shape the school.',
      'Ability to pass a background check.',
    ],
    preferred: [
      'Experience with entrepreneurship, financial literacy, or career exploration in the classroom.',
      'Experience in a small school, microschool, or new school launch.',
    ],
  },
  {
    title: 'Assistant Teacher',
    type: 'Full-time',
    department: 'Academics',
    summary: 'The Assistant Teacher works side by side with the Lead Teacher to support learning, build relationships, and keep the classroom running smoothly. You will give students the extra attention that helps them feel safe, confident, and ready to learn, in small groups and one-on-one. This is a strong fit for someone who loves children, wants to grow in education, and is excited to be part of a new school.',
    responsibilities: [
      'Support the Lead Teacher in delivering daily lessons and classroom routines.',
      'Work with individual students and small groups on reading, math, and other skills.',
      'Help students practice life skills such as asking for help, calming down, and resolving conflicts respectfully.',
      'Help manage transitions, supervise students during arrival, lunch, recess, and dismissal, and keep all students safe.',
      'Prepare materials, set up classroom activities, and keep the learning space organized.',
      'Support field experiences, guest speakers, and hands-on projects.',
      'Share observations about student progress and needs with the Lead Teacher.',
      'Communicate warmly and professionally with families.',
    ],
    qualifications: [
      'High school diploma or equivalent required; associate\'s or bachelor\'s degree, or college coursework in education, preferred.',
      'Experience working with children in a classroom, tutoring, childcare, or youth program setting.',
      'Patience, warmth, and the ability to build trust with young learners.',
      'Reliable, organized, and able to take direction and work well as part of a small team.',
      'Willingness to learn and grow, including taking part in training before and during the school year.',
      'Ability to pass a background check.',
    ],
    preferred: [
      'Experience supporting students with varied learning needs.',
      'Interest in becoming a lead teacher in the future.',
    ],
  },
  {
    title: 'Part-Time Trade Instructor',
    type: 'Part-time',
    department: 'Applied Learning & Pathway Exploration',
    summary: 'Trade Instructors give Carmel Academy students a hands-on look at real careers. You will introduce students to your trade through age-appropriate, practical projects and conversations, helping them see what is possible and connecting classroom learning to the working world.',
    responsibilities: [
      'Design and lead short, hands-on lessons that introduce students to your trade, such as building, repair, design, culinary, or other skilled work.',
      'Teach basic tools, safety habits, and vocabulary at a level that fits elementary students.',
      'Share your career story and the steps it takes to enter and grow in your field.',
      'Connect lessons to math, problem solving, teamwork, and entrepreneurship.',
      'Supervise students during activities and enforce safe tool and workspace practices at all times.',
      'Coordinate schedules and lesson plans with the Lead Teachers and School Coordinator.',
      'Help identify other tradespeople and local employers who could visit, mentor, or host student experiences.',
      'Maintain and organize your tools and materials.',
    ],
    qualifications: [
      'Proven experience and skill in a trade or skilled profession, such as construction, electrical, plumbing, automotive, carpentry, culinary, cosmetology, technology, or similar.',
      'Professional license or certification in your field preferred where applicable.',
      'Experience teaching, coaching, mentoring, or training others is a plus. Formal teaching credentials are not required.',
      'Ability to explain your work clearly and patiently to young children.',
      'Strong commitment to safety and good judgment around students.',
      'Reliable and professional, and able to commit to a set weekly or monthly schedule.',
      'Ability to pass a background check.',
    ],
    preferred: [],
    schedule: 'Part time. Hours and days are set from the school calendar and the needs of our students.',
  },
  {
    title: 'School Coordinator',
    type: 'Full-time',
    department: 'Operations and Family Services',
    summary: 'The School Coordinator keeps day-to-day operations organized, welcoming, and running on time. You will manage the front office, support enrollment and family communication, and coordinate the schedules, events, and partnerships that bring the program to life.',
    responsibilities: [
      'Welcome families, visitors, and community partners and serve as the main point of contact for the front office.',
      'Manage enrollment steps, including inquiries, school tours, applications, registration, and family onboarding.',
      'Maintain accurate student records, attendance, and required school documentation.',
      'Coordinate school calendars, staff schedules, family workshops, and special events.',
      'Schedule and support monthly real-world experiences, field trips, guest speakers, and trade instructor visits.',
      'Send regular communication to families through email, text, and school systems.',
      'Order and track supplies, manage vendor relationships, and support facility needs.',
      'Support the Founder and teaching team with administrative tasks, reporting, and compliance.',
      'Help build and refine school systems and procedures as the school grows.',
    ],
    qualifications: [
      'High school diploma required; associate\'s or bachelor\'s degree preferred.',
      'Two or more years of experience in school administration, office management, customer service, or a similar coordinating role.',
      'Excellent written and verbal communication and a warm, professional presence with families.',
      'Strong organization, time management, and attention to detail.',
      'Proficiency with Google Workspace or Microsoft Office, and comfort learning student information, enrollment, and communication platforms.',
      'Ability to handle confidential information with care.',
      'Ability to manage multiple priorities and solve problems independently in a startup environment.',
      'Ability to pass a background check.',
    ],
    preferred: [
      'Experience in a school, childcare center, or nonprofit setting.',
      'Bilingual skills.',
    ],
  },
];
