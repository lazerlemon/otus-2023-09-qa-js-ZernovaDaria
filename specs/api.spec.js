//еще раз тестово отправить пр.
async function createUser(username, password) {
  const response = await fetch("https://bookstore.demoqa.com/Account/v1/User", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: username,
      password: password,
    }),
  });
  return response;
}

function generateRandomUsername() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let username = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  return username;
}

async function generateToken(username, password) {
  const response = await fetch(
    "https://bookstore.demoqa.com/Account/v1/GenerateToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    },
  );
  return response;
}

describe("5 API tests", () => {
  test("Login already exists", async () => {
    const response = await createUser("test", "Password1!");
    const data = await response.json();
    expect(response.status).toBe(406);
    expect(data.code).toBe("1204");
    expect(data.message).toBe("User exists!");
  });
  test("Incorrect password", async () => {
    const response = await createUser("test", "password1!");
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.code).toBe("1300");
    expect(data.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
  });

  test("User created", async () => {
    const username = generateRandomUsername();

    const response = await createUser(username, "Password1!");
    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data.username).toBe(username);
    expect(data).toHaveProperty("userID");
    expect(data.books).toHaveLength(0);
  });

  test("Сorrect token", async () => {
    const response = await generateToken("NewUserAgain123", "Password1!");
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe("Success");
    expect(data).toHaveProperty("token");
    expect(data.result).toBe("User authorized successfully.");
  });

  test("Inorrect token", async () => {
    const response = await generateToken("NewUserAgain123", "Password1");
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe("Failed");
    expect(data.token).toBe(null);
    expect(data.result).toBe("User authorization failed.");
  });
});
