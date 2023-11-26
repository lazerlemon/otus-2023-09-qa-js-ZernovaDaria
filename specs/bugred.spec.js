import { register, getUser, editUser, deleteAvatar } from "../framework/users";
import { generateRandomUsername } from "../framework/fixtures";
import { generateRandomEmail } from "../framework/fixtures";

describe("7 API tests", () => {
  test("Пользователь с такой почтой уже существует.", async () => {
    const username = generateRandomUsername();
    const response = await register("mill33i@mail.ru", username, "string1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      " email mill33i@mail.ru уже есть в базе",
    );
  });

  test("Пользователь с таким именем уже существует.", async () => {
    const email = generateRandomEmail();
    const response = await register(email, "1", "string1");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(" Текущее ФИО 1 уже есть в базе");
  });

  let savedUserEmail;
  test("Пользователь зарегистрирован.", async () => {
    const email = generateRandomEmail();
    const username = generateRandomUsername();
    const response = await register(email, username, "string1");
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(username);

    savedUserEmail = response.body.email;
  });

  test("Получить данные пользователя.", async () => {
    const response = await getUser(savedUserEmail);
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.email).toBe(savedUserEmail);
  });

  test("Отредактировать данные пользователя.", async () => {
    const response = await editUser(savedUserEmail, "name", "robert paulson");
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.message).toBe(
      `Поле name успешно изменено на robert paulson у пользователя с email ${savedUserEmail}`,
    );
  });

  test("Проверить измененные данные пользователя.", async () => {
    const response = await getUser(savedUserEmail);
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.name).toBe("robert paulson");
  });

  test("Удалить аватар пользователя.", async () => {
    const response = await deleteAvatar(savedUserEmail);
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body.status).toBe("ok");
  });
});
