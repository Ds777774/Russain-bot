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

// Start Express server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// List of Russian words and their meanings
const words = [
  { word: 'яблоко', meaning: 'Apple', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇦' },
  { word: 'дом', meaning: 'House', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇧' },
  { word: 'кошка', meaning: 'Cat', options: ['A: Apple', 'B: House', 'C: Cat', 'D: Dog'], correct: '🇨' },
  { word: 'собака', meaning: 'Dog', options: ['A: Dog', 'B: Cat', 'C: Apple', 'D: House'], correct: '🇦' },
  { word: 'книга', meaning: 'Book', options: ['A: Book', 'B: Table', 'C: Chair', 'D: Pen'], correct: '🇦' }
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

// Set up cron job to send Word of the Day at 17:30 IST daily
cron.schedule('0 12 * * *', () => {
  sendWordOfTheDay();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

// Command listener to trigger quiz
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore bot messages

  // Listen for the quiz command
  if (message.content.toLowerCase() === '!quiz' && !quizInProgress) {
    quizInProgress = true;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const options = shuffleArray(randomWord.options);

    await sendQuizMessage(message.channel, `What does the word **${randomWord.word}** mean?`, options);
    message.reply('Quiz started! React with the emoji corresponding to your answer.');
  }
});

// Log in to Discord with the bot token
client.login(TOKEN);