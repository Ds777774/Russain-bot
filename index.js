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
    { word: 'книга', meaning: 'Book', options: ['A: Book', 'B: Table', 'C: Chair', 'D: Pen'], correct: '🇦' },
    { word: 'кошка', meaning: 'Cat', options: ['A: Apple', 'B: House', 'C: Cat', 'D: Dog'], correct: '🇨' },
  ],
  B1: [
    { word: 'машина', meaning: 'Car', options: ['A: Car', 'B: Dog', 'C: Cat', 'D: House'], correct: '🇦' },
    { word: 'собака', meaning: 'Dog', options: ['A: Bird', 'B: Fish', 'C: Dog', 'D: Cat'], correct: '🇨' },
  ],
  B2: [
    { word: 'птица', meaning: 'Bird', options: ['A: Cat', 'B: Bird', 'C: Dog', 'D: House'], correct: '🇧' },
    { word: 'стол', meaning: 'Table', options: ['A: Table', 'B: Chair', 'C: Dog', 'D: Cat'], correct: '🇦' },
  ],
  C1: [
    { word: 'здоровье', meaning: 'Health', options: ['A: Health', 'B: Cat', 'C: Dog', 'D: House'], correct: '🇦' },
    { word: 'развитие', meaning: 'Development', options: ['A: Development', 'B: Dog', 'C: Cat', 'D: House'], correct: '🇦' },
  ],
  C2: [
    { word: 'наука', meaning: 'Science', options: ['A: Science', 'B: Dog', 'C: Cat', 'D: House'], correct: '🇦' },
    { word: 'философия', meaning: 'Philosophy', options: ['A: Philosophy', 'B: Dog', 'C: Cat', 'D: House'], correct: '🇧' },
  ],
};

const wordList = [
  {
    word: 'город',
    meaning: 'City',
    plural: 'города',
    indefinite: 'город',
    definite: 'город',
  },
  {
    word: 'яблоко',
    meaning: 'Apple',
    plural: 'яблоки',
    indefinite: 'яблоко',
    definite: 'яблоко',
  },
  {
    word: 'книга',
    meaning: 'Book',
    plural: 'книги',
    indefinite: 'книга',
    definite: 'книга',
  },
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

cron.schedule('30 12 * * *', sendWordOfTheDay);

client.login(TOKEN);