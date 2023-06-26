import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "../UserForm";

it("should render two inputs and a button", () => {
  render(<UserForm />);
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

it("should call onUserAdd when the form is submitted", async () => {
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);

  const button = screen.getByRole("button");
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  await user.click(nameInput);
  await user.keyboard("jane");

  await user.click(emailInput);
  await user.keyboard("jane@email.com");

  await user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@email.com" });
});

it("should empty the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("jane");
  await user.click(emailInput);
  await user.keyboard("jane@email.com");

  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
