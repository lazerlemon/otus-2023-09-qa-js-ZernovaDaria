import {
  authorization,
  createUser,
  generateToken,
  getUser,
  deleteUser,
} from "../framework/services";
import { generateRandomUsername } from "../framework/fixtures";

describe("5 API tests", () => {
  test("User not found", async () => {
    const response = await authorization("string", "string");
    expect(response.body.code).toBe("1207");
    expect(response.body.message).toBe("User not found!");
  });

  test("User authorized", async () => {
    const response = await authorization("test", "Password1!");
    expect(response.body).toBe(true);
  });

  test("Login already exists", async () => {
    const response = await createUser("test", "Password1!");
    expect(response.body.code).toBe("1204");
    expect(response.body.message).toBe("User exists!");
  });

  test("Incorrect password", async () => {
    const response = await createUser("test", "password1!");
    expect(response.status).toBe(400);
    expect(response.body.code).toBe("1300");
    expect(response.body.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
  });

  let savedUserID;
  test("User created", async () => {
    const username = generateRandomUsername();
    const response = await createUser(username, "Password1!");
    console.log("Response:", response.body);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(username);
    expect(response.body).toHaveProperty("userID");
    expect(response.body.books).toHaveLength(0);

    savedUserID = response.body.userID;
  });

  test("Get user", async () => {
    const response = await getUser(savedUserID);
    console.log("Response:", response.body);
    expect(response.body.code).toBe("1200");
  });

  test("Delete user", async () => {
    const response = await deleteUser(savedUserID);
    console.log("Response:", response.body);
    expect(response.body.code).toBe("1200");
  });

  test("Сorrect token", async () => {
    const response = await generateToken("NewUserAgain123", "Password1!");
    expect(response.body.status).toBe("Success");
    expect(response.body).toHaveProperty("token");
    expect(response.body.result).toBe("User authorized successfully.");
  });

  test("Inorrect token", async () => {
    const response = await generateToken("NewUserAgain123", "password1");
    expect(response.body.status).toBe("Failed");
    expect(response.body.token).toBe(null);
    expect(response.body.result).toBe("User authorization failed.");
  });
});
