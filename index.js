const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const express = require('express');
const cron = require('node-cron');

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error('Error: BOT_TOKEN environment variable is not set.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const app = express();
app.get('/', (req, res) => {
  res.send('Bot is running!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const quizData = {
  A1: [
  { word: 'яблоко', meaning: 'Apple', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇦' },
  { word: 'дом', meaning: 'House', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇧' },
  { word: 'кошка', meaning: 'Cat', options: ['A: Cat', 'B: Dog', 'C: House', 'D: Apple'], correct: '🇦' },
  { word: 'собака', meaning: 'Dog', options: ['A: Apple', 'B: Cat', 'C: Dog', 'D: House'], correct: '🇨' },
  { word: 'мама', meaning: 'Mother', options: ['A: Father', 'B: Brother', 'C: Sister', 'D: Mother'], correct: '🇩' },
  { word: 'папа', meaning: 'Father', options: ['A: Mother', 'B: Brother', 'C: Father', 'D: Sister'], correct: '🇨' },
  { word: 'стол', meaning: 'Table', options: ['A: Chair', 'B: Table', 'C: Sofa', 'D: Bed'], correct: '🇧' },
  { word: 'стул', meaning: 'Chair', options: ['A: Table', 'B: Chair', 'C: Door', 'D: Window'], correct: '🇧' },
  { word: 'книга', meaning: 'Book', options: ['A: Book', 'B: Pen', 'C: Paper', 'D: Bag'], correct: '🇦' },
  { word: 'ручка', meaning: 'Pen', options: ['A: Pencil', 'B: Eraser', 'C: Pen', 'D: Book'], correct: '🇨' },
  { word: 'окно', meaning: 'Window', options: ['A: Wall', 'B: Door', 'C: Floor', 'D: Window'], correct: '🇩' },
  { word: 'дверь', meaning: 'Door', options: ['A: Window', 'B: Floor', 'C: Door', 'D: Wall'], correct: '🇨' },
  { word: 'ребёнок', meaning: 'Child', options: ['A: Child', 'B: Adult', 'C: Boy', 'D: Girl'], correct: '🇦' },
  { word: 'друг', meaning: 'Friend', options: ['A: Enemy', 'B: Neighbor', 'C: Friend', 'D: Stranger'], correct: '🇨' },
  { word: 'сестра', meaning: 'Sister', options: ['A: Mother', 'B: Father', 'C: Brother', 'D: Sister'], correct: '🇩' },
  { word: 'брат', meaning: 'Brother', options: ['A: Sister', 'B: Brother', 'C: Uncle', 'D: Aunt'], correct: '🇧' },
  { word: 'утро', meaning: 'Morning', options: ['A: Morning', 'B: Evening', 'C: Afternoon', 'D: Night'], correct: '🇦' },
  { word: 'вечер', meaning: 'Evening', options: ['A: Morning', 'B: Afternoon', 'C: Evening', 'D: Night'], correct: '🇨' },
  { word: 'ночь', meaning: 'Night', options: ['A: Day', 'B: Night', 'C: Afternoon', 'D: Morning'], correct: '🇧' },
  { word: 'день', meaning: 'Day', options: ['A: Morning', 'B: Day', 'C: Night', 'D: Evening'], correct: '🇧' },
  { word: 'машина', meaning: 'Car', options: ['A: Car', 'B: Bus', 'C: Train', 'D: Plane'], correct: '🇦' },
  { word: 'автобус', meaning: 'Bus', options: ['A: Train', 'B: Bus', 'C: Car', 'D: Plane'], correct: '🇧' },
  { word: 'поезд', meaning: 'Train', options: ['A: Bus', 'B: Car', 'C: Train', 'D: Plane'], correct: '🇨' },
  { word: 'самолёт', meaning: 'Plane', options: ['A: Train', 'B: Bus', 'C: Plane', 'D: Car'], correct: '🇨' },
  { word: 'город', meaning: 'City', options: ['A: Town', 'B: Country', 'C: City', 'D: Village'], correct: '🇨' },
  { word: 'деревня', meaning: 'Village', options: ['A: City', 'B: Village', 'C: Town', 'D: Country'], correct: '🇧' },
  { word: 'улица', meaning: 'Street', options: ['A: Street', 'B: Road', 'C: Path', 'D: Highway'], correct: '🇦' },
  { word: 'телефон', meaning: 'Phone', options: ['A: Computer', 'B: Phone', 'C: Tablet', 'D: TV'], correct: '🇧' },
  { word: 'компьютер', meaning: 'Computer', options: ['A: Tablet', 'B: Phone', 'C: Computer', 'D: Laptop'], correct: '🇨' },
  { word: 'хлеб', meaning: 'Bread', options: ['A: Butter', 'B: Jam', 'C: Bread', 'D: Cheese'], correct: '🇨' },
  { word: 'молоко', meaning: 'Milk', options: ['A: Water', 'B: Milk', 'C: Juice', 'D: Tea'], correct: '🇧' },
  { word: 'вода', meaning: 'Water', options: ['A: Milk', 'B: Water', 'C: Juice', 'D: Tea'], correct: '🇧' },
  { word: 'сок', meaning: 'Juice', options: ['A: Juice', 'B: Milk', 'C: Tea', 'D: Coffee'], correct: '🇦' },
  { word: 'чай', meaning: 'Tea', options: ['A: Coffee', 'B: Juice', 'C: Tea', 'D: Milk'], correct: '🇨' },
  { word: 'кофе', meaning: 'Coffee', options: ['A: Tea', 'B: Milk', 'C: Coffee', 'D: Juice'], correct: '🇨' },
  { word: 'еда', meaning: 'Food', options: ['A: Drink', 'B: Food', 'C: Snack', 'D: Meal'], correct: '🇧' },
  { word: 'мясо', meaning: 'Meat', options: ['A: Meat', 'B: Bread', 'C: Fish', 'D: Vegetable'], correct: '🇦' },
  { word: 'рыба', meaning: 'Fish', options: ['A: Meat', 'B: Fish', 'C: Bread', 'D: Cheese'], correct: '🇧' },
  { word: 'овощи', meaning: 'Vegetables', options: ['A: Fruit', 'B: Vegetables', 'C: Bread', 'D: Meat'], correct: '🇧' },
  { word: 'фрукты', meaning: 'Fruits', options: ['A: Vegetables', 'B: Fruits', 'C: Bread', 'D: Meat'], correct: '🇧' },
  ],
  A2: [
  { word: 'зима', meaning: 'Winter', options: ['A: Summer', 'B: Winter', 'C: Spring', 'D: Autumn'], correct: '🇧' },
  { word: 'лето', meaning: 'Summer', options: ['A: Spring', 'B: Autumn', 'C: Summer', 'D: Winter'], correct: '🇨' },
  { word: 'весна', meaning: 'Spring', options: ['A: Spring', 'B: Winter', 'C: Autumn', 'D: Summer'], correct: '🇦' },
  { word: 'осень', meaning: 'Autumn', options: ['A: Summer', 'B: Spring', 'C: Autumn', 'D: Winter'], correct: '🇨' },
  { word: 'учитель', meaning: 'Teacher', options: ['A: Student', 'B: Teacher', 'C: Principal', 'D: Parent'], correct: '🇧' },
  { word: 'ученик', meaning: 'Student', options: ['A: Teacher', 'B: Student', 'C: Friend', 'D: Neighbor'], correct: '🇧' },
  { word: 'врач', meaning: 'Doctor', options: ['A: Engineer', 'B: Doctor', 'C: Nurse', 'D: Teacher'], correct: '🇧' },
  { word: 'инженер', meaning: 'Engineer', options: ['A: Doctor', 'B: Engineer', 'C: Architect', 'D: Scientist'], correct: '🇧' },
  { word: 'часы', meaning: 'Clock', options: ['A: Clock', 'B: Watch', 'C: Calendar', 'D: Alarm'], correct: '🇦' },
  { word: 'календарь', meaning: 'Calendar', options: ['A: Clock', 'B: Calendar', 'C: Alarm', 'D: Watch'], correct: '🇧' },
  { word: 'здание', meaning: 'Building', options: ['A: Building', 'B: Room', 'C: Wall', 'D: Floor'], correct: '🇦' },
  { word: 'комната', meaning: 'Room', options: ['A: Floor', 'B: Building', 'C: Room', 'D: Wall'], correct: '🇨' },
  { word: 'работа', meaning: 'Work', options: ['A: Job', 'B: Study', 'C: Work', 'D: Rest'], correct: '🇨' },
  { word: 'отдых', meaning: 'Rest', options: ['A: Work', 'B: Rest', 'C: Exercise', 'D: Study'], correct: '🇧' },
  { word: 'магазин', meaning: 'Shop', options: ['A: Shop', 'B: Bank', 'C: Cafe', 'D: Market'], correct: '🇦' },
  { word: 'рынок', meaning: 'Market', options: ['A: Shop', 'B: Market', 'C: Cafe', 'D: Bank'], correct: '🇧' },
  { word: 'больница', meaning: 'Hospital', options: ['A: Bank', 'B: School', 'C: Hospital', 'D: Office'], correct: '🇨' },
  { word: 'офис', meaning: 'Office', options: ['A: Hospital', 'B: School', 'C: Office', 'D: Bank'], correct: '🇨' },
  { word: 'школа', meaning: 'School', options: ['A: University', 'B: School', 'C: Library', 'D: Cafe'], correct: '🇧' },
  { word: 'университет', meaning: 'University', options: ['A: Library', 'B: University', 'C: School', 'D: Cafe'], correct: '🇧' },
  { word: 'парк', meaning: 'Park', options: ['A: Park', 'B: Garden', 'C: Zoo', 'D: Forest'], correct: '🇦' },
  { word: 'лес', meaning: 'Forest', options: ['A: Garden', 'B: Zoo', 'C: Forest', 'D: Park'], correct: '🇨' },
  { word: 'сад', meaning: 'Garden', options: ['A: Park', 'B: Forest', 'C: Garden', 'D: Zoo'], correct: '🇨' },
  { word: 'зоопарк', meaning: 'Zoo', options: ['A: Garden', 'B: Forest', 'C: Zoo', 'D: Park'], correct: '🇨' },
  { word: 'погода', meaning: 'Weather', options: ['A: Weather', 'B: Season', 'C: Rain', 'D: Sun'], correct: '🇦' },
  { word: 'дождь', meaning: 'Rain', options: ['A: Sun', 'B: Rain', 'C: Cloud', 'D: Snow'], correct: '🇧' },
  { word: 'снег', meaning: 'Snow', options: ['A: Cloud', 'B: Rain', 'C: Snow', 'D: Fog'], correct: '🇨' },
  { word: 'облако', meaning: 'Cloud', options: ['A: Snow', 'B: Cloud', 'C: Rain', 'D: Sun'], correct: '🇧' },
  { word: 'солнце', meaning: 'Sun', options: ['A: Sun', 'B: Rain', 'C: Fog', 'D: Cloud'], correct: '🇦' },
  { word: 'фильм', meaning: 'Movie', options: ['A: Movie', 'B: Song', 'C: Book', 'D: Show'], correct: '🇦' },
  { word: 'музыка', meaning: 'Music', options: ['A: Music', 'B: Film', 'C: Dance', 'D: Art'], correct: '🇦' },
  { word: 'песня', meaning: 'Song', options: ['A: Dance', 'B: Song', 'C: Music', 'D: Film'], correct: '🇧' },
  { word: 'танец', meaning: 'Dance', options: ['A: Song', 'B: Dance', 'C: Art', 'D: Music'], correct: '🇧' },
  { word: 'искусство', meaning: 'Art', options: ['A: Dance', 'B: Music', 'C: Film', 'D: Art'], correct: '🇩' },
  { word: 'новости', meaning: 'News', options: ['A: Article', 'B: News', 'C: Report', 'D: Story'], correct: '🇧' },
  { word: 'статья', meaning: 'Article', options: ['A: Report', 'B: Article', 'C: News', 'D: Story'], correct: '🇧' },
  { word: 'телевизор', meaning: 'TV', options: ['A: Radio', 'B: Phone', 'C: TV', 'D: Computer'], correct: '🇨' },
  { word: 'радио', meaning: 'Radio', options: ['A: TV', 'B: Radio', 'C: Speaker', 'D: Phone'], correct: '🇧' },
  { word: 'праздник', meaning: 'Holiday', options: ['A: Birthday', 'B: Vacation', 'C: Holiday', 'D: Weekend'], correct: '🇨' },
  { word: 'выходные', meaning: 'Weekend', options: ['A: Holiday', 'B: Vacation', 'C: Weekend', 'D: Day'], correct: '🇨' },
  { word: 'день рождения', meaning: 'Birthday', options: ['A: Anniversary', 'B: Birthday', 'C: Holiday', 'D: Event'], correct: '🇧' },
  { word: 'цветок', meaning: 'Flower', options: ['A: Plant', 'B: Tree', 'C: Flower', 'D: Grass'], correct: '🇨' },
  { word: 'дерево', meaning: 'Tree', options: ['A: Flower', 'B: Tree', 'C: Grass', 'D: Plant'], correct: '🇧' },
  { word: 'трава', meaning: 'Grass', options: ['A: Tree', 'B: Plant', 'C: Grass', 'D: Flower'], correct: '🇨' },
  { word: 'птица', meaning: 'Bird', options: ['A: Bird', 'B: Cat', 'C: Dog', 'D: Fish'], correct: '🇦' },
  { word: 'рыбалка', meaning: 'Fishing', options: ['A: Hunting', 'B: Boating', 'C: Fishing', 'D: Swimming'], correct: '🇨' },
  { word: 'спорт', meaning: 'Sport', options: ['A: Game', 'B: Activity', 'C: Sport', 'D: Exercise'], correct: '🇨' },
  { word: 'игра', meaning: 'Game', options: ['A: Game', 'B: Play', 'C: Sport', 'D: Activity'], correct: '🇦' },
  { word: 'мяч', meaning: 'Ball', options: ['A: Ball', 'B: Bat', 'C: Net', 'D: Racket'], correct: '🇦' },
  ],
  B1: [
  { word: 'путешествие', meaning: 'Journey', options: ['A: Trip', 'B: Journey', 'C: Destination', 'D: Vacation'], correct: '🇧' },
  { word: 'достопримечательность', meaning: 'Sight', options: ['A: Sight', 'B: Monument', 'C: Place', 'D: Museum'], correct: '🇦' },
  { word: 'гражданин', meaning: 'Citizen', options: ['A: Foreigner', 'B: Resident', 'C: Citizen', 'D: Visitor'], correct: '🇩' },
  { word: 'общество', meaning: 'Society', options: ['A: Community', 'B: Nation', 'C: Society', 'D: Group'], correct: '🇨' },
  { word: 'закон', meaning: 'Law', options: ['A: Rule', 'B: Law', 'C: Policy', 'D: Order'], correct: '🇧' },
  { word: 'свобода', meaning: 'Freedom', options: ['A: Independence', 'B: Liberty', 'C: Freedom', 'D: Power'], correct: '🇩' },
  { word: 'ответственность', meaning: 'Responsibility', options: ['A: Responsibility', 'B: Task', 'C: Role', 'D: Obligation'], correct: '🇦' },
  { word: 'событие', meaning: 'Event', options: ['A: News', 'B: Event', 'C: Celebration', 'D: Activity'], correct: '🇧' },
  { word: 'возможность', meaning: 'Opportunity', options: ['A: Possibility', 'B: Opportunity', 'C: Chance', 'D: Situation'], correct: '🇧' },
  { word: 'навык', meaning: 'Skill', options: ['A: Ability', 'B: Skill', 'C: Talent', 'D: Strength'], correct: '🇧' },
  { word: 'успех', meaning: 'Success', options: ['A: Achievement', 'B: Success', 'C: Goal', 'D: Victory'], correct: '🇧' },
  { word: 'решение', meaning: 'Solution', options: ['A: Problem', 'B: Decision', 'C: Solution', 'D: Answer'], correct: '🇨' },
  { word: 'исследование', meaning: 'Research', options: ['A: Experiment', 'B: Study', 'C: Research', 'D: Survey'], correct: '🇨' },
  { word: 'план', meaning: 'Plan', options: ['A: Project', 'B: Plan', 'C: Goal', 'D: Scheme'], correct: '🇧' },
  { word: 'результат', meaning: 'Result', options: ['A: Outcome', 'B: Result', 'C: Achievement', 'D: Effect'], correct: '🇧' },
  { word: 'гарантия', meaning: 'Guarantee', options: ['A: Warranty', 'B: Guarantee', 'C: Promise', 'D: Agreement'], correct: '🇧' },
  { word: 'отношение', meaning: 'Attitude', options: ['A: Behavior', 'B: Relationship', 'C: Attitude', 'D: Connection'], correct: '🇨' },
  { word: 'эмоция', meaning: 'Emotion', options: ['A: Feeling', 'B: Emotion', 'C: Mood', 'D: Thought'], correct: '🇧' },
  { word: 'счастье', meaning: 'Happiness', options: ['A: Joy', 'B: Happiness', 'C: Excitement', 'D: Pleasure'], correct: '🇧' },
  { word: 'здоровье', meaning: 'Health', options: ['A: Strength', 'B: Fitness', 'C: Health', 'D: Energy'], correct: '🇨' },
  { word: 'питание', meaning: 'Nutrition', options: ['A: Food', 'B: Nutrition', 'C: Diet', 'D: Meal'], correct: '🇧' },
  { word: 'спортзал', meaning: 'Gym', options: ['A: Gym', 'B: Stadium', 'C: Club', 'D: School'], correct: '🇦' },
  { word: 'программа', meaning: 'Program', options: ['A: Program', 'B: Course', 'C: Lesson', 'D: Task'], correct: '🇦' },
  { word: 'курс', meaning: 'Course', options: ['A: Program', 'B: Subject', 'C: Course', 'D: Class'], correct: '🇨' },
  { word: 'лекция', meaning: 'Lecture', options: ['A: Class', 'B: Talk', 'C: Lecture', 'D: Seminar'], correct: '🇩' },
  { word: 'урок', meaning: 'Lesson', options: ['A: Practice', 'B: Lesson', 'C: Training', 'D: Course'], correct: '🇧' },
  { word: 'подготовка', meaning: 'Preparation', options: ['A: Study', 'B: Preparation', 'C: Revision', 'D: Training'], correct: '🇧' },
  { word: 'экзамен', meaning: 'Exam', options: ['A: Test', 'B: Exam', 'C: Quiz', 'D: Assessment'], correct: '🇧' },
  { word: 'задание', meaning: 'Assignment', options: ['A: Task', 'B: Homework', 'C: Assignment', 'D: Project'], correct: '🇨' },
  { word: 'специалист', meaning: 'Specialist', options: ['A: Expert', 'B: Specialist', 'C: Professional', 'D: Doctor'], correct: '🇧' },
  { word: 'профессия', meaning: 'Profession', options: ['A: Career', 'B: Job', 'C: Profession', 'D: Role'], correct: '🇨' },
  { word: 'опыт', meaning: 'Experience', options: ['A: Practice', 'B: Experience', 'C: Knowledge', 'D: Expertise'], correct: '🇧' },
  { word: 'знание', meaning: 'Knowledge', options: ['A: Information', 'B: Understanding', 'C: Knowledge', 'D: Learning'], correct: '🇨' },
  { word: 'обязанность', meaning: 'Duty', options: ['A: Task', 'B: Responsibility', 'C: Obligation', 'D: Duty'], correct: '🇩' },
  { word: 'коллектив', meaning: 'Team', options: ['A: Group', 'B: Team', 'C: Staff', 'D: Friends'], correct: '🇧' },
  { word: 'управление', meaning: 'Management', options: ['A: Leadership', 'B: Management', 'C: Organization', 'D: Supervision'], correct: '🇧' },
  { word: 'производство', meaning: 'Production', options: ['A: Factory', 'B: Manufacturing', 'C: Production', 'D: Output'], correct: '🇨' },
  { word: 'финансы', meaning: 'Finance', options: ['A: Money', 'B: Economy', 'C: Finance', 'D: Budget'], correct: '🇨' },
  { word: 'экономика', meaning: 'Economy', options: ['A: Finance', 'B: Business', 'C: Economy', 'D: Trade'], correct: '🇨' },
  { word: 'рынок труда', meaning: 'Labor Market', options: ['A: Work Market', 'B: Labor Market', 'C: Job Market', 'D: Employment'], correct: '🇧' },
  { word: 'собрание', meaning: 'Meeting', options: ['A: Conference', 'B: Meeting', 'C: Seminar', 'D: Assembly'], correct: '🇧' },
  { word: 'договор', meaning: 'Contract', options: ['A: Agreement', 'B: Contract', 'C: Document', 'D: Proposal'], correct: '🇧' },
  { word: 'условие', meaning: 'Condition', options: ['A: Requirement', 'B: Condition', 'C: Situation', 'D: Agreement'], correct: '🇧' },
  { word: 'развитие', meaning: 'Development', options: ['A: Progress', 'B: Improvement', 'C: Development', 'D: Growth'], correct: '🇨' },
  { word: 'информация', meaning: 'Information', options: ['A: News', 'B: Information', 'C: Data', 'D: Details'], correct: '🇧' },
  { word: 'предложение', meaning: 'Proposal', options: ['A: Offer', 'B: Proposal', 'C: Suggestion', 'D: Request'], correct: '🇨' },
  { word: 'участие', meaning: 'Participation', options: ['A: Involvement', 'B: Participation', 'C: Attendance', 'D: Contribution'], correct: '🇧' },
  { word: 'конференция', meaning: 'Conference', options: ['A: Meeting', 'B: Conference', 'C: Seminar', 'D: Presentation'], correct: '🇧' },
  { word: 'инновация', meaning: 'Innovation', options: ['A: Invention', 'B: Change', 'C: Innovation', 'D: Discovery'], correct: '🇨' },
  { word: 'проект', meaning: 'Project', options: ['A: Project', 'B: Task', 'C: Initiative', 'D: Plan'], correct: '🇦' },
  { word: 'ресурс', meaning: 'Resource', options: ['A: Material', 'B: Tool', 'C: Resource', 'D: Asset'], correct: '🇨' },
  { word: 'риск', meaning: 'Risk', options: ['A: Opportunity', 'B: Hazard', 'C: Risk', 'D: Danger'], correct: '🇩' },
  { word: 'система', meaning: 'System', options: ['A: Machine', 'B: Setup', 'C: Network', 'D: System'], correct: '🇩' },
  { word: 'платформа', meaning: 'Platform', options: ['A: Platform', 'B: Stage', 'C: Position', 'D: Base'], correct: '🇦' },
  { word: 'обучение', meaning: 'Training', options: ['A: Practice', 'B: Learning', 'C: Education', 'D: Teaching'], correct: '🇧' },
  { word: 'материалы', meaning: 'Materials', options: ['A: Tools', 'B: Resources', 'C: Materials', 'D: Documents'], correct: '🇩' },
  { word: 'анализ', meaning: 'Analysis', options: ['A: Evaluation', 'B: Study', 'C: Survey', 'D: Analysis'], correct: '🇩' },
  { word: 'платеж', meaning: 'Payment', options: ['A: Transaction', 'B: Purchase', 'C: Payment', 'D: Charge'], correct: '🇩' },
  ],
  B2: [
  { word: 'конкуренция', meaning: 'Competition', options: ['A: Contest', 'B: Competition', 'C: Rivalry', 'D: Tournament'], correct: '🇧' },
  { word: 'предприниматель', meaning: 'Entrepreneur', options: ['A: Manager', 'B: Entrepreneur', 'C: Worker', 'D: Businessman'], correct: '🇧' },
  { word: 'инвестировать', meaning: 'To Invest', options: ['A: Save', 'B: Buy', 'C: Invest', 'D: Earn'], correct: '🇨' },
  { word: 'прибыль', meaning: 'Profit', options: ['A: Revenue', 'B: Expense', 'C: Profit', 'D: Income'], correct: '🇩' },
  { word: 'реклама', meaning: 'Advertising', options: ['A: News', 'B: Media', 'C: Advertising', 'D: Promotion'], correct: '🇨' },
  { word: 'постоянный', meaning: 'Constant', options: ['A: Temporary', 'B: Unstable', 'C: Constant', 'D: Rare'], correct: '🇩' },
  { word: 'основной', meaning: 'Main', options: ['A: Central', 'B: Primary', 'C: Main', 'D: Secondary'], correct: '🇨' },
  { word: 'обслуживание', meaning: 'Service', options: ['A: Maintenance', 'B: Repair', 'C: Service', 'D: Support'], correct: '🇩' },
  { word: 'совет', meaning: 'Advice', options: ['A: Tip', 'B: Suggestion', 'C: Advice', 'D: Warning'], correct: '🇩' },
  { word: 'проектирование', meaning: 'Designing', options: ['A: Planning', 'B: Designing', 'C: Construction', 'D: Drafting'], correct: '🇧' },
  { word: 'инфраструктура', meaning: 'Infrastructure', options: ['A: Facilities', 'B: Infrastructure', 'C: Network', 'D: Framework'], correct: '🇧' },
  { word: 'управление', meaning: 'Management', options: ['A: Supervision', 'B: Organization', 'C: Control', 'D: Management'], correct: '🇩' },
  { word: 'поставка', meaning: 'Delivery', options: ['A: Shipment', 'B: Supply', 'C: Delivery', 'D: Distribution'], correct: '🇨' },
  { word: 'товар', meaning: 'Goods', options: ['A: Merchandise', 'B: Goods', 'C: Products', 'D: Items'], correct: '🇧' },
  { word: 'сделка', meaning: 'Deal', options: ['A: Transaction', 'B: Contract', 'C: Deal', 'D: Agreement'], correct: '🇩' },
  { word: 'партнёр', meaning: 'Partner', options: ['A: Friend', 'B: Associate', 'C: Partner', 'D: Colleague'], correct: '🇨' },
  { word: 'клиент', meaning: 'Client', options: ['A: Consumer', 'B: Customer', 'C: Client', 'D: Buyer'], correct: '🇩' },
  { word: 'кредит', meaning: 'Credit', options: ['A: Debt', 'B: Loan', 'C: Credit', 'D: Deposit'], correct: '🇨' },
  { word: 'продажа', meaning: 'Sale', options: ['A: Promotion', 'B: Sale', 'C: Auction', 'D: Discount'], correct: '🇧' },
  { word: 'налог', meaning: 'Tax', options: ['A: Fine', 'B: Charge', 'C: Tax', 'D: Fee'], correct: '🇩' },
  { word: 'сотрудничество', meaning: 'Cooperation', options: ['A: Agreement', 'B: Alliance', 'C: Cooperation', 'D: Collaboration'], correct: '🇨' },
  { word: 'производитель', meaning: 'Manufacturer', options: ['A: Vendor', 'B: Manufacturer', 'C: Supplier', 'D: Producer'], correct: '🇧' },
  { word: 'культура', meaning: 'Culture', options: ['A: Heritage', 'B: Tradition', 'C: Culture', 'D: Lifestyle'], correct: '🇨' },
  { word: 'образование', meaning: 'Education', options: ['A: Teaching', 'B: Knowledge', 'C: Learning', 'D: Education'], correct: '🇩' },
  { word: 'компетенция', meaning: 'Competence', options: ['A: Qualification', 'B: Proficiency', 'C: Competence', 'D: Ability'], correct: '🇨' },
  { word: 'образец', meaning: 'Sample', options: ['A: Template', 'B: Model', 'C: Sample', 'D: Example'], correct: '🇩' },
  { word: 'система', meaning: 'System', options: ['A: Structure', 'B: Arrangement', 'C: Network', 'D: System'], correct: '🇩' },
  { word: 'проверка', meaning: 'Check', options: ['A: Inspection', 'B: Verification', 'C: Test', 'D: Check'], correct: '🇩' },
  { word: 'интервью', meaning: 'Interview', options: ['A: Test', 'B: Interview', 'C: Meeting', 'D: Examination'], correct: '🇧' },
  { word: 'риск', meaning: 'Risk', options: ['A: Hazard', 'B: Danger', 'C: Risk', 'D: Chance'], correct: '🇩' },
  { word: 'планирование', meaning: 'Planning', options: ['A: Strategy', 'B: Organizing', 'C: Scheduling', 'D: Planning'], correct: '🇩' },
  { word: 'доклад', meaning: 'Report', options: ['A: Thesis', 'B: Research', 'C: Summary', 'D: Report'], correct: '🇩' },
  { word: 'коллектив', meaning: 'Team', options: ['A: Group', 'B: Collective', 'C: Staff', 'D: Team'], correct: '🇩' },
  { word: 'опыт', meaning: 'Experience', options: ['A: Trial', 'B: Expertise', 'C: Background', 'D: Experience'], correct: '🇩' },
  { word: 'маркетинг', meaning: 'Marketing', options: ['A: Sales', 'B: Marketing', 'C: Promotion', 'D: Business'], correct: '🇧' },
  { word: 'страхование', meaning: 'Insurance', options: ['A: Security', 'B: Guarantee', 'C: Coverage', 'D: Insurance'], correct: '🇩' },
  { word: 'программа', meaning: 'Program', options: ['A: Scheme', 'B: Calendar', 'C: Plan', 'D: Program'], correct: '🇩' },
  { word: 'консультация', meaning: 'Consultation', options: ['A: Conversation', 'B: Advice', 'C: Information', 'D: Consultation'], correct: '🇩' },
  { word: 'контракт', meaning: 'Contract', options: ['A: Document', 'B: Deal', 'C: Agreement', 'D: Contract'], correct: '🇩' },
  { word: 'сделка', meaning: 'Transaction', options: ['A: Trade', 'B: Deal', 'C: Transaction', 'D: Agreement'], correct: '🇨' },
  { word: 'операция', meaning: 'Operation', options: ['A: Procedure', 'B: Task', 'C: Process', 'D: Operation'], correct: '🇩' },
  { word: 'расходы', meaning: 'Expenses', options: ['A: Payments', 'B: Bills', 'C: Expenses', 'D: Charges'], correct: '🇩' },
  { word: 'экспертиза', meaning: 'Expertise', options: ['A: Knowledge', 'B: Evaluation', 'C: Experience', 'D: Expertise'], correct: '🇩' },
  { word: 'платежи', meaning: 'Payments', options: ['A: Transactions', 'B: Charges', 'C: Payments', 'D: Transactions'], correct: '🇩' },
  { word: 'платформа', meaning: 'Platform', options: ['A: Position', 'B: Base', 'C: System', 'D: Platform'], correct: '🇩' },
  { word: 'законодательство', meaning: 'Legislation', options: ['A: Rules', 'B: Regulations', 'C: Legislation', 'D: Policies'], correct: '🇨' },
  { word: 'финансирование', meaning: 'Funding', options: ['A: Financing', 'B: Investment', 'C: Funding', 'D: Money'], correct: '🇩' },
  { word: 'компетентность', meaning: 'Competence', options: ['A: Qualification', 'B: Ability', 'C: Competence', 'D: Capacity'], correct: '🇩' },
  { word: 'контроль', meaning: 'Control', options: ['A: Supervision', 'B: Check', 'C: Management', 'D: Control'], correct: '🇩' },
  { word: 'ресурс', meaning: 'Resource', options: ['A: Item', 'B: Material', 'C: Supply', 'D: Resource'], correct: '🇩' },
  { word: 'авторитет', meaning: 'Authority', options: ['A: Influence', 'B: Power', 'C: Authority', 'D: Status'], correct: '🇩' },
  { word: 'компьютер', meaning: 'Computer', options: ['A: Laptop', 'B: PC', 'C: Tablet', 'D: Computer'], correct: '🇩' },
  { word: 'платформа', meaning: 'Platform', options: ['A: Base', 'B: Network', 'C: Foundation', 'D: Platform'], correct: '🇩' },
  { word: 'составить', meaning: 'Compose', options: ['A: Create', 'B: Build', 'C: Compose', 'D: Form'], correct: '🇩' },
  { word: 'образование', meaning: 'Education', options: ['A: Teaching', 'B: Training', 'C: Education', 'D: Learning'], correct: '🇩' },
  ],
  C1: [
  { word: 'осведомленность', meaning: 'Awareness', options: ['A: Knowledge', 'B: Awareness', 'C: Perception', 'D: Insight'], correct: '🇧' },
  { word: 'анализ', meaning: 'Analysis', options: ['A: Study', 'B: Research', 'C: Analysis', 'D: Review'], correct: '🇩' },
  { word: 'влияние', meaning: 'Influence', options: ['A: Power', 'B: Impact', 'C: Influence', 'D: Force'], correct: '🇩' },
  { word: 'инновация', meaning: 'Innovation', options: ['A: Improvement', 'B: Invention', 'C: Innovation', 'D: Creation'], correct: '🇩' },
  { word: 'исследование', meaning: 'Research', options: ['A: Study', 'B: Survey', 'C: Research', 'D: Exploration'], correct: '🇩' },
  { word: 'критерий', meaning: 'Criterion', options: ['A: Standard', 'B: Requirement', 'C: Criterion', 'D: Measure'], correct: '🇩' },
  { word: 'парадигма', meaning: 'Paradigm', options: ['A: Framework', 'B: Model', 'C: System', 'D: Paradigm'], correct: '🇩' },
  { word: 'прогноз', meaning: 'Forecast', options: ['A: Prediction', 'B: Plan', 'C: Projection', 'D: Forecast'], correct: '🇩' },
  { word: 'обоснование', meaning: 'Justification', options: ['A: Reason', 'B: Explanation', 'C: Justification', 'D: Evidence'], correct: '🇩' },
  { word: 'эволюция', meaning: 'Evolution', options: ['A: Growth', 'B: Change', 'C: Evolution', 'D: Development'], correct: '🇨' },
  { word: 'специализация', meaning: 'Specialization', options: ['A: Narrowing', 'B: Specialization', 'C: Focus', 'D: Segmentation'], correct: '🇧' },
  { word: 'интерпретация', meaning: 'Interpretation', options: ['A: Explanation', 'B: Analysis', 'C: Interpretation', 'D: Translation'], correct: '🇩' },
  { word: 'трансформация', meaning: 'Transformation', options: ['A: Adjustment', 'B: Evolution', 'C: Transformation', 'D: Conversion'], correct: '🇩' },
  { word: 'потенциал', meaning: 'Potential', options: ['A: Capacity', 'B: Capability', 'C: Potential', 'D: Ability'], correct: '🇩' },
  { word: 'стратегия', meaning: 'Strategy', options: ['A: Tactic', 'B: Plan', 'C: Strategy', 'D: Approach'], correct: '🇨' },
  { word: 'регуляция', meaning: 'Regulation', options: ['A: Control', 'B: Management', 'C: Regulation', 'D: Order'], correct: '🇩' },
  { word: 'модель', meaning: 'Model', options: ['A: Example', 'B: Replica', 'C: Template', 'D: Model'], correct: '🇩' },
  { word: 'фундамент', meaning: 'Foundation', options: ['A: Groundwork', 'B: Base', 'C: Foundation', 'D: Substructure'], correct: '🇩' },
  { word: 'механизм', meaning: 'Mechanism', options: ['A: System', 'B: Process', 'C: Mechanism', 'D: Framework'], correct: '🇩' },
  { word: 'концепция', meaning: 'Concept', options: ['A: Idea', 'B: Principle', 'C: Concept', 'D: Theory'], correct: '🇩' },
  { word: 'обмен', meaning: 'Exchange', options: ['A: Trade', 'B: Transfer', 'C: Exchange', 'D: Transaction'], correct: '🇩' },
  { word: 'гармония', meaning: 'Harmony', options: ['A: Balance', 'B: Agreement', 'C: Unity', 'D: Harmony'], correct: '🇩' },
  { word: 'мудрость', meaning: 'Wisdom', options: ['A: Intelligence', 'B: Knowledge', 'C: Wisdom', 'D: Insight'], correct: '🇩' },
  { word: 'консенсус', meaning: 'Consensus', options: ['A: Agreement', 'B: Approval', 'C: Consensus', 'D: Confirmation'], correct: '🇨' },
  { word: 'дифференциация', meaning: 'Differentiation', options: ['A: Specialization', 'B: Distinction', 'C: Differentiation', 'D: Separation'], correct: '🇩' },
  { word: 'параметр', meaning: 'Parameter', options: ['A: Condition', 'B: Factor', 'C: Parameter', 'D: Measure'], correct: '🇩' },
  { word: 'сравнение', meaning: 'Comparison', options: ['A: Contrast', 'B: Evaluation', 'C: Comparison', 'D: Analysis'], correct: '🇩' },
  { word: 'освежение', meaning: 'Refreshment', options: ['A: Update', 'B: Rest', 'C: Refreshment', 'D: Renewal'], correct: '🇩' },
  { word: 'интервью', meaning: 'Interview', options: ['A: Conversation', 'B: Inquiry', 'C: Survey', 'D: Interview'], correct: '🇩' },
  { word: 'систематизация', meaning: 'Systematization', options: ['A: Organization', 'B: Arrangement', 'C: Structuring', 'D: Systematization'], correct: '🇩' },
  { word: 'отслеживание', meaning: 'Tracking', options: ['A: Observation', 'B: Monitoring', 'C: Tracking', 'D: Detection'], correct: '🇩' },
  { word: 'контекст', meaning: 'Context', options: ['A: Environment', 'B: Framework', 'C: Setting', 'D: Context'], correct: '🇩' },
  { word: 'актуальность', meaning: 'Relevance', options: ['A: Importance', 'B: Validity', 'C: Relevance', 'D: Significance'], correct: '🇩' },
  { word: 'качественный', meaning: 'Qualitative', options: ['A: Quantitative', 'B: Descriptive', 'C: Qualitative', 'D: Numeric'], correct: '🇩' },
  { word: 'упрощение', meaning: 'Simplification', options: ['A: Clarification', 'B: Easing', 'C: Simplification', 'D: Streamlining'], correct: '🇩' },
  { word: 'риск', meaning: 'Risk', options: ['A: Danger', 'B: Hazard', 'C: Risk', 'D: Chance'], correct: '🇩' },
  { word: 'перспектива', meaning: 'Perspective', options: ['A: View', 'B: Outlook', 'C: Perspective', 'D: Angle'], correct: '🇩' },
  { word: 'среда', meaning: 'Environment', options: ['A: Atmosphere', 'B: Surrounding', 'C: Environment', 'D: Area'], correct: '🇩' },
  { word: 'структура', meaning: 'Structure', options: ['A: Form', 'B: Layout', 'C: Organization', 'D: Structure'], correct: '🇩' },
  { word: 'экспертиза', meaning: 'Expertise', options: ['A: Knowledge', 'B: Evaluation', 'C: Experience', 'D: Expertise'], correct: '🇩' },
  { word: 'отчёт', meaning: 'Report', options: ['A: Summary', 'B: Statement', 'C: Report', 'D: Review'], correct: '🇩' },
  { word: 'обзор', meaning: 'Review', options: ['A: Check', 'B: Insight', 'C: View', 'D: Review'], correct: '🇩' },
  { word: 'параметры', meaning: 'Parameters', options: ['A: Metrics', 'B: Limits', 'C: Parameters', 'D: Guidelines'], correct: '🇩' },
  { word: 'интерпретировать', meaning: 'To Interpret', options: ['A: To Understand', 'B: To Translate', 'C: To Analyze', 'D: To Interpret'], correct: '🇩' },
  { word: 'прогнозировать', meaning: 'To Forecast', options: ['A: To Estimate', 'B: To Predict', 'C: To Calculate', 'D: To Forecast'], correct: '🇩' },
  { word: 'проектировать', meaning: 'To Design', options: ['A: To Build', 'B: To Plan', 'C: To Create', 'D: To Design'], correct: '🇩' },
  { word: 'согласование', meaning: 'Approval', options: ['A: Agreement', 'B: Authorization', 'C: Confirmation', 'D: Approval'], correct: '🇩' },
  { word: 'расширение', meaning: 'Expansion', options: ['A: Enlargement', 'B: Extension', 'C: Growth', 'D: Expansion'], correct: '🇩' },
  { word: 'норматив', meaning: 'Norm', options: ['A: Rule', 'B: Regulation', 'C: Standard', 'D: Norm'], correct: '🇩' },
  { word: 'согласие', meaning: 'Consent', options: ['A: Permission', 'B: Agreement', 'C: Consent', 'D: Approval'], correct: '🇩' },
  { word: 'поставщик', meaning: 'Supplier', options: ['A: Vendor', 'B: Contractor', 'C: Distributor', 'D: Supplier'], correct: '🇩' },
  { word: 'проект', meaning: 'Project', options: ['A: Assignment', 'B: Plan', 'C: Scheme', 'D: Project'], correct: '🇩' },
  { word: 'подтверждение', meaning: 'Confirmation', options: ['A: Affirmation', 'B: Verification', 'C: Certification', 'D: Confirmation'], correct: '🇩' },
  { word: 'реализация', meaning: 'Implementation', options: ['A: Execution', 'B: Realization', 'C: Launch', 'D: Implementation'], correct: '🇩' },
  { word: 'повышение', meaning: 'Promotion', options: ['A: Growth', 'B: Increase', 'C: Raise', 'D: Promotion'], correct: '🇩' },
  { word: 'трансакция', meaning: 'Transaction', options: ['A: Exchange', 'B: Deal', 'C: Transaction', 'D: Trade'], correct: '🇩' },
  { word: 'качество', meaning: 'Quality', options: ['A: Standard', 'B: Value', 'C: Excellence', 'D: Quality'], correct: '🇩' },
  { word: 'производительность', meaning: 'Productivity', options: ['A: Efficiency', 'B: Output', 'C: Performance', 'D: Productivity'], correct: '🇩' },
  ],
  C2: [
  { word: 'самообман', meaning: 'Self-deception', options: ['A: Self-trust', 'B: Self-deception', 'C: Self-doubt', 'D: Self-awareness'], correct: '🇧' },
  { word: 'непостижимость', meaning: 'Incomprehensibility', options: ['A: Complexity', 'B: Confusion', 'C: Incomprehensibility', 'D: Obscurity'], correct: '🇩' },
  { word: 'сопротивление', meaning: 'Resistance', options: ['A: Opposition', 'B: Defiance', 'C: Resistance', 'D: Denial'], correct: '🇩' },
  { word: 'перцепция', meaning: 'Perception', options: ['A: Insight', 'B: Perception', 'C: Observation', 'D: Interpretation'], correct: '🇧' },
  { word: 'неприкосновенность', meaning: 'Inviolability', options: ['A: Integrity', 'B: Sacredness', 'C: Inviolability', 'D: Sanctity'], correct: '🇩' },
  { word: 'реконструкция', meaning: 'Reconstruction', options: ['A: Renovation', 'B: Repair', 'C: Reconstruction', 'D: Refurbishment'], correct: '🇩' },
  { word: 'квазимиф', meaning: 'Quasimyth', options: ['A: Fiction', 'B: Allegory', 'C: Quasimyth', 'D: Fantasy'], correct: '🇨' },
  { word: 'метамодерн', meaning: 'Metamodernism', options: ['A: Postmodernism', 'B: Modernism', 'C: Metamodernism', 'D: Neo-realism'], correct: '🇩' },
  { word: 'синергия', meaning: 'Synergy', options: ['A: Coordination', 'B: Cooperation', 'C: Synergy', 'D: Synchronization'], correct: '🇨' },
  { word: 'глобализация', meaning: 'Globalization', options: ['A: Internationalization', 'B: Globalization', 'C: Universalization', 'D: Expansion'], correct: '🇧' },
  { word: 'когнитивный', meaning: 'Cognitive', options: ['A: Mental', 'B: Psychological', 'C: Cognitive', 'D: Analytical'], correct: '🇩' },
  { word: 'диалектика', meaning: 'Dialectic', options: ['A: Philosophy', 'B: Argumentation', 'C: Dialectic', 'D: Debate'], correct: '🇩' },
  { word: 'парадигмальный', meaning: 'Paradigmatic', options: ['A: Model', 'B: Typical', 'C: Paradigmatic', 'D: Conventional'], correct: '🇨' },
  { word: 'метафора', meaning: 'Metaphor', options: ['A: Symbol', 'B: Allegory', 'C: Metaphor', 'D: Comparison'], correct: '🇨' },
  { word: 'ретроспектива', meaning: 'Retrospective', options: ['A: Flashback', 'B: Overview', 'C: Retrospective', 'D: Reflection'], correct: '🇩' },
  { word: 'постструктурализм', meaning: 'Poststructuralism', options: ['A: Structuralism', 'B: Deconstruction', 'C: Poststructuralism', 'D: Idealism'], correct: '🇩' },
  { word: 'гиперреальность', meaning: 'Hyperreality', options: ['A: Illusion', 'B: Reality', 'C: Hyperreality', 'D: Fantasy'], correct: '🇩' },
  { word: 'экзистенциализм', meaning: 'Existentialism', options: ['A: Philosophy', 'B: Idealism', 'C: Existentialism', 'D: Realism'], correct: '🇨' },
  { word: 'антитеза', meaning: 'Antithesis', options: ['A: Contrast', 'B: Opposite', 'C: Antithesis', 'D: Opposition'], correct: '🇨' },
  { word: 'полиморфизм', meaning: 'Polymorphism', options: ['A: Diversity', 'B: Adaptation', 'C: Polymorphism', 'D: Complexity'], correct: '🇩' },
  { word: 'криптография', meaning: 'Cryptography', options: ['A: Security', 'B: Encryption', 'C: Cryptography', 'D: Coding'], correct: '🇩' },
  { word: 'аналогия', meaning: 'Analogy', options: ['A: Parallel', 'B: Comparison', 'C: Analogy', 'D: Relationship'], correct: '🇨' },
  { word: 'параметризация', meaning: 'Parameterization', options: ['A: Calibration', 'B: Adjustment', 'C: Parameterization', 'D: Standardization'], correct: '🇩' },
  { word: 'непрерывность', meaning: 'Continuity', options: ['A: Unbrokenness', 'B: Continuity', 'C: Perpetuation', 'D: Sequence'], correct: '🇧' },
  { word: 'трансцендентность', meaning: 'Transcendence', options: ['A: Supremacy', 'B: Superiority', 'C: Transcendence', 'D: Elevation'], correct: '🇩' },
  { word: 'субстанция', meaning: 'Substance', options: ['A: Material', 'B: Essence', 'C: Substance', 'D: Entity'], correct: '🇩' },
  { word: 'дискурсивный', meaning: 'Discursive', options: ['A: Argumentative', 'B: Reflective', 'C: Discursive', 'D: Logical'], correct: '🇨' },
  { word: 'онтология', meaning: 'Ontology', options: ['A: Metaphysics', 'B: Logic', 'C: Ontology', 'D: Epistemology'], correct: '🇩' },
  { word: 'имманентный', meaning: 'Immanent', options: ['A: Internal', 'B: Essential', 'C: Immanent', 'D: Innate'], correct: '🇩' },
  { word: 'рационализация', meaning: 'Rationalization', options: ['A: Explanation', 'B: Reasoning', 'C: Rationalization', 'D: Justification'], correct: '🇩' },
  { word: 'картезианский', meaning: 'Cartesian', options: ['A: Rational', 'B: Logical', 'C: Cartesian', 'D: Practical'], correct: '🇩' },
  { word: 'идеализация', meaning: 'Idealization', options: ['A: Exaggeration', 'B: Perfection', 'C: Idealization', 'D: Perfectionism'], correct: '🇩' },
  { word: 'агностицизм', meaning: 'Agnosticism', options: ['A: Doubt', 'B: Belief', 'C: Agnosticism', 'D: Skepticism'], correct: '🇩' },
  { word: 'феноменология', meaning: 'Phenomenology', options: ['A: Study of Experience', 'B: Science of Behavior', 'C: Phenomenology', 'D: Conceptualism'], correct: '🇩' },
  { word: 'абстракция', meaning: 'Abstraction', options: ['A: Concept', 'B: Generalization', 'C: Abstraction', 'D: Essence'], correct: '🇩' },
  { word: 'поляризация', meaning: 'Polarization', options: ['A: Division', 'B: Separation', 'C: Polarization', 'D: Contrast'], correct: '🇩' },
  { word: 'квазиинтеллект', meaning: 'Quasi-intellect', options: ['A: Pseudo-intelligence', 'B: Artificial Mind', 'C: Quasi-intellect', 'D: Partial Understanding'], correct: '🇩' },
  { word: 'гегельянство', meaning: 'Hegelianism', options: ['A: Rationalism', 'B: Idealism', 'C: Hegelianism', 'D: Historicism'], correct: '🇩' },
  { word: 'экспансивность', meaning: 'Expansiveness', options: ['A: Limitlessness', 'B: Expansion', 'C: Growth', 'D: Expansiveness'], correct: '🇩' },
  { word: 'концентрация', meaning: 'Concentration', options: ['A: Focus', 'B: Gathering', 'C: Concentration', 'D: Attention'], correct: '🇩' },
  { word: 'автономия', meaning: 'Autonomy', options: ['A: Independence', 'B: Freedom', 'C: Autonomy', 'D: Sovereignty'], correct: '🇩' },
  { word: 'параллелизм', meaning: 'Parallelism', options: ['A: Similarity', 'B: Convergence', 'C: Parallelism', 'D: Duality'], correct: '🇩' },
  { word: 'суперпозиция', meaning: 'Superposition', options: ['A: Layering', 'B: Overlap', 'C: Superposition', 'D: Fusion'], correct: '🇩' },
  { word: 'интерсубъективность', meaning: 'Intersubjectivity', options: ['A: Shared experience', 'B: Common understanding', 'C: Intersubjectivity', 'D: Collective knowledge'], correct: '🇩' },
  { word: 'глокализация', meaning: 'Glocalization', options: ['A: Localization', 'B: Globalization', 'C: Glocalization', 'D: Integration'], correct: '🇩' },
  { word: 'интенсиональность', meaning: 'Intentionality', options: ['A: Thoughtfulness', 'B: Purpose', 'C: Intentionality', 'D: Focus'], correct: '🇩' },
  ],
};

const wordList = [
  { word: 'город', meaning: 'City', plural: 'города', indefinite: 'город', definite: 'город' },
  { word: 'яблоко', meaning: 'Apple', plural: 'яблоки', indefinite: 'яблоко', definite: 'яблоко' },
  { word: 'книга', meaning: 'Book', plural: 'книги', indefinite: 'книга', definite: 'книга' },
  { word: 'дом', meaning: 'House', plural: 'дома', indefinite: 'дом', definite: 'дом' },
  { word: 'стол', meaning: 'Table', plural: 'столы', indefinite: 'стол', definite: 'стол' },
  { word: 'чашка', meaning: 'Cup', plural: 'чашки', indefinite: 'чашка', definite: 'чашка' },
  { word: 'машина', meaning: 'Car', plural: 'машины', indefinite: 'машина', definite: 'машина' },
  { word: 'собака', meaning: 'Dog', plural: 'собаки', indefinite: 'собака', definite: 'собака' },
  { word: 'кошка', meaning: 'Cat', plural: 'кошки', indefinite: 'кошка', definite: 'кошка' },
  { word: 'дерево', meaning: 'Tree', plural: 'деревья', indefinite: 'дерево', definite: 'дерево' },
  { word: 'птица', meaning: 'Bird', plural: 'птицы', indefinite: 'птица', definite: 'птица' },
  { word: 'река', meaning: 'River', plural: 'реки', indefinite: 'река', definite: 'река' },
  { word: 'море', meaning: 'Sea', plural: 'море', indefinite: 'море', definite: 'море' },
  { word: 'горо́д', meaning: 'Town', plural: 'города', indefinite: 'город', definite: 'город' },
  { word: 'солнце', meaning: 'Sun', plural: 'солнца', indefinite: 'солнце', definite: 'солнце' },
  { word: 'небо', meaning: 'Sky', plural: 'неба', indefinite: 'небо', definite: 'небо' },
  { word: 'земля', meaning: 'Earth', plural: 'земли', indefinite: 'земля', definite: 'земля' },
  { word: 'человек', meaning: 'Person', plural: 'люди', indefinite: 'человек', definite: 'человек' },
  { word: 'женщина', meaning: 'Woman', plural: 'женщины', indefinite: 'женщина', definite: 'женщина' },
  { word: 'мужчина', meaning: 'Man', plural: 'мужчины', indefinite: 'мужчина', definite: 'мужчина' },
  { word: 'день', meaning: 'Day', plural: 'дни', indefinite: 'день', definite: 'день' },
  { word: 'ночь', meaning: 'Night', plural: 'ночи', indefinite: 'ночь', definite: 'ночь' },
  { word: 'время', meaning: 'Time', plural: 'время', indefinite: 'время', definite: 'время' },
  { word: 'работа', meaning: 'Work', plural: 'работы', indefinite: 'работа', definite: 'работа' },
  { word: 'школа', meaning: 'School', plural: 'школы', indefinite: 'школа', definite: 'школа' },
  { word: 'университет', meaning: 'University', plural: 'университеты', indefinite: 'университет', definite: 'университет' },
  { word: 'работник', meaning: 'Worker', plural: 'работники', indefinite: 'работник', definite: 'работник' },
  { word: 'студент', meaning: 'Student', plural: 'студенты', indefinite: 'студент', definite: 'студент' },
  { word: 'преподаватель', meaning: 'Teacher', plural: 'преподаватели', indefinite: 'преподаватель', definite: 'преподаватель' },
  { word: 'класс', meaning: 'Class', plural: 'классы', indefinite: 'класс', definite: 'класс' },
  { word: 'папа', meaning: 'Dad', plural: 'папы', indefinite: 'папа', definite: 'папа' },
  { word: 'мама', meaning: 'Mom', plural: 'мамы', indefinite: 'мама', definite: 'мама' },
  { word: 'ребёнок', meaning: 'Child', plural: 'дети', indefinite: 'ребёнок', definite: 'ребёнок' },
  { word: 'друг', meaning: 'Friend', plural: 'друзья', indefinite: 'друг', definite: 'друг' },
  { word: 'друзья', meaning: 'Friends', plural: 'друзья', indefinite: 'друзья', definite: 'друзья' },
  { word: 'отец', meaning: 'Father', plural: 'отцы', indefinite: 'отец', definite: 'отец' },
  { word: 'мать', meaning: 'Mother', plural: 'матери', indefinite: 'мать', definite: 'мать' },
  { word: 'сестра', meaning: 'Sister', plural: 'сестры', indefinite: 'сестра', definite: 'сестра' },
  { word: 'брат', meaning: 'Brother', plural: 'братья', indefinite: 'брат', definite: 'брат' },
  { word: 'зуб', meaning: 'Tooth', plural: 'зубы', indefinite: 'зуб', definite: 'зуб' },
  { word: 'глаз', meaning: 'Eye', plural: 'глаза', indefinite: 'глаз', definite: 'глаз' },
  { word: 'нос', meaning: 'Nose', plural: 'носы', indefinite: 'нос', definite: 'нос' },
  { word: 'рот', meaning: 'Mouth', plural: 'роты', indefinite: 'рот', definite: 'рот' },
  { word: 'рука', meaning: 'Hand', plural: 'руки', indefinite: 'рука', definite: 'рука' },
  { word: 'нога', meaning: 'Leg', plural: 'ноги', indefinite: 'нога', definite: 'нога' },
  { word: 'пальцы', meaning: 'Fingers', plural: 'пальцы', indefinite: 'пальцы', definite: 'пальцы' },
  { word: 'волосы', meaning: 'Hair', plural: 'волосы', indefinite: 'волосы', definite: 'волосы' },
  { word: 'ум', meaning: 'Mind', plural: 'умы', indefinite: 'ум', definite: 'ум' },
  { word: 'телефон', meaning: 'Phone', plural: 'телефоны', indefinite: 'телефон', definite: 'телефон' },
  { word: 'книга', meaning: 'Book', plural: 'книги', indefinite: 'книга', definite: 'книга' },
  { word: 'газета', meaning: 'Newspaper', plural: 'газеты', indefinite: 'газета', definite: 'газета' },
  { word: 'журнал', meaning: 'Magazine', plural: 'журналы', indefinite: 'журнал', definite: 'журнал' },
  { word: 'тетрадь', meaning: 'Notebook', plural: 'тетради', indefinite: 'тетрадь', definite: 'тетрадь' },
  { word: 'ручка', meaning: 'Pen', plural: 'ручки', indefinite: 'ручка', definite: 'ручка' },
  { word: 'карандаш', meaning: 'Pencil', plural: 'карандаши', indefinite: 'карандаш', definite: 'карандаш' },
  { word: 'письмо', meaning: 'Letter', plural: 'письма', indefinite: 'письмо', definite: 'письмо' },
  { word: 'письменность', meaning: 'Writing', plural: 'письменности', indefinite: 'письменность', definite: 'письменность' },
  { word: 'карта', meaning: 'Map', plural: 'карты', indefinite: 'карта', definite: 'карта' },
  { word: 'страна', meaning: 'Country', plural: 'страны', indefinite: 'страна', definite: 'страна' },
  { word: 'город', meaning: 'City', plural: 'города', indefinite: 'город', definite: 'город' },
  { word: 'деревня', meaning: 'Village', plural: 'деревни', indefinite: 'деревня', definite: 'деревня' },
  { word: 'площадь', meaning: 'Square', plural: 'площади', indefinite: 'площадь', definite: 'площадь' },
  { word: 'улица', meaning: 'Street', plural: 'улицы', indefinite: 'улица', definite: 'улица' },
  { word: 'магазин', meaning: 'Store', plural: 'магазины', indefinite: 'магазин', definite: 'магазин' },
  { word: 'ресторан', meaning: 'Restaurant', plural: 'рестораны', indefinite: 'ресторан', definite: 'ресторан' },
  { word: 'парк', meaning: 'Park', plural: 'парки', indefinite: 'парк', definite: 'парк' },
  { word: 'кино', meaning: 'Cinema', plural: 'кино', indefinite: 'кино', definite: 'кино' },
  { word: 'театр', meaning: 'Theater', plural: 'театры', indefinite: 'театр', definite: 'театр' },
  { word: 'музей', meaning: 'Museum', plural: 'музеи', indefinite: 'музей', definite: 'музей' },
  { word: 'выставка', meaning: 'Exhibition', plural: 'выставки', indefinite: 'выставка', definite: 'выставка' },
  { word: 'спорт', meaning: 'Sport', plural: 'спорт', indefinite: 'спорт', definite: 'спорт' },
  { word: 'игра', meaning: 'Game', plural: 'игры', indefinite: 'игра', definite: 'игра' },
  { word: 'футбол', meaning: 'Football', plural: 'футболы', indefinite: 'футбол', definite: 'футбол' },
  { word: 'баскетбол', meaning: 'Basketball', plural: 'баскетболы', indefinite: 'баскетбол', definite: 'баскетбол' },
  { word: 'тренировка', meaning: 'Training', plural: 'тренировки', indefinite: 'тренировка', definite: 'тренировка' },
  { word: 'чемпионат', meaning: 'Championship', plural: 'чемпионаты', indefinite: 'чемпионат', definite: 'чемпионат' },
  { word: 'победа', meaning: 'Victory', plural: 'победы', indefinite: 'победа', definite: 'победа' },
  { word: 'поражение', meaning: 'Defeat', plural: 'поражения', indefinite: 'поражение', definite: 'поражение' },
  { word: 'команда', meaning: 'Team', plural: 'команды', indefinite: 'команда', definite: 'команда' },
  { word: 'игрок', meaning: 'Player', plural: 'игроки', indefinite: 'игрок', definite: 'игрок' },
  { word: 'тренер', meaning: 'Coach', plural: 'тренеры', indefinite: 'тренер', definite: 'тренер' },
  { word: 'судья', meaning: 'Referee', plural: 'судьи', indefinite: 'судья', definite: 'судья' },
  { word: 'стадион', meaning: 'Stadium', plural: 'стадионы', indefinite: 'стадион', definite: 'стадион' },
  { word: 'площадка', meaning: 'Court', plural: 'площадки', indefinite: 'площадка', definite: 'площадка' },
  { word: 'экипировка', meaning: 'Equipment', plural: 'экипировки', indefinite: 'экипировка', definite: 'экипировка' },
  { word: 'мяч', meaning: 'Ball', plural: 'мячи', indefinite: 'мяч', definite: 'мяч' },
  { word: 'трофей', meaning: 'Trophy', plural: 'трофеи', indefinite: 'трофей', definite: 'трофей' },
  { word: 'праздник', meaning: 'Holiday', plural: 'праздники', indefinite: 'праздник', definite: 'праздник' },
  { word: 'новости', meaning: 'News', plural: 'новости', indefinite: 'новости', definite: 'новости' },
  { word: 'погода', meaning: 'Weather', plural: 'погоды', indefinite: 'погода', definite: 'погода' },
  { word: 'сезон', meaning: 'Season', plural: 'сезоны', indefinite: 'сезон', definite: 'сезон' },
  { word: 'климат', meaning: 'Climate', plural: 'климаты', indefinite: 'климат', definite: 'климат' },
  { word: 'экология', meaning: 'Ecology', plural: 'экологии', indefinite: 'экология', definite: 'экология' },
  { word: 'здоровье', meaning: 'Health', plural: 'здоровья', indefinite: 'здоровье', definite: 'здоровье' },
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

let quizInProgress = false;

const sendQuizMessage = async (channel, user, question, options) => {
  const embed = new EmbedBuilder()
    .setTitle('**Russian Vocabulary Quiz**')
    .setDescription(question)
    .addFields(options.map((opt) => ({ name: opt, value: '\u200B', inline: true })))
    .setColor('#7907FF')
    .setFooter({ text: 'React with the emoji corresponding to your answer' });

  const quizMessage = await channel.send({ embeds: [embed] });

  for (const option of ['🇦', '🇧', '🇨', '🇩']) {
    await quizMessage.react(option);
  }

  return quizMessage;
};

client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === '!start') {
    if (quizInProgress) {
      return message.reply('A quiz is already in progress. Please wait.');
    }

    quizInProgress = true;
    const levelEmbed = new EmbedBuilder()
      .setTitle('Choose Your Level')
      .setDescription('React to select your level:\n\n🇦: A1\n🇧: A2\n🇨: B1\n🇩: B2\n🇪: C1\n🇫: C2')
      .setColor('#7907FF');

    const levelMessage = await message.channel.send({ embeds: [levelEmbed] });

    const levelEmojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫'];
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    for (const emoji of levelEmojis) {
      await levelMessage.react(emoji);
    }

    const filter = (reaction, user) => levelEmojis.includes(reaction.emoji.name) && user.id === message.author.id;

    try {
      const collected = await levelMessage.awaitReactions({ filter, max: 1, time: 15000 });
      const reaction = collected.first();

      if (!reaction) {
        quizInProgress = false;
        await levelMessage.delete();
        return message.channel.send('No level selected. Quiz cancelled.');
      }

      const selectedLevel = levels[levelEmojis.indexOf(reaction.emoji.name)];
      await levelMessage.delete();

      const questions = quizData[selectedLevel] || [];
      shuffleArray(questions);

      const questionsToAsk = questions.slice(0, 5);

      if (questionsToAsk.length === 0) {
        quizInProgress = false;
        return message.channel.send('No questions available for this level.');
      }

      let score = 0;
      const detailedResults = [];

      for (const question of questionsToAsk) {
        const quizMessage = await sendQuizMessage(
          message.channel,
          message.author,
          `What is the English meaning of "${question.word}"?`,
          question.options
        );

        const quizFilter = (reaction, user) =>
          ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && user.id === message.author.id;

        try {
          const quizCollected = await quizMessage.awaitReactions({ filter: quizFilter, max: 1, time: 15000 });
          const quizReaction = quizCollected.first();

          if (quizReaction && quizReaction.emoji.name === question.correct) {
            score++;
            detailedResults.push({
              word: question.word,
              userAnswer: question.options[['🇦', '🇧', '🇨', '🇩'].indexOf(quizReaction.emoji.name)].split(': ')[1],
              correct: question.meaning,
              isCorrect: true,
            });
          } else {
            detailedResults.push({
              word: question.word,
              userAnswer: quizReaction
                ? question.options[['🇦', '🇧', '🇨', '🇩'].indexOf(quizReaction.emoji.name)].split(': ')[1]
                : 'No Answer',
              correct: question.meaning,
              isCorrect: false,
            });
          }
        } catch (error) {
          console.error('Reaction collection failed:', error);
          detailedResults.push({
            word: question.word,
            userAnswer: 'No Answer',
            correct: question.meaning,
            isCorrect: false,
          });
        } finally {
          await quizMessage.delete();
        }
      }

      const resultEmbed = new EmbedBuilder()
        .setTitle('Quiz Results')
        .setDescription(`You scored ${score} out of ${questionsToAsk.length} in level ${selectedLevel}!`)
        .setColor('#7907FF')
        .addFields(
          { name: 'Level', value: selectedLevel, inline: false },
          {
            name: 'Detailed Results',
            value: detailedResults
              .map(
                (res) =>
                  `**Word:** ${res.word}\nYour Answer: ${res.userAnswer}\nCorrect: ${res.correct}\nResult: ${
                    res.isCorrect ? '✅' : '❌'
                  }`
              )
              .join('\n\n'),
          }
        );

      await message.channel.send({ embeds: [resultEmbed] });
    } catch (error) {
      console.error('Error during level selection:', error);
    } finally {
      quizInProgress = false;
    }
  }
});

const wordOfTheDayChannelId = '1327875414584201350';
const sendWordOfTheDay = async () => {
  const channel = await client.channels.fetch(wordOfTheDayChannelId);
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  const embed = new EmbedBuilder()
    .setTitle('**Word of the Day**')
    .setDescription(`Today's Word of the Day is...\n\n**${randomWord.word}**`)
    .addFields(
      { name: '**Meaning**', value: randomWord.meaning, inline: false },
      { name: '**Plural**', value: randomWord.plural, inline: false },
      { name: '**Indefinite Article**', value: randomWord.indefinite, inline: false },
      { name: '**Definite Article**', value: randomWord.definite, inline: false }
    )
    .setColor('#7907FF');

  await channel.send({ embeds: [embed] });
};

cron.schedule('23 16 * * *', sendWordOfTheDay);

client.login(TOKEN);