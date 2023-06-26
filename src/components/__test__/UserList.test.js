import { render, screen, within } from "@testing-library/react";
import UserList from "../UserList";

function renderComponent() {
  const users = [
    { name: "jane", email: "jane@email.com" },
    { name: "sam", email: "sam@email.com" },
  ];
  render(<UserList users={users} />);

  return { users };
}

it("should render one row per user", () => {
  renderComponent();

  //   screen.logTestingPlaygroundURL();

  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

it("should render the email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
