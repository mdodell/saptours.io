// Route Constants
export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const FORGOT_PASSWORD_ROUTE = "/forgot-password";
export const UPDATE_PASSWORD_ROUTE = "/update-password";
export const DASHBOARD_ROUTE = "/dashboard";
export const DASHBOARD_CALENDAR_ROUTE = "/dashboard/calendar";
export const DASHBOARD_CALENDAR_ROUTE_WITH_PARAMS = "/dashboard/calendar/:startTime/:endTime"
export const ERROR_ROUTE = "/error";
export const USER_TABLE_ROUTE = "/dashboard/user-table";
export const PROFILE_ROUTE = "/dashboard/profile";
export const PROFILE_EDIT_ROUTE = "/profile/edit";
export const PROFILE_DISPLAY_ROUTE = "/dashboard/profile/:id";

// Role Constants
export const TOUR_GUIDE = "Tour Guide";
export const HOST = "Host";
export const CHATTER = "Chatter";

// Regex
export const phoneRegExp = /\d{10}/;

// Decision Types
export const ED1 = 'ED1';
export const ED2 = 'ED2';
export const REGULAR_DECISION = 'Regular Decision';
export const MIDYEAR = 'Midyear';
export const POSSE = 'POSSE';
export const MKTYP = 'MKTYP';
export const INTERNATIONAL_STUDENT = 'International Student';
export const LEGACY_STUDENT = 'Legacy Student';
export const TRANSFER_STUDENT = 'Transfer Student';
export const DECISION_TYPES = [ED1, ED2, REGULAR_DECISION, MIDYEAR, POSSE, MKTYP, INTERNATIONAL_STUDENT, LEGACY_STUDENT, TRANSFER_STUDENT];

// Data Sources
export const MAJOR_LIST = [
    'African and African American Studies',
    'American Studies',
    'Anthropology',
    'Applied Mathematics',
    'Art History',
    'Biochemistry',
    'Biological Physics',
    'Biology',
    'Business',
    'Chemical Biology',
    'Chemistry',
    'Classical Studies',
    'Comparative Literature and Culture',
    'Computer Science',
    'Creative Writing',
    'East Asian Studies',
    'Economics',
    'Education Studies',
    'English',
    'Environmental Studies',
    'European Cultural Studies',
    'Film, Television and Interactive Media',
    'French and Francophone Studies',
    'German Studies',
    'Health: Science, Society, and Policy',
    'Hispanic Studies',
    'History',
    'Independent Interdisciplinary Major',
    'International and Global Studies',
    'Islamic and Middle Eastern Studies',
    'Linguistics',
    'Latin American and Lation Studies',
    'Mathematics',
    'Music',
    'Near Eastern and Judaic Studies',
    'Neuroscience',
    'Philosophy',
    'Physics',
    'Politics',
    'Psychology',
    'Russian Studies',
    'Sociology',
    'Studio Art',
    'Theater Arts',
    'Women\'s, Gender, and Sexuality Studies'
];

export const DIETARY_RESTRICTIONS = [
    "Lactose/Dairy",
    "Vegetarian",
    "Vegan",
    "Nut Allergies",
    "Diabetic",
    "Gluten-Free",
    "Kosher",
    "Halal"
];

export const MINOR_LIST = [
    'African and African American Studies',
    'Anthropology',
    'Arabic Language, Literature and Culture',
    'Architectural Studies',
    'Art History',
    'Business',
    'Chemistry',
    'Classical Studies',
    'Comparative Literature and Culture',
    'Computer Science',
    'Creative Writing',
    'Creativity, the Arts, and Social Transformation',
    'East Asian Studies',
    'Economics',
    'Education',
    'Education Studies',
    'English',
    'Environmental Studies',
    'Film, Television, and Interactive Media',
    'French and Francophone Studies',
    'German Studies',
    'Health: Science, Society, and Policy',
    'Hebrew Language, Literature and Culture',
    'Hispanic Studies',
    'History',
    'History of Ideas',
    'International and Global Studies',
    'Islamic and Middle Eastern Studies',
    'Italian Studies',
    'Journalism',
    'Lingusitics',
    'Latin American and Latino Studies',
    'Legal Studies',
    'Mathematics',
    'Medieval and Renaissance Studies',
    'Music',
    'Near Eastern and Judaic Studies',
    'Peace, Conflict, and Coexistence Studies',
    'Philosophy',
    'Physics',
    'Politics',
    'Psychology',
    'Religious Studies',
    'Russian Studies',
    'Sexuality and Queer Studies',
    'Social Justice and Social Policy',
    'South Asian Studies',
    'Studio Art',
    'Theater Arts',
    'Women\'s, Gender, and Sexuality Studies',
    'Yiddish and East European Jewish Culture'
];

export const CLUBS_LIST = [
    'Active Minds at Brandeis University',
    'Adagio Dance Company',
    'Archon Yearbook',
    'Asian Baptist Student Koinonia',
    'Association of Latino Professionals For America',
    'Astronomy Club',
    'Bad Grammer',
    'Badminton Club',
    'Ballet Club',
    'Banshee: Brandeis Women\'s Ultimate Frisbee',
    'Basement Records',
    'Basketball Club',
    'Behind The Scenes',
    'Blacklist Journal',
    'Boris\' Kitchen',
    'Brandeis 6TALK',
    'Brandeis Academic Debate and Speech Society',
    'Brandeis African Dance and Drumming Club',
    'Brandeis African Students Organization',
    'Brandeis American Sign Language Club',
    'Brandeis Anime and Cosplay Association',
    'Brandeis Archery Club',
    'Brandeis Asian American Students Association',
    'Brandeis Association of Music/Concert Organizing',
    'Brandeis Aviation Club',
    'Brandeis Ballroom Formation Team',
    'Brandeis Black Student Organization',
    'Brandeis Boxing Club',
    'Brandeis Brewing Society',
    'Brandeis Bridges',
    'Brandeis Chak De!',
    'Brandeis Chess Club',
    'Brandeis Chinese Culture Connection',
    'Brandeis Climate Justice',
    'Brandeis Climbing Team',
    'Brandeis Co-Ed Water Polo Club',
    'Brandeis Comic Book Club',
    'Brandeis Community Farm (Brandeis Farmers Club)',
    'Brandeis Cupcake Obsession',
    'Brandeis Democrats',
    'Brandeis Drawing Club',
    'Brandeis Emergency Medical Corps',
    'Brandeis Encourages Women in Science and Engineering',
    'Brandeis Equestrian Club',
    'Brandeis Film Collective',
    'Brandeis Firecrackers: Aerial Pole Dance and Fitness Club',
    'Brandeis Football Club',
    'Brandeis German Club',
    'Brandeis Guitar Club',
    'Brandeis Harry Potter Alliance: Imagine Better',
    'Brandeis Hillel',
    'Brandeis Initiative for Technology, Machines, Apps and Programming',
    'Brandeis Interfaith Group',
    'Brandeis Israel Public Affairs Committee',
    'Brandeis Journal of Politics',
    'Brandeis Juggling Society',
    'Brandeis Krav Maga Club',
    'Brandeis Labor Coalition',
    'Brandeis Latinx Student Organization',
    'Brandeis Law Journal Association',
    'Brandeis Men\'s Rugby Football Club',
    'Brandeis Men\'s Ultimate - TRON',
    'Brandeis Men\'s Baseball',
    'Brandeis Men\'s Basketball',
    'Brandeis Men\'s Cross Country',
    'Brandeis Men\'s Fencing',
    'Brandeis Men\'s Soccer',
    'Brandeis Men\'s Swimming & Dive',
    'Brandeis Men\'s Tennis',
    'Brandeis Men\'s Track & Field',
    'Brandeis Men\'s Volleyball Club',
    'Brandeis Official Reader\'s Guild',
    'Brandeis Organization of Sephardic Students',
    'Brandeis Orthodox Organization',
    'Brandeis Pokemon Club',
    'Brandeis Pre-Law Society',
    'Brandeis Pro-Choice',
    'Brandeis Prosthesis Club',
    'Brandeis Quidditch',
    'Brandeis Quiz Bowl Team',
    'Brandeis Reconstructionist Organization',
    'Brandeis Reform Chavurah',
    'Brandeis Rowing Team',
    'Brandeis Sailing Team',
    'Brandeis Seirenkai Karate and Jujitsu Academy',
    'Brandeis Ski and Snowboard Team',
    'Brandeis Smile Train',
    'Brandeis Society for Creative Fantasy',
    'Brandeis Society for International Affairs',
    'Brandeis Squash Club',
    'Brandeis Stand-Up',
    'Brandeis Starving Artists',
    'Brandeis Student Association for TRII',
    'Brandeis Students for Justice in Palestine',
    'Brandeis Students to End Alzheimer\'s Disease',
    'Brandeis Swingers',
    'Brandeis Table Tennis Club',
    'Brandeis Tae Kwon Do',
    'Brandeis Television',
    'Brandeis Tennis Club',
    'Brandeis Traditional Music Club',
    'Brandeis UAID',
    'Brandeis Undergraduate Investment Club',
    'Brandeis University Cheerleading Team',
    'Brandeis University Conservative Organization',
    'Brandeis University Mock Trial Association',
    'Brandeis Veg Club',
    'Brandeis VoiceMale',
    'Brandeis W. Lacrosse Club',
    'Brandeis Women\'s Basketball',
    'Brandeis Women\'s Cross Country',
    'Brandeis Women\'s Fencing',
    'Brandeis Women\'s Soccer',
    'Brandeis Women\'s Softball',
    'Brandeis Women\'s Swimming & Dive',
    'Brandeis Women\'s Tennis',
    'Brandeis Women\'s Track & Field',
    'Brandeis Women\'s Volleyball',
    'Brandeis YourStory International',
    'Brandeis esports Organization (SSBM)',
    'Brazilian Jiu Jitsu',
    'Campus Activities Board',
    'Caribbean Cultural Club',
    'Catholic Student Organization',
    'Chabad at Brandeis',
    'Club Cantonese',
    'Co-Ed Volleyball Club',
    'Colleges Against Cancer',
    'Common Ground',
    'Company B',
    'Console Gamers X',
    'Crowd Control Improv Comedy',
    'Cru Brandeis Christian Fellowship',
    'Deis Robotics',
    'Education for Students by Students',
    'English Language Learning Initiative',
    'False Advertising',
    'Fashion Design',
    'Feminist Majority Leadership Alliance',
    'Fencing Club',
    'Food Recovery Network',
    'Foundation for International Medical Relief of Children',
    'Free Play Theatre Cooperative',
    'French and Francophone Club',
    'Game Knight',
    'GirlUp',
    'Global Brigades',
    'Global China Connection Brandeis Chapter',
    'Gravity',
    'Greek Awareness Council',
    'Gymnastics Club',
    'Her Campus Brandeis',
    'Hold Thy Peace',
    'Hooked on Tap',
    'Ice Skating Club',
    'J Street U',
    'Jaded',
    'Japanese Student Association',
    'Jewish Feminist Association of Brandeis',
    'Judges for Israel',
    'Kaos Kids',
    'Korean Students Association',
    'Laurel Moon',
    'Liquid Latex',
    'MEOR at Brandeis',
    'Manginah',
    'Minority Association for PreMedical Students',
    'Mountain Club',
    'Muslim Student Association',
    'Namaskar',
    'Net Impact: Undergrad Chapter',
    'Neuroscience Club',
    'No Singer Clef Behind',
    'Partners in Health Engage Brandeis',
    'Photography club',
    'Platinum Step Team',
    'Pottery Club',
    'Pre-Dental Society',
    'Pre-Health Society',
    'Pre-Veterinary Society and Animal Appreciation Club',
    'Proscenium Musical Theatre A Cappella',
    'Rather Be Giraffes',
    'Russian Club',
    'STAND: Refugee Advocacy and Mass Atrocity Prevention (previous name: STAND: The Student Led Movement to End Mass Atrocities)',
    'Salseros',
    'Sangha: Buddhist Meditation Club',
    'Sharsheret at Brandeis',
    'Society for the Advancement of Chicanos and Native Americans in Science',
    'Society of Asian Scientists and Engineers',
    'South Asian Student Association',
    'Southeast Asia Club',
    'Stop Motion Dance Crew',
    'Student Committee for the Rose Art Museum',
    'Student Sexuality Information Service',
    'Students Talking About Relationships',
    'Students for Environmental Action',
    'TAMID Group at Brandeis',
    'Taiwanese Student Association',
    'The Brandeis Hoot',
    'The Justice',
    'To Be Announced Improv & Sketch Comedy',
    'Too Cheap For Instruments',
    'Top Score',
    'Toxic Majorette Dance Line',
    'Trading Card Game club',
    'Triskelion',
    'Undergraduate Student Union',
    'Undergraduate Theater Collective',
    'Up The Octave',
    'Vietnamese Students Association',
    'Virtual Reality and Game Development Club',
    'Voices of Soul',
    'WBRS 100.1 FM',
    'Waltham Group',
    'Women of Color Alliance',
    'Women\'s Rugby',
    'Work in Progress',
    'Young Americans for Liberty'
];

export const CLUB_TYPES = {
    ACADEMIC: [
        'Association of Latino Professionals For America',
        'Astronomy Club',
        'Brandeis American Sign Language Club',
        'Brandeis Initiative for Technology, Machines, Apps and Programming',
        'Brandeis Pre-Law Society',
        'Brandeis Smile Train',
        'Brandeis Society for International Affairs',
        'Brandeis Undergraduate Investment Club',
        'Brandeis University Mock Trial Association',
        'Deis Robotics',
        'Education for Students by Students',
        'Global China Connection Brandeis Chapter',
        'Minority Association for PreMedical Students',
        'Net Impact: Undergrad Chapter',
        'Neuroscience Club',
        'Pre-Dental Society',
        'Pre-Health Society',
        'Pre-Veterinary Society and Animal Appreciation Club',
        'Society for the Advancement of Chicanos and Native Americans in Science',
        'Society of Asian Scientists and Engineers',
        'TAMID Group at Brandeis',
        'Virtual Reality and Game Development Club'
    ],
    ARTS_AND_CULTURE: [
        'Brandeis African Dance and Drumming Club',
        'Brandeis African Students Organization',
        'Brandeis Anime and Cosplay Association',
        'Brandeis Asian American Students Association',
        'Brandeis Association of Music/Concert Organizing',
        'Brandeis Ballroom Formation Team',
        'Brandeis Black Student Organization',
        'Brandeis Brewing Society',
        'Brandeis Bridges',
        'Brandeis Chinese Culture Connection',
        'Brandeis Comic Book Club',
        'Brandeis Drawing Club',
        'Brandeis Film Collective',
        'Brandeis German Club',
        'Brandeis Latinx Student Organization',
        'Brandeis Official Reader\'s Guild',
        'Brandeis Organization of Sephardic Students',
        'Brandeis Society for Creative Fantasy',
        'Brandeis Swingers',
        'Caribbean Cultural Club',
        'Club Cantonese',
        'Fashion Design',
        'French and Francophone Club',
        'Japanese Student Association',
        'Korean Students Association',
        'Liquid Latex',
        'Photography club',
        'Platinum Step Team',
        'Pottery Club',
        'Russian Club',
        'Salseros',
        'South Asian Student Association',
        'Southeast Asia Club',
        'Student Committee for the Rose Art Museum',
        'Taiwanese Student Association',
        'Toxic Majorette Dance Line',
        'Triskelion',
        'Vietnamese Students Association'
    ],
    COMPETITION: [
        'Brandeis Academic Debate and Speech Society',
        'Brandeis Chess Club',
        'Brandeis Climbing Team',
        'Brandeis Football Club',
        'Brandeis Quiz Bowl Team',
        'Brandeis Ski and Snowboard Team',
        'Brandeis Esports Organization (SSBM)'
    ],
    MEDIA_AND_PUBLICATIONS: [
        'Archon Yearbook',
        'Basement Records',
        'Blacklist Journal',
        'Brandeis Journal of Politics',
        'Brandeis Law Journal Association',
        'Brandeis Television',
        'Gravity',
        'Her Campus Brandeis',
        'Jaded',
        'Laurel Moon',
        'The Brandeis Hoot',
        'The Justice',
        'WBRS 100.1 FM'
    ],
    PERFORMANCE: [
        'Adagio Dance Company',
        'Bad Grammer',
        'Ballet Club',
        'Behind The Scenes',
        'Boris\' Kitchen',
        'Brandeis Chak De!',
        'Brandeis Guitar Club',
        'Brandeis Juggling Society',
        'Brandeis Stand-Up',
        'Brandeis Starving Artists',
        'Brandeis Traditional Music Club',
        'Brandeis VoiceMale',
        'Company B',
        'Crowd Control Improv Comedy',
        'False Advertising',
        'Free Play Theatre Cooperative',
        'Hold Thy Peace',
        'Hooked on Tap',
        'Kaos Kids',
        'Manginah',
        'No Singer Clef Behind',
        'Proscenium Musical Theatre A Cappella',
        'Rather Be Giraffes',
        'Stop Motion Dance Crew',
        'To Be Announced Improv & Sketch Comedy',
        'Too Cheap For Instruments',
        'Top Score',
        'Undergraduate Theater Collective',
        'Up The Octave',
        'Voices of Soul',
        'Work in Progress'
    ],
    POLITICAL_AND_ACTIVISM: [
        'Active Minds at Brandeis University',
        'Brandeis Climate Justice',
        'Brandeis Community Farm (Brandeis Farmers Club)',
        'Brandeis Democrats',
        'Brandeis Israel Public Affairs Committee',
        'Brandeis Labor Coalition',
        'Brandeis Pro-Choice',
        'Brandeis Students for Justice in Palestine',
        'Brandeis Veg Club',
        'Feminist Majority Leadership Alliance',
        'GirlUp',
        'J Street U',
        'Judges for Israel',
        'Partners in Health Engage Brandeis',
        'STAND: Refugee Advocacy and Mass Atrocity Prevention (previous name: STAND: The Student Led Movement to End Mass Atrocities)',
        'Students for Environmental Action',
        'Undergraduate Student Union',
        'Young Americans for Liberty'
    ],
    SERVICE: [
        'Brandeis 6TALK',
        'Brandeis Emergency Medical Corps',
        'Brandeis Encourages Women in Science and Engineering',
        'Brandeis Harry Potter Alliance: Imagine Better',
        'Brandeis Student Association for TRII',
        'Brandeis Students to End Alzheimer\'s Disease',
        'Brandeis UAID',
        'Brandeis YourStory International',
        'Colleges Against Cancer',
        'English Language Learning Initiative',
        'Food Recovery Network',
        'Foundation for International Medical Relief of Children',
        'Global Brigades',
        'Sharsheret at Brandeis',
        'Student Sexuality Information Service',
        'Students Talking About Relationships',
        'Waltham Group'
    ],
    SPIRITUAL_AND_RELIGIOUS: [
        'Asian Baptist Student Koinonia',
        'Brandeis Hillel',
        'Brandeis Interfaith Group',
        'Brandeis Orthodox Organization',
        'Brandeis Reconstructionist Organization',
        'Brandeis Reform Chavurah',
        'Brandeis University Conservative Organization',
        'Catholic Student Organization',
        'Chabad at Brandeis',
        'Common Ground',
        'Cru Brandeis Christian Fellowship',
        'Jewish Feminist Association of Brandeis',
        'MEOR at Brandeis',
        'Muslim Student Association',
        'Namaskar',
        'Sangha: Buddhist Meditation Club'
    ],
    SPORTS_AND_FITNESS: [
        'Badminton Club',
        'Banshee: Brandeis Women\'s Ultimate Frisbee',
        'Basketball Club',
        'Brandeis Archery Club',
        'Brandeis Boxing Club',
        'Brandeis Co-Ed Water Polo Club',
        'Brandeis Equestrian Club',
        'Brandeis Firecrackers: Aerial Pole Dance and Fitness Club',
        'Brandeis Krav Maga Club',
        'Brandeis Men\'s Rugby Football Club',
        'Brandeis Men\'s Ultimate - TRON',
        'Brandeis Men\'s Volleyball Club',
        'Brandeis Quidditch',
        'Brandeis Rowing Team',
        'Brandeis Sailing Team',
        'Brandeis Seirenkai Karate and Jujitsu Academy',
        'Brandeis Squash Club',
        'Brandeis Table Tennis Club',
        'Brandeis Tae Kwon Do',
        'Brandeis Tennis Club',
        'Brandeis University Cheerleading Team',
        'Brandeis W. Lacrosse Club',
        'Brazilian Jiu Jitsu',
        'Co-Ed Volleyball Club',
        'Fencing Club',
        'Gymnastics Club',
        'Ice Skating Club',
        'Mountain Club',
        'Women\'s Rugby'
    ],
    MISCELLANEOUS: [
        'Brandeis Aviation Club',
        'Brandeis Cupcake Obsession',
        'Brandeis Pokemon Club',
        'Brandeis Prosthesis Club',
        'Campus Activities Board',
        'Console Gamers X',
        'Game Knight',
        'Greek Awareness Council',
        'Trading Card Game Club',
        'Women of Color Alliance'
    ]
};

export const FELLOWSHIPS_AND_SCHOLARSHIPS = [
    'Barry M. Goldwater Scholarship',
    'Beinecke Scholarship Program',
    'Boren Scholarship',
    'Brandeis International Business School (IBS) Scholars',
    'Brandeis-Canada Endowed Scholarship',
    'Churchill Scholarship',
    'Critical Language Scholarship',
    'DAAD Research Internships in Science and Engineering (RISE)',
    'Dean\'s Scholarship',
    'Dr. Martin Luther King Jr. Fellowship',
    'Fulbright U.S. Student Program',
    'George J. Mitchell Scholarship',
    'Giumette Academic Achievement Award (GAAA)',
    'Harry S. Truman Scholarship Foundation',
    'Humanities Fellowship',
    'Humanity in Action Fellowship',
    'James C. Gaither Junior Fellows Program',
    'Justice Brandeis Scholarship',
    'Mandel Undergraduate Fellowship',
    'Mortimer Hays-Brandeis Traveling Fellowship',
    'Pickering Fellowship',
    'Presidential Scholarship',
    'Provost\'s Undergraduate Research Fund',
    'QBReC Fellowship',
    'Rangel Summer Enrichment Program',
    'Rhodes Scholarship',
    'Richard and Barbara Silverman Endowed Scholarship',
    'Schiff Undergraduate Fellows Program',
    'Schwarzman Scholars',
    'Senior Thesis Funding',
    'Sorensen Fellowship',
    'Soros Fellowships',
    'Stroum Family Waltham Scholarship',
    'The Davis United World College Scholars Program',
    'The Gates Cambridge Trust',
    'The Leonard Bernstein Fellowship',
    'The Marshall Scholarship',
    'The Wien International Scholarship Program',
    'Trustee Scholarship',
    'Udall Scholarship'
];

export const TOUR_SHIFTS = [
    { label: "9:00 am", value: 9 },
    { label: "11:00 am", value: 11 },
    { label: "1:00 pm", value: 13 },
    { label: "3:00 pm", value: 15 }
];

export const TOUR_TYPES = [
    "Admissions Tour",
    "Group Visit",
    "VIP Tour",
    "Accessibility Tour",
    "Fall for Brandeis Day",
    "Counselor Tour"
];

export const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const STATES = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming"
];

// Miscellaneous
export const AND_QUERY = "AND Query";
export const OR_QUERY = "OR Query"