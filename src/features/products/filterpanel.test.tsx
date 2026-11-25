import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import FilterPanel from "./FilterPanel";
import userEvent from "@testing-library/user-event";

const mockProducts = [
  {
    id: 101,
    title: "Gaming Setup",
    price: 1000,
    discountPercentage: 10,
    rating: 4.1,
    brand: "Apple",
    category: "electronics",
    thumbnail: "https://via.placeholder.com/150",
    meta: {
      createdAt: "2024-01-01T00:00:00.000Z",
    },
  },
  {
    id: 102,
    title: "HD Monitor",
    price: 500,
    discountPercentage: 5,
    rating: 2.3,
    brand: "Dell",
    category: "electronics",
    thumbnail: "https://via.placeholder.com/150",
    meta: {
      createdAt: "2024-01-02T00:00:00.000Z",
    },
  },
];

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="url-search">{location.search}</div>;
};

const renderFilterPanel = () =>
  render(
    <MemoryRouter>
      {/* @ts-ignore */}
      <FilterPanel products={mockProducts} />
      <LocationDisplay />
    </MemoryRouter>,
  );

describe("filterpanel tests", () => {
  test("render dynamic brand options from products and updates URL on selection", async () => {
    const user = userEvent.setup();
    renderFilterPanel();

    expect(screen.getByText("Apple")).toBeInTheDocument();

    expect(screen.getByText("Dell")).toBeInTheDocument();

    const appleCheckbox =
      //   screen.getByRole("checkbox", { name: "" }) ||
      document.querySelector('input[name="Apple"]') as HTMLElement;

    await user.click(appleCheckbox);

    expect(appleCheckbox).toBeChecked();

    expect(screen.getByTestId("url-search")).toHaveTextContent("brand=Apple");
  });

  test("user selects min price and it is reflected in the url and as the selected option", async () => {
    const user = userEvent.setup();
    renderFilterPanel();

    const minPriceSelector = document.querySelector(
      'select[name="min-price"]',
    ) as HTMLElement;

    await user.selectOptions(minPriceSelector, "500");

    expect(screen.getByTestId("url-search")).toHaveTextContent("min=500");
    expect(screen.getByText("min-500")).toBeInTheDocument();
  });

  test("clears all selected filters and URL params when RESET is clicked", async () => {
    const user = userEvent.setup();
    renderFilterPanel();

    const appleCheckbox =
      //   screen.getByRole("checkbox", { name: "" }) ||
      document.querySelector('input[name="Apple"]') as HTMLElement;

    await user.click(appleCheckbox);

    expect(screen.getByTestId("url-search")).toHaveTextContent("brand=Apple");

    await user.click(screen.getByText("RESET"));

    expect(appleCheckbox).not.toBeChecked();

    expect(screen.getByTestId("url-search")).toHaveTextContent("");
  });
});
