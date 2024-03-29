require("dotenv").config();
const { Bot, GrammyError, HttpError } = require("grammy");

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
  {
    command: "start",
    description: "Запуск бота",
  },
  {
    command: "hello",
    description: "Получить приветствие",
  },
]);

bot.command("start", async (ctx) => {
  await ctx.reply("Привет Я - бот");
});
bot.command(["say_hello", "say_hi", "hello"], async (ctx) => {
  await ctx.reply("Привет!");
});

bot.on("message", async (ctx) => {
  await ctx.reply("Нужно подумать...");
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error(`Error in request`, e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram", e);
  } else {
    console.log("Unknown error", e);
  }
});

bot.start();
