export const homeGreetingSignedIn =
  "На этой странице вы можете ознакомиться с вашими данными и редактировать их.";
export const homeGreetingNotSignedIn =
  "К сожалению, мы не можем загрузить ваши данные, поскольку вы не авторизованы в системе. Осуществите вход, чтобы ознакомиться с актуальной информацией";

export const heading = () => {
  const hour = new Date().getHours();
  var greeting;

  if (hour >= 5 && hour < 12) greeting = "Доброе утро";
  else if (hour >= 12 && hour < 18) greeting = "Добрый день";
  else if (hour >= 18 && hour < 24) greeting = "Добрый вечер";
  else if (hour >= 0 && hour < 5) greeting = "Доброй ночи";

  return greeting;
};
