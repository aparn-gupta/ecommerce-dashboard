import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CategorySection from "./CategorySection";
import { vi, test, expect, afterEach } from "vitest";

let num = 0;

const mockCategories = Array(14)
  .fill(0)
  .map((_) => {
    num++;
    return {
      category: `category-${num}`,
      images: ["https://via.placeholder.com/151"],
    };
  });

afterEach(() => {
  vi.restoreAllMocks();
});

test("fetches and rendeers categories from the API", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      products: mockCategories,
    }),
  } as Response);

  render(
    <MemoryRouter>
      <CategorySection />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole("status", { name: /loading products/i }),
  ).toBeInTheDocument();

  expect(await screen.findByText("category-7")).toBeInTheDocument();

  expect(screen.queryByRole("status")).not.toBeInTheDocument();

  expect(globalThis.fetch).toHaveBeenCalled();
});
