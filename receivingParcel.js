// Получение посылки по смс

var INITIAL_BALANCE = 500;
var PARCEL_COST = 100;
var SMS_CODE = "A001DFX0";
var SMS_CODE2 = "A001DFX1";
var MAILBOXES = [null, null, null, "1432HGF", null];

// Создаем базу данных для посылок (объект).
var database = {
  "1432HGF": { mailboxNumber: 3, cost: PARCEL_COST },
  [SMS_CODE]: { mailboxNumber: 3, cost: PARCEL_COST },
};


// Функция для получения посылки.
function receiveParcel(smsCode) {

  const balance = INITIAL_BALANCE;
  const mailbox = database[smsCode];

  if (!mailbox) {
    console.log(`Посылка с данным кодом ${smsCode} не найдена в базе данных.`);
    return;
  }

  if (balance < mailbox.cost) {
    console.log("Недостаточно средств на вашем счете.");
    return;
  }

  // Уменьшение баланса на стоимость посылки.
  const newBalance = balance - mailbox.cost;


  // Обновление состояния почтового автомата.
  MAILBOXES[mailbox.mailboxNumber] = null;

  console.log(
    `Заберите посылку ${smsCode} из ячейки №${mailbox.mailboxNumber}. Ваш баланс составляет: ${newBalance}ед.`
  );
}

// Вызов функции для получения посылки с SMS кодом "A001DFX0".
receiveParcel(SMS_CODE);
// Вызов функции для получения посылки с неправильным SMS кодом "A001DFX1".
receiveParcel(SMS_CODE2);