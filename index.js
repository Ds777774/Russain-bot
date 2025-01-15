const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const express = require('express');
const cron = require('node-cron');

// Use environment variable for the bot token
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error('Error: BOT_TOKEN environment variable is not set.');
  process.exit(1); // Exit the app if the token is missing
}

// Create a new client instance with correct intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// Express server setup to keep the bot alive
const app = express();
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// List of Russian words and their meanings
const words = [
  { word: 'Яблоко', meaning: 'Apple', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇦' },
  { word: 'Дом', meaning: 'House', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇧' },
  { word: 'Кошка', meaning: 'Cat', options: ['A: Apple', 'B: House', 'C: Cat', 'D: Dog'], correct: '🇨' },
  { word: 'Собака', meaning: 'Dog', options: ['A: Dog', 'B: Cat', 'C: Apple', 'D: House'], correct: '🇦' },
  { word: 'Книга', meaning: 'Book', options: ['A: Book', 'B: Table', 'C: Chair', 'D: Pen'], correct: '🇦' },
  { word: 'Стол', meaning: 'Table', options: ['A: Book', 'B: Table', 'C: Chair', 'D: Bed'], correct: '🇧' },
 { word: 'Солнце', meaning: 'Sun', options: ['A: Moon', 'B: Sun', 'C: Star', 'D: Cloud'], correct: '🇧' },
  { word: 'Луна', meaning: 'Moon', options: ['A: Moon', 'B: Sun', 'C: Star', 'D: Sky'], correct: '🇦' },
  { word: 'Звезда', meaning: 'Star', options: ['A: Star', 'B: Planet', 'C: Galaxy', 'D: Moon'], correct: '🇦' },
  { word: 'Дерево', meaning: 'Tree', options: ['A: Flower', 'B: Plant', 'C: Tree', 'D: Grass'], correct: '🇨' },
  { word: 'Река', meaning: 'River', options: ['A: Lake', 'B: River', 'C: Ocean', 'D: Pond'], correct: '🇧' },
  { word: 'Озеро', meaning: 'Lake', options: ['A: River', 'B: Lake', 'C: Ocean', 'D: Sea'], correct: '🇧' },
  { word: 'Гора', meaning: 'Mountain', options: ['A: Hill', 'B: Mountain', 'C: Valley', 'D: Forest'], correct: '🇧' },
  { word: 'Лес', meaning: 'Forest', options: ['A: Forest', 'B: Desert', 'C: Grassland', 'D: Jungle'], correct: '🇦' },
  { word: 'Птица', meaning: 'Bird', options: ['A: Bird', 'B: Fish', 'C: Mammal', 'D: Reptile'], correct: '🇦' },
  { word: 'Рыба', meaning: 'Fish', options: ['A: Mammal', 'B: Fish', 'C: Reptile', 'D: Amphibian'], correct: '🇧' },
  { word: 'Книга', meaning: 'Book', options: ['A: Book', 'B: Notebook', 'C: Diary', 'D: Journal'], correct: '🇦' },
  { word: 'Письмо', meaning: 'Letter', options: ['A: Email', 'B: Letter', 'C: Note', 'D: Postcard'], correct: '🇧' },
  { word: 'Стол', meaning: 'Table', options: ['A: Desk', 'B: Table', 'C: Chair', 'D: Bed'], correct: '🇧' },
  { word: 'Стул', meaning: 'Chair', options: ['A: Chair', 'B: Table', 'C: Bench', 'D: Stool'], correct: '🇦' },
  { word: 'Зеркало', meaning: 'Mirror', options: ['A: Glass', 'B: Mirror', 'C: Window', 'D: Frame'], correct: '🇧' },
  { word: 'Окно', meaning: 'Window', options: ['A: Door', 'B: Window', 'C: Curtain', 'D: Roof'], correct: '🇧' },
  { word: 'Дверь', meaning: 'Door', options: ['A: Window', 'B: Door', 'C: Wall', 'D: Gate'], correct: '🇧' },
  { word: 'Кровать', meaning: 'Bed', options: ['A: Table', 'B: Chair', 'C: Bed', 'D: Sofa'], correct: '🇨' },
  { word: 'Собака', meaning: 'Dog', options: ['A: Cat', 'B: Dog', 'C: Rabbit', 'D: Mouse'], correct: '🇧' },
  { word: 'Кошка', meaning: 'Cat', options: ['A: Dog', 'B: Cat', 'C: Rabbit', 'D: Fox'], correct: '🇧' },
 { "word": "Солнце", "meaning": "Sun", "options": [ "A: Moon", "B: Sun", "C: Star", "D: Cloud" ], "correct": "🇧" }, { "word": "Луна", "meaning": "Moon", "options": [ "A: Moon", "B: Sun", "C: Star", "D: Sky" ], "correct": "🇦" }, { "word": "Звезда", "meaning": "Star", "options": [ "A: Star", "B: Planet", "C: Galaxy", "D: Moon" ], "correct": "🇦" }, { "word": "Дерево", "meaning": "Tree", "options": [ "A: Flower", "B: Plant", "C: Tree", "D: Grass" ], "correct": "🇨" }, { "word": "Река", "meaning": "River", "options": [ "A: Lake", "B: River", "C: Ocean", "D: Pond" ], "correct": "🇧" }, { "word": "Озеро", "meaning": "Lake", "options": [ "A: River", "B: Lake", "C: Ocean", "D: Sea" ], "correct": "🇧" }, { "word": "Гора", "meaning": "Mountain", "options": [ "A: Hill", "B: Mountain", "C: Valley", "D: Forest" ], "correct": "🇧" }, { "word": "Лес", "meaning": "Forest", "options": [ "A: Forest", "B: Desert", "C: Grassland", "D: Jungle" ], "correct": "🇦" }, { "word": "Птица", "meaning": "Bird", "options": [ "A: Bird", "B: Fish", "C: Mammal", "D: Reptile" ], "correct": "🇦" }, { "word": "Рыба", "meaning": "Fish", "options": [ "A: Mammal", "B: Fish", "C: Reptile", "D: Amphibian" ], "correct": "🇧" }
];

// Shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Quiz management variables
let quizInProgress = false;

// Function to send a quiz message
const sendQuizMessage = async (channel, question, options) => {
  const embed = new EmbedBuilder()
    .setTitle('**Russian Vocabulary Quiz**')
    .setDescription(question)
    .addFields(options.map((opt) => ({ name: opt, value: '\u200B', inline: true })))
    .setColor('#0099ff')
    .setFooter({ text: 'React with the emoji corresponding to your answer' });

  const quizMessage = await channel.send({ embeds: [embed] });

  for (const option of ['🇦', '🇧', '🇨', '🇩']) {
    await quizMessage.react(option);
  }

  return quizMessage;
};

// Event listener when the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Event listener for messages
client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === '!start') {
    if (quizInProgress) {
      return message.reply('A quiz is already in progress. Please wait until it finishes.');
    }

    quizInProgress = true;

    shuffleArray(words); // Shuffle questions
    const selectedWords = words.slice(0, 5); // Select 5 random words
    let score = 0;
    let detailedResults = [];

    for (let i = 0; i < selectedWords.length; i++) {
      const currentWord = selectedWords[i];
      const question = `What is the English meaning of the Russian word "${currentWord.word}"?`;

      const quizMessage = await sendQuizMessage(message.channel, question, currentWord.options);

      const filter = (reaction, user) =>
        ['🇦', '🇧', '🇨', '🇩'].includes(reaction.emoji.name) && !user.bot;

      try {
        const collected = await quizMessage.awaitReactions({ filter, max: 1, time: 15000 });
        const reaction = collected.first();

        if (reaction) {
          const userChoiceIndex = ['🇦', '🇧', '🇨', '🇩'].indexOf(reaction.emoji.name);
          const userAnswer = currentWord.options[userChoiceIndex].split(': ')[1]; // Extract answer
          const isCorrect = userAnswer === currentWord.meaning;

          if (isCorrect) {
            score++;
          }

          detailedResults.push({
            word: currentWord.word,
            userAnswer: userAnswer,
            correct: currentWord.meaning,
            isCorrect: isCorrect
          });
        } else {
          detailedResults.push({
            word: currentWord.word,
            userAnswer: 'No reaction',
            correct: currentWord.meaning,
            isCorrect: false
          });
        }
      } catch (error) {
        console.error('Reaction collection failed:', error);
        detailedResults.push({
          word: currentWord.word,
          userAnswer: 'No reaction',
          correct: currentWord.meaning,
          isCorrect: false
        });
      }

      await quizMessage.delete();
    }

    quizInProgress = false;

    const resultEmbed = new EmbedBuilder()
      .setTitle('Quiz Results')
      .setDescription(`You scored ${score} out of 5!`)
      .setColor('#00FF00');

    let resultsDetail = '';

    detailedResults.forEach((result) => {
      resultsDetail += `**Russian word:** "${result.word}"\n` +
        `Your answer: ${result.userAnswer}\n` +
        `Correct answer: ${result.correct}\n` +
        `Result: ${result.isCorrect ? '✅ Correct' : '❌ Incorrect'}\n\n`;
    });

    resultEmbed.addFields({ name: 'Detailed Results', value: resultsDetail });

    await message.channel.send({ embeds: [resultEmbed] });
  }
});

// Channel ID for Word of the Day
const wordOfTheDayChannelId = '1303664003444379649';

// Function to send the Word of the Day
const sendWordOfTheDay = async () => {
  const channel = await client.channels.fetch(wordOfTheDayChannelId);
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const embed = new EmbedBuilder()
    .setTitle('**Word of the Day**')
    .setDescription(`Today's Russian word is **${randomWord.word}**!`)
    .addFields(
      { name: 'Meaning', value: randomWord.meaning }
    )
    .setColor('#7907ff') // Purple color
    .setFooter({ text: 'Stay tuned for more words!' });

  await channel.send({ embeds: [embed] });
};

// Set up cron job to send Word of the Day at 12:30 PM IST daily
cron.schedule('30 12 * * *', () => {
  sendWordOfTheDay();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

// Log in to Discord with the bot token
client.login(TOKEN);