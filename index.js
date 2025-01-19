const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const express = require('express');
const cron = require('node-cron'); 

const TOKEN = process.env.BOT_TOKEN; 

if (!TOKEN) {
  console.error('Error: BOT_TOKEN environment variable is not set.');
  process.exit(1);
} 

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
}); 

// Express server to keep the bot alive
const app = express();
app.get('/', (req, res) => {
  res.send('Bot is running!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 

// Quiz data by levels
const quizData = {
  A1: [
  { word: 'Apfel', meaning: 'Apple', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇦' },
  { word: 'Haus', meaning: 'House', options: ['A: Apple', 'B: House', 'C: Dog', 'D: Cat'], correct: '🇧' }
   ],
  A2: [
   { word: 'Abend', meaning: 'Evening', options: ['A: Morning', 'B: Evening', 'C: Night', 'D: Afternoon'], correct: '🇧' },
  { word: 'Arzt', meaning: 'Doctor', options: ['A: Teacher', 'B: Doctor', 'C: Nurse', 'D: Patient'], correct: '🇧' }
  ],
    B1: [
  { word: 'Abenteuer', meaning: 'Adventure', options: ['A: Routine', 'B: Challenge', 'C: Adventure', 'D: Job'], correct: '🇨' },
  { word: 'Angebot', meaning: 'Offer', options: ['A: Request', 'B: Offer', 'C: Answer', 'D: Idea'], correct: '🇧' }
  ],
  B2: [
    { word: 'Abschluss', meaning: 'Conclusion', options: ['A: Start', 'B: Conclusion', 'C: Beginning', 'D: Outcome'], correct: '🇧' },
  { word: 'Anforderung', meaning: 'Requirement', options: ['A: Suggestion', 'B: Demand', 'C: Requirement', 'D: Request'], correct: '🇩' }
  ],
  C1: [
  ],
  C2: [
  ]
  };
// Word of the Day data
const wordList = [
  { word: 'die Stadt', meaning: 'City', plural: 'die Städte', indefinite: 'eine Stadt', definite: 'die Stadt' },
  { word: 'der Apfel', meaning: 'An Apple', plural: 'die Äpfel', indefinite: 'ein Apfel', definite: 'der Apfel' }
]; 

// Shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}; 

// Level selection and quiz function
let quizInProgress = false; 

// Function to send a quiz message
const sendQuizMessage = async (channel, user, question, options) => {
  const embed = new EmbedBuilder()
    .setTitle('**German Vocabulary Quiz**')
    .setDescription(question)
    .addFields(options.map((opt) => ({ name: opt, value: '\u200B', inline: true })))
    .setColor('#E67E22')
    .setFooter({ text: 'React with the emoji corresponding to your answer' }); 

  const quizMessage = await channel.send({ embeds: [embed] }); 

  for (const option of ['🇦', '🇧', '🇨', '🇩']) {
    await quizMessage.react(option);
  } 

  return quizMessage;
}; 

// Message event listener
client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === '!start') {
    if (quizInProgress) {
      return message.reply('A quiz is already in progress. Please wait.');
    } 

    quizInProgress = true;
    const levelEmbed = new EmbedBuilder()
      .setTitle('Choose Your Level')
      .setDescription('React to select your level:\n\n🇦: A1\n🇧: A2\n🇨: B1\n🇩: B2\n🇪: C1\n🇫: C2')
      .setColor('#3498DB'); 

    const levelMessage = await message.channel.send({ embeds: [levelEmbed] }); 

    const levelEmojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫'];
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']; 

    await Promise.all(levelEmojis.map((emoji) => levelMessage.react(emoji))); 

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
let userLevel = selectedLevel; // Store the user's level
      await levelMessage.delete(); 

      const questions = quizData[selectedLevel] || [];
      shuffleArray(questions); 

      // Select only 5 questions from the shuffled array (or as many as available)
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
  .setDescription(
    `**Level:** ${userLevel}\nYou scored ${score} out of ${questionsToAsk.length}!`
  )
  .setColor('E67E22')
  .addFields(
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

// Word of the Day
const wordOfTheDayChannelId = '1327875414584201350';
const sendWordOfTheDay = async () => {
  const channel = await client.channels.fetch(wordOfTheDayChannelId);
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  const embed = new EmbedBuilder()
    .setTitle('**Word of the Day**') // Bold title
    .setDescription(`Today's Word of the Day is...\n\n**${randomWord.word}**`) // Normal sentence, bold word
    .addFields(
      { name: '**Meaning**', value: randomWord.meaning, inline: false },
      { name: '**Plural**', value: randomWord.plural, inline: false },
      { name: '**Indefinite Article**', value: randomWord.indefinite, inline: false },
      { name: '**Definite Article**', value: randomWord.definite, inline: false }
    )
    .setColor('#E67E22'); 

  await channel.send({ embeds: [embed] });
}; 

cron.schedule(
  '26 11 * * *',
  () => {
    sendWordOfTheDay();
  },
  {
    scheduled: true,
    timezone: 'Asia/Kolkata',
  }
); 

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
}); 

client.login(TOKEN);
